const router = require("express").Router();
const contactoController = require("../../controllers/contactosController");

router.get("/:id/list", contactoController.list);
router.post("/:id/add", contactoController.add);

module.exports = router;
