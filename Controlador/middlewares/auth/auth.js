const token = require("../../services/token");

module.exports = {
  verifyUsuario: async (req, res, next) => {
    if (!req.headers.token) res.send({ message: "No token!" });
    const response = await token.decode(req.headers.token);
    if (response) {
      next();
    } else {
      res.send({ message: "No autorizado" });
    }
  },
};
