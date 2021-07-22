const router = require("express").Router();
const apiRouterLogin = require("./api/login");
const apiRouterContactos = require("./api/contacto");
const apiRouterCategorias = require("./api/categorias");

router.use("/login", apiRouterLogin);
router.use("/contactos", apiRouterContactos);
router.use("/categorias", apiRouterCategorias);

module.exports = router;
