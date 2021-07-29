const { body, params } = require("express-validator");

const validation = {
  login: [
    body("email")
      .notEmpty()
      .withMessage("Falta email")
      .bail()
      .isEmail()
      .withMessage("Ingresa un email valido"),
    body("password")
      .notEmpty()
      .withMessage("Tienes que ingresar una contraseña"),
  ],
  register: [
    body("name").notEmpty().withMessage("Tiene que ingresar un nombre"),
    body("email")
      .notEmpty()
      .withMessage("Falta email")
      .bail()
      .isEmail()
      .withMessage("Ingresa un email valido"),
    body("numero")
      .notEmpty()
      .withMessage("Tiene que ingresar un número de telefono"),
  ],
  recovery: [
    body("email")
      .notEmpty()
      .withMessage("Falta email")
      .bail()
      .isEmail()
      .withMessage("Ingresa un email valido"),
  ],
};

module.exports = validation;
