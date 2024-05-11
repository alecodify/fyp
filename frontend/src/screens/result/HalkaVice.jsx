import { useEffect, useState } from "react";
import { InputBox, ResultCard, ResultHeader } from "../../components";
import {COLORS, TEXT} from "../../theme/theme";


const HalkaVice = ({ adminNav }) => {
    const [candidates, setCandidates] = useState([]);
    const [nationalResults, setNationalResults] = useState({});
    const [provinceResults, setProvinceResults] = useState({});
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchAllCandidates = async () => {
            try {
                const response = await fetch(`/api/candidates`);
                const data = await response.json();
                if (response.ok) {
                    setCandidates(data.candidates);
                } else {
                    console.error("Failed to fetch candidates");
                }
            } catch (error) {
                console.error(error);
            }
        };

        const fetchAllResults = async () => {
            try {
                const response = await fetch(`/api/results/halkaVice`);
                const data = await response.json();
                if (response.ok) {
                    setNationalResults(data.nationalResults);
                    setProvinceResults(data.provinceResults);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchAllCandidates();
        fetchAllResults();

    }, [])

    const filterCandidates = (candidates, query) => {
        return candidates.filter((candidate) => {
          const candidateNameMatch = candidate.name.toLowerCase().includes(query.toLowerCase());
          const halkaHeadingMatch = candidate.halkaNo.toLowerCase().includes(query.toLowerCase());
          const partyNameMatch = candidate.partyName.toLowerCase().includes(query.toLowerCase());
    
          return candidateNameMatch || halkaHeadingMatch || partyNameMatch;
        });
      };

    const renderCandidateResults = () => {
        const results = [];
    
        const filteredCandidates = filterCandidates(candidates, searchQuery);
    
        for (const halkaNo in nationalResults) {
          const halkaData = nationalResults[halkaNo];
          const matchingCandidates = filteredCandidates.filter(
            (candidate) => candidate.halkaNo === halkaNo
          );
    
          if (matchingCandidates.length > 0) {
            
          results.push(
            <div key={`heading-${halkaNo}`} className="my-3 flex flex-col mx-auto">
                <ResultHeader halkaNo={halkaNo} totalVotes={halkaData.totalVotes} style={"text-red-500"}/>
            </div>
          );
    
          results.push(
            <div key={`candidates-${halkaNo}`} className="mx-2 flex gap-2 overflow-x-scroll no-scrollbar">
              {matchingCandidates.map((candidate) => {
                const candidateID = candidate.candidateID;
                const resultData = halkaData.candidates[candidateID];
                const isWinner = resultData === halkaData.winnerCandidateTotalVotes;
    
                if (resultData) {
    
                  return (
                    <div key={candidate._id} className={`p-2 w-36 lg:w-40 rounded-lg shadow text-center ${isWinner ? "bg-red-300" : "bg-white"}`} style={{ border: "1px solid gray" }}>
                       <ResultCard name={candidate.name} candidateID={candidate.candidateID} image={candidate.image} symbolText={candidate.symbolText} partyName={candidate.partyName} resultData={resultData} />
                    </div>
                  );
                }
    
                return null;
              })}
            </div>
          );
            
          }
        }
    
        
        for (const halkaNo in provinceResults) {
            const halkaData = provinceResults[halkaNo];
            const matchingCandidates = filteredCandidates.filter(
                (candidate) => candidate.halkaNo === halkaNo
              );
    
            if (matchingCandidates.length > 0) {
            
            results.push(
                <div key={`heading-${halkaNo}`} className="my-3 flex flex-col mx-auto">
                  <ResultHeader halkaNo={halkaNo} totalVotes={halkaData.totalVotes} style={"text-blue-500"}/>
                </div>
              );
        
              results.push(
                <div key={`candidates-${halkaNo}`} className="mx-2 flex gap-2 overflow-x-scroll no-scrollbar">
                  {matchingCandidates.map((candidate) => {
                    const candidateID = candidate.candidateID;
                    const resultData = halkaData.candidates[candidateID];
                    const isWinner = resultData === halkaData.winnerCandidateTotalVotes;
        
                    return (
                      <div key={candidate._id}  className={`p-2 w-36 lg:w-40 rounded-lg shadow text-center ${isWinner ? "bg-green-300" : "bg-white"  }`}  style={{ border: "1px solid gray" }}>
                         <ResultCard name={candidate.name} candidateID={candidate.candidateID} image={candidate.image} symbolText={candidate.symbolText} partyName={candidate.partyName} resultData={resultData} />
                      </div>
                    );
                  })}
                </div>
              );   
            }
          }
    
        return results;
      };
    

    return<div className="mb-10">
    {adminNav}
    <div className="flex lg:mr-10 mt-10 flex-col lg:flex-row justify-between items-center">
    <span className="lg:ml-28 mx-4"><span className={`${COLORS.red} ${TEXT.large} lg:${TEXT.xLarge} font-bold`}>
      Note: </span>The Candidates who get zero vote does not show. If the candidates having same scores than candidate with smaller candidateID wins</span>
    <InputBox placeholder={"search..."} required={true} onChange={(e) => setSearchQuery(e.target.value)} />
    </div>
    {renderCandidateResults()}
    </div>;
}

export default HalkaVice