import { useEffect, useState } from "react";
import { AdminNav, InputBox } from "../../components";
import { useNavigate } from "react-router-dom";
import { BGCOLOR, COLORS, TEXT} from "../../theme/theme";

const AllCandidates = () => {
    const navigate = useNavigate();
    const [candidates, setCandidates] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                const response = await fetch('/api/candidates/');
                if (response.ok) {
                    const data = await response.json();
                    setCandidates(data.candidates);
                } else {
                    console.error('Failed to fetch candidates');
                }
            } catch (error) {
                console.error('Error fetching candidates:', error);
            }
        };

        fetchCandidates();
    }, []);


    const groupedCandidates = {};
    candidates.forEach(candidate => {
        if (candidate) {
            const { provinceName, halkaNo } = candidate;
            if (!groupedCandidates[provinceName]) {
                groupedCandidates[provinceName] = {};
            }
            if (!groupedCandidates[provinceName][halkaNo]) {
                groupedCandidates[provinceName][halkaNo] = [];
            }
            groupedCandidates[provinceName][halkaNo].push(candidate);
        }
    });

    return (
        <div>

            <AdminNav />

            <div className="my-10">
                <div className="flex lg:mr-10 flex-col lg:flex-row justify-between items-center">
                    <span className="lg:ml-28 mx-2"><span className={`${COLORS.red} ${TEXT.large} lg:${TEXT.xLarge} font-bold`}>
                        Note: </span>Candidates are Searched based on name, party name, symbol name, or halka number. </span>
                    <InputBox placeholder={"search..."} value={searchQuery} required={true} onChange={(e) => setSearchQuery(e.target.value)} />
                </div>

                {Object.entries(groupedCandidates).map(([provinceName, halkas]) => (
                    <div key={provinceName} className="mb-6">
                        <h1 className="text-3xl text-center font-bold mb-2">{provinceName}</h1>
                        {Object.entries(halkas).map(([halkaNo, candidates]) => (
                            <div key={halkaNo} className="mb-4">
                                <h2 className="text-2xl text-center font-bold mb-2">{halkaNo}</h2>
                                <div className="mx-2 flex gap-2 overflow-x-scroll no-scrollbar">
                                    {candidates
                                    .filter(candidate =>
                                        candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                        candidate.partyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                        candidate.symbolText.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                        candidate.halkaNo.toLowerCase().includes(searchQuery.toLowerCase())
                                    )
                                    .map(candidate => (
                                        <div key={candidate._id} onClick={() => navigate("../seecandidate", {state: candidate}) } className="px-4 py-2 rounded-lg border-2 border-red-500">
                                            <div className="flex w-32 flex-col justify-center items-center">
                                                <span className="w-full text-center">Candidate ID</span>
                                                <p className="text-2xl font-bold">{candidate.candidateID}</p>
                                                <img src={candidate.image} alt={candidate.name} className="w-16 lg:w-24 h-16 lg:h-24 mx-auto my-2 fit-cover cursor-pointer rounded-full" />
                                                <h2 className="text-xl font-semibold select-none">{candidate.name}</h2>
                                                <p className={`${TEXT.large} ${COLORS.gray} select-none`}>{candidate.symbolText}</p>
                                                <p className={`${TEXT.large} ${COLORS.gray} font-bold select-none`}>{candidate.partyName}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ))}

            </div>
        </div>
    )
}

export default AllCandidates;
