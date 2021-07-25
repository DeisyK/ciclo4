const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const tokenServices = require("../services/token");
const generator = require("generate-password");
const sendEmails = require("../services/emails");
const { validationResult } = require("express-validator");

const usuarios = () => {
  return JSON.parse(
    fs.readFileSync(path.join(__dirname, "../database/usuarios.json"), "utf-8")
  );
};

exports.login = async (req, res, next) => {
  try {
    const resultValidation = validationResult(req);
    if (resultValidation.errors.length > 0) {
      console.log(resultValidation.mapped());
      res.send({ errors: resultValidation.mapped() });
    }
    const users = usuarios();
    const register = users.find((one) => one.email === req.body.email);
    if (register) {
      console.log(register);
      const isTrue = bcrypt.compareSync(req.body.password, register.password);
      if (isTrue) {
        const token = tokenServices.encodeUser(register);

        res.send({ token });
      } else {
        res.send({ message: "Revise email y contraseña" });
      }
    } else {
      res.send({ message: "Revise email y contraseña" });
    }
  } catch (e) {
    res.send({ message: "Error al iniciar sesión" });
  }
};

exports.register = async (req, res, next) => {
  try {
    const resultValidation = validationResult(req);
    if (resultValidation.errors.length > 0) {
      console.log(resultValidation.mapped());
      res.send({ errors: resultValidation.mapped() });
    }
    let users = usuarios();
    const register = users.filter((one) => one.email === req.body.email);

    if (register.length > 0) {
      res.send({
        message: "No puede ingresar un correo electronico que ya exista",
      });
    } else {
      //const password = "12345678";
      const password = generator.generate({
        length: 10,
        numbers: true,
      });
      const salt = bcrypt.genSaltSync(8);

      const nuevo = {
        id: users.length + 1,
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        numero: req.body.numero,
        fecha_de_nacimiento: req.body.fecha_de_nacimiento,
        genero: req.body.genero,
        email: req.body.email,
        password: bcrypt.hashSync(password, salt),
      };

      users = JSON.stringify([...users, nuevo]);
      fs.writeFileSync(
        path.join(__dirname, "../database/usuarios.json"),
        users
      );
      const mailOk = await sendEmails.register(nuevo, password);

      mailOk
        ? res.status(200).send({ message: "Registro creado con exito" })
        : res.send({
            message: "No se pudo realizar el registro intente nuevamente",
          });
    }
  } catch (e) {
    res.send({ message: "No se pudo crear usuario" });
  }
};

exports.recovery = async (req, res, next) => {
  try {
    let mailOk = false;
    let users = usuarios();
    users.forEach((one) => {
      if (one.email === req.body.email) {
        const password = "12345678";
        // const password = generator.generate({
        //   length: 10,
        //   numbers: true,
        // });
        const salt = bcrypt.genSaltSync(8);
        one.password = bcrypt.hashSync(password, salt);

        mailOk = sendEmails.recoveryPassword(one, password);
      }
    });
    if (mailOk) {
      users = JSON.stringify(users);
      const ruta = path.join(__dirname, "../database/usuarios.json");
      fs.writeFileSync(ruta, users);
      res.send({ message: "Contraseña cambiada" });
    } else {
      res.send({ error: "No se pudo cambiar la contraseña" });
    }
  } catch (e) {}
};
