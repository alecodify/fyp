const Candidate = require("../models/Candidate");

module.exports = {
    addCandidate: async(req, res , next) =>{
            const { halkaNo, seat, provinceName, city, identityNumber, name, image, partyName, symbol, symbolText, popular} = req.body;
        
            const existingCandidates = await Candidate.find({ halkaNo: req.body.halkaNo })
                .sort({ candidateID: -1 })
                .limit(1);

            let candidateID;
            if (existingCandidates.length > 0) {
                candidateID = existingCandidates[0].candidateID + 1;
            } else {
                candidateID = 1;
            }

            req.body.candidateID = candidateID;
            const newCandidate = new Candidate({candidateID, halkaNo, seat, provinceName, identityNumber, city, name, image, partyName, symbol, symbolText, popular});
            
        try {
            await newCandidate.save();

            res.status(201).json({ status: true });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    getCandidates: async (req, res, next) => {
        try {
            const candidates = await Candidate.find({}, { provinceName: 1, _id: 1, image: 1, name: 1, identityNumber: 1,  partyName: 1, symbol: 1, symbolText: 1, halkaNo: 1, seat: 1, candidateID: 1 })

            const totalCandidates = candidates.length;

            res.status(200).json({ candidates , totalCandidates})
        } catch (error) {
            return next(error)
        }
    },

    getCandidate: async(req, res, next) => {
        const candidateId = req.params.id || req.params.identityNumber || req.body.identityNumber;
        try {
            const candidate = await Candidate.findOne({identityNumber: candidateId})

            res.status(200).json(candidate)
        } catch (error) {
            return next(error)
        }
    },

    deleteCandidate: async(req, res, next) =>{
        try {
            const id = req.body._id; 
    
            const deletedCandidate = await Candidate.findByIdAndDelete(id);
    
            if (!deletedCandidate) {
                return res.status(404).json({ message: 'Candidate not found' });
            }
    
            res.status(200).json({ message: 'Candidate deleted successfully' });
        } catch (error) {
            return next(error)
        }
    },

    updateCandidate: async(req, res, next) => {
        const id = req.body._id || req.params.id;
        const { halkaNo, seat, provinceName, name, image, partyName, symbol, symbolText } = req.body;

        try {
            const candidate = await Candidate.findByIdAndUpdate(id, { halkaNo, seat, provinceName, name, image, partyName, symbol, symbolText });
            if (!candidate) {
                return res.status(404).json({ message: 'Candidate not found' });
            }
            
            res.status(200).json({ status: true, message: "Candidate updated successfully" });
        } catch (error) {
            return next(error)
        }
    }
}