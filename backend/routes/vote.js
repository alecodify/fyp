const router = require("express").Router();
const voteController = require("../controllers/voteController");

router.post("/", voteController.addVote);
router.get("/", voteController.getVotes);

module.exports = router;
