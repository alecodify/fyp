const router = require("express").Router();
const voterController = require("../controllers/voterController");
const { verifyToken } = require("../middleware/jwt_token");

router.post("/", verifyToken , voterController.addVoter);
router.get("/", voterController.getVoters);
router.get("/:id", voterController.getVoter);
router.put("/:id", verifyToken, voterController.updateVoter);
router.delete("/:id", verifyToken, voterController.deleteVoter);

module.exports = router;
