const router = require("express").Router();
const contactoController = require("../../controllers/contactosController");

router.get("/:id/list", contactoController.list);
router.post("/:id/add", contactoController.add);
router.post("/:id/edit", contactoController.edit);

module.exports = router;
