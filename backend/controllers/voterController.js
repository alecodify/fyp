const Voter = require("../models/Voter");

module.exports = {
    addVoter: async(req, res, next) =>{
        const { name, fatherName, gender,email, province, currentAddress, permanentAddress, identityNumber, nationalHalkaNo, provinceHalkaNo, dateOfBirth, dateOfIssue, dateOfExpiry, image,} = req.body;

        const newVoter = new  Voter({name, fatherName, gender,email, province, currentAddress, permanentAddress, identityNumber, nationalHalkaNo, provinceHalkaNo, dateOfBirth, dateOfIssue, dateOfExpiry, image});
        try {
            await newVoter.save();

            res.status(201).json({ status: true });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    getVoters: async(req, res, next) =>{
        try {
            const voters = await Voter.find({}, { _id: 1, name: 1, fatherName: 1, gender: 1, province: 1, currentAddress:1, permanentAddress:1, identityNumber:1 , nationalHalkaNo: 1, provinceHalkaNo:1, dateOfBirth:1, dateOfIssue:1, dateOfExpiry:1, image:1, email:1  })

            const totalVoters = voters.length;

            res.status(200).json({ voters , totalVoters})
        } catch (error) {
            return next(error)
        }
    },

    getVoter: async(req, res, next) => {
        const voterId = req.params.id || req.params.identityNumber || req.body.identityNumber;
        try {
            const voter = await Voter.findOne({identityNumber: voterId})

            res.status(200).json(voter)
        } catch (error) {
            return next(error)
        }
    },

    deleteVoter: async(req, res, next) =>{
        try {
            const id = req.body._id; 
    
            const deletedVoter = await Voter.findByIdAndDelete(id);
    
            if (!deletedVoter) {
                return res.status(404).json({ message: 'Voter not found' });
            }
    
            res.status(200).json({ message: 'Voter deleted successfully' });
        } catch (error) {
            return next(error)
        }
    },

    updateVoter: async(req, res, next) => {
        const id = req.body._id || req.params.id;
        const { name, fatherName, gender, province,email, currentAddress, permanentAddress, nationalHalkaNo, provinceHalkaNo, dateOfBirth, dateOfIssue, dateOfExpiry, image } = req.body;

        try {
            const voter = await Voter.findByIdAndUpdate(id, { name, fatherName, gender, province, currentAddress, permanentAddress, nationalHalkaNo, provinceHalkaNo, dateOfBirth, dateOfIssue, dateOfExpiry, image });
            if (!voter) {
                return res.status(404).json({ message: 'Voter not found' });
            }
            
            res.status(200).json({ status: true, message: "Voter updated successfully" });
        } catch (error) {
            return next(error)
        }
    }
}