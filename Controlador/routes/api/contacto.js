const router = require("express").Router();
const contactoController = require("../../controllers/contactosController");
const { verifyUsuario } = require("../../middlewares/auth/auth");

router.get("/list", verifyUsuario, contactoController.list);
router.post("/add", verifyUsuario, contactoController.add);
router.patch("/:id/edit", verifyUsuario, contactoController.edit);
router.delete("/:id/delete", verifyUsuario, contactoController.destroy);

module.exports = router;
