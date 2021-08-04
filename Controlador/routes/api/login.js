const router = require("express").Router();
const loginController = require("../../controllers/loginController");
const { verifyUsuario } = require("../../middlewares/auth/auth");
const validation = require("../../middlewares/validation");

router.get("/get-usuario", loginController.usuario);
router.post("/into", loginController.login);
router.post("/register", loginController.register);
router.patch("/recovery", loginController.recovery);
router.patch("/change/password", loginController.change);
router.patch("/:id/edit", verifyUsuario, loginController.edit);

module.exports = router;
