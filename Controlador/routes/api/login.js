const router = require("express").Router();
const loginController = require("../../controllers/loginController");
const validation = require("../../middlewares/validation");

router.post("/into", loginController.login);
router.post("/register", loginController.register);
router.patch("/recovery", loginController.recovery);

module.exports = router;
