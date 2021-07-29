const router = require("express").Router();
const categoriasController = require("../../controllers/categoriasController");
const { verifyUsuario } = require("../../middlewares/auth/auth");

router.get("/list", verifyUsuario, categoriasController.list);
router.post("/add", verifyUsuario, categoriasController.add);
router.get("/:id/one", verifyUsuario, categoriasController.one);
router.patch("/:id/edit", verifyUsuario, categoriasController.update);
router.delete("/:id/destroy", verifyUsuario, categoriasController.destroy);

module.exports = router;
