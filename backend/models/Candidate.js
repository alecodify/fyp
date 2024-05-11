const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
    candidateID: { type: Number, default: 1 },
    halkaNo: {type: String, require: true},
    seat: {type: String, require: true},
    provinceName: {type: String, require: true},
    identityNumber: {type: String, require: true},
    name: {type: String, require: true},
    city: {type: String, require: true},
    image: {type: String, require: true},
    partyName: {type: String, require: true},
    symbol: {type: String, require: true},
    symbolText: {type: String, require: true},
    
}, {timestamps: true});

const Candidate = mongoose.model('Candidate', candidateSchema);

module.exports = Candidate;
