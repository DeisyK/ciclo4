const router = require("express").Router();
const loginController = require("../../controllers/loginController");
const { verifyUsuario } = require("../../middlewares/auth/auth");
const validation = require("../../middlewares/validation");

router.get("/get-usuario", loginController.usuario);
router.post("/into", validation.login, loginController.login);
router.post("/register", validation.register, loginController.register);
router.patch("/recovery", loginController.recovery);
router.patch("/change/password", loginController.change);
router.patch("/:id/edit", verifyUsuario, loginController.edit);
router.delete("/:id/destroy", verifyUsuario, loginController.destroy);

module.exports = router;
