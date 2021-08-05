const bcrypt = require("bcryptjs");
const tokenServices = require("../services/token");
const generator = require("generate-password");
const sendEmails = require("../services/emails");
const { validationResult } = require("express-validator");
const db = require("../models/index");
const { decode } = require("../services/token");

exports.usuario = async (req, res) => {
  try {
    const usuario = await decode(req.headers.token);
    if (usuario) {
      res.send({ _id: usuario._id, email: usuario.email, name: usuario.name });
    } else {
      res.send({ error: "El usuario no existe, por favor cree una cuenta" });
    }
  } catch (e) {
    res.send({
      error: "Error al buscar su usuario, por favor intente nuevamente",
    });
  }
};

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
    const register = await db.User.findOne({ email: req.body.email });
    if (!register) {
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
    } else {
      res.send({
        error: "Por favor ingrese un correo que no haya sido registrado",
      });
    }
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
    const password = generator.generate({
      length: 10,
      numbers: true,
    });
    const salt = bcrypt.genSaltSync(8);

    const response = await db.User.updateOne(
      { email: req.body.email },
      { password: bcrypt.hashSync(password, salt) }
    );
    if (response.n === 1) {
      const one = await db.User.findOne({ email: req.body.email });
      mailOk = await sendEmails.recoveryPassword(one, password);

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

exports.change = async (req, res) => {
  try {
    if (req.body.newPassword === req.body.confirmPassword) {
      const user = await decode(req.headers.token);
      if (user) {
        const isTrue = bcrypt.compareSync(req.body.oldPassword, user.password);
        if (isTrue) {
          const salt = bcrypt.genSaltSync(8);
          const response = await db.User.updateOne(
            { _id: user._id },
            { password: bcrypt.hashSync(req.body.newPassword, salt) }
          );
          if (response.n > 0) {
            res.send({
              message:
                "Contraseña cambiada con exito, por favor inicie sesión nuevamente.",
            });
          } else {
            res.send({ error: "Intente nuevamente" });
          }
        } else {
          res.send({ error: "Revise la contraseña actual" });
        }
      } else {
        res.send({ error: "Sin permisos para ejecutar esta acción" });
      }
    } else {
      res.send({ error: "Las contraseñas deben coincidir" });
    }
  } catch (e) {}
};

exports.edit = async (req, res) => {
  try {
    const { id } = await decode(req.headers.token);
    if (id === req.params.id) {
      const response = await db.User.updateOne(
        { _id: req.params.id },
        { name: req.body.name, email: req.body.email }
      );

      if (response.n > 0) {
        const register = await db.User.findOne({ _id: req.params.id });
        const token = tokenServices.encodeUser(register);
        res.send({
          token: token,
          message: "Usuario actualizado.",
        });
      } else {
        res.send({ error: "No se pudo actualizar tu perfil." });
      }
    } else {
      res.send({ error: "No tienes permisos para editar el usuario." });
    }
  } catch (error) {
    res.send({ error: "No se pudo actualizar tu perfil." });
  }
};

exports.destroy = async (req, res) => {
  try {
    const { id } = await decode(req.headers.token);
    await db.Categorias.deleteMany({ user_id: id });
    await db.Contactos.deleteMany({ user_id: id });
    await db.User.deleteOne({ _id: id });
    res.send({ message: "Cuenta eliminada" });
  } catch (e) {
    res.send({ error: "Error al eliminar la cuenta." });
  }
};
