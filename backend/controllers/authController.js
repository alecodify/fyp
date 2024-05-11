const Admin = require("../models/Admin");

const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

module.exports = {
    createAdmin: async (req, res, next) => {

        if (req.body.password.length !== 7) {
            return res.status(400).json({ status: false, message: "Password length must be equal to or greater than 7 characters" });
        }

        
        if (req.body.secretKey !== process.env.EXPECTED_SECRET_KEY) {
            return res.status(403).json({ status: false, message: "Invalid secret key" });
        }

        const encryptedSecretKey = CryptoJS.AES.encrypt(req.body.secretKey, process.env.SECRET).toString();

        
        const newAdmin = new Admin({
            email: req.body.email,
            password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET).toString(),
            secretKey: encryptedSecretKey,
        });

        try {
            await newAdmin.save();

            res.status(201).json({ status: true, message: "Admin successfully created" })
        } catch (error) {
            return next(error)
        }
    },

    loginAdmin: async (req, res, next) => {
        try {
            const admin = await Admin.findOne({ email: req.body.email });

            if (!admin) {
                return res.status(404).json({ status: false, message: "Admin not found" })
            }

            const decryptedPassword = CryptoJS.AES.decrypt(admin.password, process.env.SECRET)
            const decryptedString = decryptedPassword.toString(CryptoJS.enc.Utf8);
            if (decryptedString !== req.body.password) {
                return res.status(401).json({ status: false, message: "Wrong password" })
            }

            const userToken = jwt.sign({
                id: admin._id
            }, process.env.JWT_SECRET, { expiresIn: "21d" })

            const admin_id = admin._id;

            res.status(200).json({status: true, id: admin_id, token: userToken})
        } catch (error) {
            return next(error)
        }
    }

}