const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
    voter: { type: mongoose.Schema.Types.ObjectId, ref: "Voter", require: true },
    nationalVote: {
      candidateId: { type: String, require: true },
      candidateCNIC: {type: String, require: true},
      halkaNo: { type: String , require: true },
    },
    provinceVote: {
      candidateId: { type: String, require: true },
      candidateCNIC: {type: String, require: true},
      halkaNo: { type: String, require: true },
    },
    voteCasted: { type: Boolean, default: false},
}, {timestamps: true});

const Vote = mongoose.model('Vote', voteSchema);


module.exports = Vote;
