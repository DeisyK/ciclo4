const router = require("express").Router();
const loginController = require("../../controllers/loginController");
const validation = require("../../middlewares/validation");
const { verifyUsuario } = require("../../middlewares/auth/auth");

router.post("/into", validation.login, verifyUsuario, loginController.login);
router.post("/register", validation.register, loginController.register);
router.patch("/recovery", validation.recovery, loginController.recovery);

module.exports = router;
