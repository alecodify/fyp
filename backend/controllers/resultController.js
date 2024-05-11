const Vote = require("../models/Vote");
const Candidate = require("../models/Candidate");

module.exports = {
    getHalkasViceResult: async (req, res, next) => {
        try {
            const votedCandidates = await Vote.find({ voteCasted: true });

            const nationalResults = {};
            const provinceResults = {};

            for (const vote of votedCandidates) {
                const nationalCandidateID = vote.nationalVote.candidateId;
                const provinceCandidateID = vote.provinceVote.candidateId;
                const nationalHalkaNoVote = vote.nationalVote.halkaNo;
                const provinceHalkaNoVote = vote.provinceVote.halkaNo;

                // Initialize results for national halka
                if (!nationalResults[nationalHalkaNoVote]) {
                    nationalResults[nationalHalkaNoVote] = {
                        winnerCandidateID: null,
                        winnerCandidateTotalVotes: 0,
                        totalVotes: 0,
                        totalCandidates: 0,
                        candidates: {},
                    };
                }

                // Initialize results for province halka
                if (!provinceResults[provinceHalkaNoVote]) {
                    provinceResults[provinceHalkaNoVote] = {
                        winnerCandidateID: null,
                        winnerCandidateTotalVotes: 0,
                        totalVotes: 0,
                        totalCandidates: 0,
                        candidates: {},
                    };
                }

                // Increment total votes for national halka
                nationalResults[nationalHalkaNoVote].totalVotes += 1;

                // Increment total votes for province halka
                provinceResults[provinceHalkaNoVote].totalVotes += 1;

                // Fetch the total candidates standing in the national halka
                const totalNationalCandidates = await Candidate.countDocuments({ halkaNo: nationalHalkaNoVote });

                // Fetch the total candidates standing in the province halka
                const totalProvinceCandidates = await Candidate.countDocuments({ halkaNo: provinceHalkaNoVote });

                // Update total candidates for national halka
                nationalResults[nationalHalkaNoVote].totalCandidates = totalNationalCandidates;

                // Update total candidates for province halka
                provinceResults[provinceHalkaNoVote].totalCandidates = totalProvinceCandidates;

                // Initialize candidate results for national halka if not exists
                if (!nationalResults[nationalHalkaNoVote].candidates[nationalCandidateID]) {
                    nationalResults[nationalHalkaNoVote].candidates[nationalCandidateID] = 0;
                }

                // Increment candidate votes for national halka
                nationalResults[nationalHalkaNoVote].candidates[nationalCandidateID] += 1;

                // Initialize candidate results for province halka if not exists
                if (!provinceResults[provinceHalkaNoVote].candidates[provinceCandidateID]) {
                    provinceResults[provinceHalkaNoVote].candidates[provinceCandidateID] = 0;
                }

                // Increment candidate votes for province halka
                provinceResults[provinceHalkaNoVote].candidates[provinceCandidateID] += 1;
            }

            // Calculate winner for each halka
            calculateWinners(nationalResults);
            calculateWinners(provinceResults);

            res.status(200).json({
                nationalResults,
                provinceResults,
            });

        } catch (error) {
            console.error('Failed to fetch results:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    getAssemblyViceResult: async (req, res, next) => {
        try {
            const votedCandidates = await Vote.find({ voteCasted: true });
            const allCandidates = await Candidate.find({});

            let nationalVotes = {};
            let provinceVotes = {};

            const nationalResults = {};
            const provinceResults = {};

            for (const vote of votedCandidates) {
                const nationalCandidateID = vote.nationalVote.candidateId;
                const provinceCandidateID = vote.provinceVote.candidateId;
                const nationalHalkaNoVote = vote.nationalVote.halkaNo;
                const provinceHalkaNoVote = vote.provinceVote.halkaNo;

                if (!nationalResults[nationalHalkaNoVote]) {
                    nationalResults[nationalHalkaNoVote] = {
                        winnerCandidateID: null,
                        winnerCandidateVotes: 0,
                        winnerCandidatePartyName: null,
                    };
                    nationalVotes = {};
                }

                nationalVotes[nationalCandidateID] = (nationalVotes[nationalCandidateID] || 0) + 1;

                if (nationalVotes[nationalCandidateID] > nationalResults[nationalHalkaNoVote].winnerCandidateVotes) {
                    nationalResults[nationalHalkaNoVote].winnerCandidateID = nationalCandidateID;
                    nationalResults[nationalHalkaNoVote].winnerCandidateVotes = nationalVotes[nationalCandidateID];

                    const winningCandidate = allCandidates.find(candidate => candidate.candidateID == nationalCandidateID && candidate.halkaNo == nationalHalkaNoVote);
                    if (winningCandidate) {
                        nationalResults[nationalHalkaNoVote].winnerCandidatePartyName = winningCandidate.partyName;
                    }
                }


                if (!provinceResults[provinceHalkaNoVote]) {
                    provinceResults[provinceHalkaNoVote] = {
                        winnerCandidateID: null,
                        winnerCandidateVotes: 0,
                        winnerCandidatePartyName: null,
                        winnerCandidateProvinceName: null,
                    },
                        provinceVotes = {};
                }

                provinceVotes[provinceCandidateID] = (provinceVotes[provinceCandidateID] || 0) + 1;

                if (provinceVotes[provinceCandidateID] > provinceResults[provinceHalkaNoVote].winnerCandidateVotes) {
                    provinceResults[provinceHalkaNoVote].winnerCandidateID = provinceCandidateID;
                    provinceResults[provinceHalkaNoVote].winnerCandidateVotes = provinceVotes[provinceCandidateID];

                    const winningCandidate = allCandidates.find(candidate => candidate.candidateID == provinceCandidateID && candidate.halkaNo == provinceHalkaNoVote);

                    if (winningCandidate) {
                        provinceResults[provinceHalkaNoVote].winnerCandidatePartyName = winningCandidate.partyName;
                        provinceResults[provinceHalkaNoVote].winnerCandidateProvinceName = winningCandidate.provinceName;
                    }
                }
            }

            res.status(200).json({
                nationalResults,
                provinceResults,
            });
        } catch (error) {
            console.error('Failed to fetch results:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
}

function calculateWinners(halkaResults) {
    for (const halkaNo in halkaResults) {
        const candidates = halkaResults[halkaNo].candidates;

        const winnerCandidateID = Object.keys(candidates).reduce((a, b) => {
            if (candidates[a] === candidates[b]) {
                return a < b ? a : b;
            }
            return candidates[a] > candidates[b] ? a : b;
        }, null);


        const votes = candidates[winnerCandidateID];

        halkaResults[halkaNo].winnerCandidateID = winnerCandidateID;
        halkaResults[halkaNo].winnerCandidateTotalVotes = votes;
    }
}