const router = require("express").Router();
const categoriasController = require("../../controllers/categoriasController");

router.get("/list", categoriasController.list);
router.post("/add", categoriasController.add);
router.get("/:nombre/search", categoriasController.search);
router.get("/:id/one", categoriasController.one);
router.delete("/:id/destroy", categoriasController.destroy);

module.exports = router;
