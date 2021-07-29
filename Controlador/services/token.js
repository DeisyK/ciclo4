const jwt = require("jsonwebtoken");
const db = require("../models/index");

const duracion = 24 * 60 * 60;

module.exports = {
  encodeUser: (user) => {
    const token = jwt.sign(
      {
        id: user.id,
        nombre: user.name,
      },
      "private.key",
      { expiresIn: duracion }
    );
    return token;
  },

  decode: async (token) => {
    try {
      const { id } = await jwt.verify(token, "private.key");
      const user = await db.User.findOne({ _id: id });

      if (user) {
        return user;
      } else {
        return false;
      }
    } catch (e) {
      //const newToken = await checkToken(token);
      //return newToken;
    }
  },
};
