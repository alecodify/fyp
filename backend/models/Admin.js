const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    secretKey: {type: String, require: true},
})

module.exports = mongoose.model("Admin", AdminSchema);