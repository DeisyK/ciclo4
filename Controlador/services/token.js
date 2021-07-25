const jwt = require("jsonwebtoken");

const duracion = 24 * 60 * 60;

module.exports = {
  encodeUser: (user) => {
    const token = jwt.sign(
      {
        iduser: user.id,
      },
      "Grupo 2 Mision Tic",
      { expiresIn: duracion }
    );
    return token;
  },
};
