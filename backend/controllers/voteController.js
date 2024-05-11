const Vote = require("../models/Vote");
const Voter = require("../models/Voter");

module.exports = {
    addVote: async (req, res, next) =>{
        const { voter, nationalVote,  provinceVote, voteCasted } = req.body;
        const vote = new Vote({ voter, nationalVote, provinceVote , voteCasted});

        try {
            const existingVoter = await Voter.findById(voter);
            if (existingVoter.isVoteCasted) {
                return res.status(400).json({ error: "Vote already casted by this voter." });
            }

            existingVoter.isVoteCasted = true;
            await existingVoter.save();

            await vote.save();
            res.status(201).json(vote);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getVotes: async(req, res, next) => {
        try {
            const votes = await Vote.find({}, { voter: 1, nationalVote: 1, provinceVote: 1 , voteCasted: 1  })

            const totalVotesCasted = votes.length;

            res.status(200).json({ votes , totalVotesCasted})
        } catch (error) {
            return next(error)
        }
    },


}