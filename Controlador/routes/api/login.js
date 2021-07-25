const router = require("express").Router();
const loginController = require("../../controllers/loginController");
const validation = require("../../middlewares/validation");

router.post("/into", validation.login, loginController.login);
router.post("/register", validation.register, loginController.register);
router.post("/recovery", loginController.recovery);

module.exports = router;
