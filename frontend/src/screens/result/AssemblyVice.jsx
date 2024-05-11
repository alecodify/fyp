import { useEffect, useState } from "react";
import { TEXT, COLORS } from "../../theme/theme";

const AssemblyVice = ({ adminNav }) => {
  const [partyWiseNationalResults, setPartyWiseNationalResults] = useState([]);
  const [partyWiseProvinceResults, setPartyWiseProvinceResults] = useState([]);
  const [provinceData, setProvinceData] = useState([]);

  useEffect(() => {
    const fetchAllResults = async () => {
      try {
        const response = await fetch(`/api/results/assemblyVice`);
        if (response.ok) {
          const data = await response.json();
          const processedResults = processResults(data.nationalResults, data.provinceResults);
          setPartyWiseNationalResults(processedResults.national);
          setPartyWiseProvinceResults(processedResults.province);
          setProvinceData(Object.entries(processedResults.province));
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchAllResults();
  }, []);

  const processResults = (nationalResults, provinceResults) => {
    const partyWiseNationalResults = {};
    const partyWiseProvinceResults = {};

    Object.keys(nationalResults).forEach(halkaNo => {
      const { winnerCandidatePartyName } = nationalResults[halkaNo];

      if (winnerCandidatePartyName) {
        if (!partyWiseNationalResults[winnerCandidatePartyName]) {
          partyWiseNationalResults[winnerCandidatePartyName] = {
            totalWins: 0,
          };
        }

        partyWiseNationalResults[winnerCandidatePartyName].totalWins += 1;
      }
    });

    Object.keys(provinceResults).forEach(halkaNo => {
      const { winnerCandidatePartyName, winnerCandidateProvinceName } = provinceResults[halkaNo];

      if (!partyWiseProvinceResults[winnerCandidateProvinceName]) {
        partyWiseProvinceResults[winnerCandidateProvinceName] = {};
      }

      if (!partyWiseProvinceResults[winnerCandidateProvinceName][winnerCandidatePartyName]) {
        partyWiseProvinceResults[winnerCandidateProvinceName][winnerCandidatePartyName] = 0;
      }

      partyWiseProvinceResults[winnerCandidateProvinceName][winnerCandidatePartyName] += 1;
    });

    return { national: partyWiseNationalResults, province: partyWiseProvinceResults, };
  };

  return (
    <div className="">
      {adminNav}

      <div className="px-4 pt-10 pb-4">
        <h1 className={`text-center ${TEXT.xxLarge} ${COLORS.red}`}>National Assembly</h1>
        <div className="mx-2 flex gap-2 overflow-x-scroll no-scrollbar">
          {partyWiseNationalResults && Object.keys(partyWiseNationalResults).map((partyName, index) => (
            <div key={index} className="border-2 border-gray-200 w-36 lg:w-40 bg-gray-100 rounded-lg p-2 my-2">
              <h2 className={`${TEXT.large} text-center font-bold`}>{partyName}</h2>
              <div className="w-16 flex justify-center items-center lg:w-24 h-16 bg-green-400 lg:h-24 mx-auto my-2 cursor-pointer rounded-full">
                <span className={`text-center ${TEXT.large} lg:${TEXT.xxLarge} font-bold text-white`}>{partyName}</span>
              </div>
              <p className="text-center select-none">Total Seats Win</p>
              <p className={`text-center ${TEXT.xxLarge} ${COLORS.gray} font-bold cursor-pointer select-none`}>{partyWiseNationalResults[partyName].totalWins}</p>
            </div>
          ))}
        </div>

        {provinceData.map(([provinceName, provinceResults], provinceIndex) => (
          <div key={provinceIndex}>
            <h1 className={`text-center ${TEXT.xxLarge} ${COLORS.red}`}>{provinceName} Assembly</h1>
            <div className="mx-2 flex gap-2 overflow-x-scroll no-scrollbar">
              {partyWiseProvinceResults && Object.keys(partyWiseProvinceResults[provinceName] || {}).map((partyName, index) => (
                <div key={index} className="border-2 w-36 lg:w-40 rounded-lg p-2 my-1">
                  <h2 className={`text-center ${TEXT.large} ${COLORS.gray} font-bold`}>{partyName}</h2>
                  <div className="w-16 flex justify-center items-center lg:w-24 h-16 bg-gray-300 lg:h-24 mx-auto my-2 cursor-pointer rounded-full">
                    <span className={`text-center ${TEXT.large} lg:${TEXT.xxLarge} font-bold ${COLORS.gray}`}>{partyName}</span>
                  </div>
                  <p className="text-center select-none">Total Seats Win</p>
                  <p className={`text-center ${TEXT.large} font-bold`}>{partyWiseProvinceResults[provinceName][partyName]}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div >
    </div>
  )
}

export default AssemblyVice