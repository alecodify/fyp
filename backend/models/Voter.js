const mongoose = require('mongoose');

const voterSchema = new mongoose.Schema({
  name: {type: String, require: true},
  fatherName: {type: String, require: true},
  gender: {type: String, require: true},
  province: {type: String, require: true},
  currentAddress: {type: String, require: true},
  permanentAddress: {type: String, require: true},
  identityNumber: {type: String, require: true},
  nationalHalkaNo: {type: String, require: true},
  provinceHalkaNo: {type: String, require: true},
  dateOfBirth: {type: String, require: true},
  dateOfIssue: {type: String, require: true},
  dateOfExpiry: {type: String, require: true},
  image: {type: String, require: true}, 
  isVoteCasted: { type: Boolean, default: false }
}, {timestamps: true});

const Voter = mongoose.model('Voter', voterSchema);

module.exports = Voter;
