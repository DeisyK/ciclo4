const router = require("express").Router();
const loginController = require("../../controllers/loginController");

router.post("/into", loginController.login);
router.post("/register", loginController.register);
router.post("/recovery", loginController.recovery);

module.exports = router;
