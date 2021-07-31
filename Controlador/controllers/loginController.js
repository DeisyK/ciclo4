const bcrypt = require("bcryptjs");
const tokenServices = require("../services/token");
const generator = require("generate-password");
const sendEmails = require("../services/emails");
const { validationResult } = require("express-validator");
const db = require("../models/index");

exports.login = async (req, res, next) => {
  try {
    const resultValidation = validationResult(req);
    if (resultValidation.errors.length > 0) {
      res.send({ errors: resultValidation.mapped() });
    }

    const register = await db.User.findOne({ email: req.body.email });
    if (register) {
      const isTrue = bcrypt.compareSync(req.body.password, register.password);

      if (isTrue) {
        const token = tokenServices.encodeUser(register);

        res.send({ token });
      } else {
        res.send({ error: "Revise email y contraseña" });
      }
    } else {
      res.send({ error: "Revise email y contraseña" });
    }
  } catch (e) {
    res.send({ error: "Error al iniciar sesión" });
  }
};

exports.register = async (req, res, next) => {
  try {
    const resultValidation = validationResult(req);
    if (resultValidation.errors.length > 0) {
      res.send({ errors: resultValidation.mapped() });
    }

    // const password = "12345678";
    const password = generator.generate({
      length: 10,
      numbers: true,
    });
    const salt = bcrypt.genSaltSync(8);

    const register = await db
      .User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(password, salt),
      })
      .save();

    const mailOk = await sendEmails.register(register, password);

    mailOk
      ? res
          .status(200)
          .send({ message: "Registro creado con exito, revise su correo." })
      : res.send({
          Error: "No se pudo realizar el registro intente nuevamente",
        });
  } catch (e) {
    res.send({ Error: "No se pudo crear usuario" });
  }
};

exports.recovery = async (req, res, next) => {
  try {
    const resultValidation = validationResult(req);
    if (resultValidation.errors.length > 0) {
      res.send({ errors: resultValidation.mapped() });
    }

    let mailOk = false;
    const password = "12345678";
    // const password = generator.generate({
    //   length: 10,
    //   numbers: true,
    // });
    const salt = bcrypt.genSaltSync(8);

    const response = await db.User.updateOne(
      { email: req.body.email },
      { password: bcrypt.hashSync(password, salt) }
    );
    if (response.n === 1) {
      const one = await db.User.findOne({ email: req.body.email });
      mailOk = sendEmails.recoveryPassword(one, password);
      if (mailOk) {
        res.send({
          message: "Contraseña cambiada, revise su correo electronico.",
        });
      } else {
        res.send({ error: "No se pudo cambiar la contraseña" });
      }
    } else {
      res.send({ error: "Ingrese un email registrado" });
    }
  } catch (e) {
    res.send({
      error: "No se pudo recuperar la contraseña, por favor intente nuevamente",
    });
  }
};
