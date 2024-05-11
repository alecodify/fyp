const router = require("express").Router();
const candidateController = require("../controllers/candidateController");
const { verifyToken } = require("../middleware/jwt_token");

router.post("/", verifyToken , candidateController.addCandidate);
router.get("/", candidateController.getCandidates);
router.get("/:id", candidateController.getCandidate);
router.put("/:id", verifyToken, candidateController.updateCandidate);
router.delete("/:id", verifyToken, candidateController.deleteCandidate);

module.exports = router;
