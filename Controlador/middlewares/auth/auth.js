const token = require("../../services/token");

module.exports = {
  verifyUsuario: async (req, res, next) => {
    try {
      if (!req.headers.token) res.send({ error: "Inicie sesion nuevamente" });
      const response = await token.decode(req.headers.token);

      if (response) {
        next();
      } else {
        res.send({ error: "No autorizado" });
      }
    } catch (e) {}
  },
};
