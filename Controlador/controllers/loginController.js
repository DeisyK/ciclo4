const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const tokenServices = require("../services/token");
const generator = require("generate-password");
const sendEmails = require("../services/emails");

const usuarios = () => {
  return JSON.parse(
    fs.readFileSync(path.join(__dirname, "../database/usuarios.json"), "utf-8")
  );
};

exports.login = async (req, res, next) => {
  try {
    const register = usuarios().filter((one) => {
      one.email === req.body.email;
    });
    if (register) {
      const isTrue = bcrypt.compareSync(req.body.password, register.password);
      if (isTrue) {
        const token = tokenServices(register);
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
    let users = usuarios();

    const register = users.filter((one) => one.email === req.body.email);

    if (register.length > 0) {
      res.send({
        message: "No puede ingresar un correo electronico que ya exista",
      });
    } else {
      const password = generator.generate({
        length: 10,
        numbers: true,
      });
      const salt = bcrypt.genSaltSync(8);
      console.log(password);
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
      await sendEmails.register(nuevo);
      res.status(200);
    }
  } catch (e) {
    res.send({ message: "No se pudo crear usuario" });
  }
};

exports.recovery = async (req, res, next) => {
  try {
    let users = usuarios();
    users.forEach((one) => {
      if (one.email === req.body.email) {
        const password = generator.generate({
          length: 10,
          numbers: true,
        });
        const salt = bcrypt.genSaltSync(8);
        one.password = bcrypt.hashSync(password, salt);
        sendEmails.recoveryPassword(one, password);
        res.status(200);
        fs.writeFileSync(
          path.join(__dirname, "../database/usuarios.json"),
          users
        );
        res.status(200);
      }
    });
  } catch (e) {}
};
