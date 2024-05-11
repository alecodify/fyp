const router = require("express").Router();
const resultController = require("../controllers/resultController");

router.get("/halkaVice", resultController.getHalkasViceResult);
router.get("/assemblyVice", resultController.getAssemblyViceResult);

module.exports = router;