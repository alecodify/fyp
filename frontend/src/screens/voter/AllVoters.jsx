import { useEffect, useState } from "react";
import { AdminNav, InputBox, LineBox } from "../../components";
import { BGCOLOR, COLORS, TEXT} from "../../theme/theme";
import { useNavigate } from "react-router-dom";

const AllVoters = () => {
  const [voters, setVoters] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVoters = async () => {
      try {
        const response = await fetch('/api/voters');
        if (response.ok) {
          const data = await response.json();
          setVoters(data.voters);
        } else {
          console.error('Failed to fetch voters');
        }
      } catch (error) {
        console.error('Error fetching voters:', error);
      }
    };

    fetchVoters();
  }, []);


  const groupedVoters = voters.reduce((acc, voter) => {
    const { province, nationalHalkaNo, provinceHalkaNo } = voter;
    if (!acc[province]) {
      acc[province] = {};
    }
    if (!acc[province][nationalHalkaNo]) {
      acc[province][nationalHalkaNo] = {};
    }
    if (!acc[province][nationalHalkaNo][provinceHalkaNo]) {
      acc[province][nationalHalkaNo][provinceHalkaNo] = [];
    }
    acc[province][nationalHalkaNo][provinceHalkaNo].push(voter);
    return acc;
  }, {});

  return (
    <div>
      <AdminNav />


      <div className="my-10">
        <div className="flex w-full lg:mr-10 flex-col lg:flex-row justify-between items-center">
          <span className="lg:ml-28 mx-2"><span className={`${COLORS.red} ${TEXT.large} lg:${TEXT.xLarge} font-bold`}>
            Note: </span>Voter are search base on the name, identity no, national halka and province halka name </span>
          <InputBox placeholder={"search..."} value={searchQuery} required={true} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>

        {Object.entries(groupedVoters).map(([province, nationalHalkaNos]) => (
          <div key={province} className="mb-6">
            <h1 className="text-4xl text-center font-bold mb-2">{province}</h1>
            {Object.entries(nationalHalkaNos).map(([nationalHalkaNo, provinceHalkaNos]) => (
              <div key={nationalHalkaNo} className="mb-4">
                <h2 className="text-2xl text-center font-bold mb-2">{nationalHalkaNo}</h2>
                {Object.entries(provinceHalkaNos).map(([provinceHalkaNo, voters]) => (
                  <div>
                    <h2 className="text-2xl text-center font-bold mb-2">{provinceHalkaNo}</h2>
                    <div key={provinceHalkaNo} className="mx-2 flex gap-2 overflow-x-scroll no-scrollbar">
                      {voters
                        .filter(voter =>
                          voter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          voter.identityNumber.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
                          voter.nationalHalkaNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          voter.provinceHalkaNo.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        .map(voter => (
                          <div key={voter.identityNumber} onClick={() => navigate("../seevoter", {state: voter})} className="p-2 rounded-lg border-2 border-red-500">
                            <div className="flex flex-col w-44 justify-center items-center">
                              <img src={voter.image} alt={voter.name} className="w-20 h-20 mx-auto my-1 fit-cover cursor-pointer rounded-full" />
                              <div className="text-left flex flex-col">
                                <LineBox label={"Name"} text={voter.name} />
                                <LineBox label={"Father N. "} text={voter.fatherName} />
                                <LineBox label={"CNIC"} text={voter.identityNumber} style={'text-lg font-semibold'} />
                                <LineBox label={"Gender"} text={voter.gender} />
                                <LineBox label={"Permanent"} text={voter.permanentAddress} />
                                <LineBox label={"Current"} text={voter.currentAddress} />
                                <LineBox label={"Date of Birth"} text={voter.dateOfBirth} />
                                <LineBox label={"CNIC Expiry"} text={voter.dateOfExpiry} />
                                <LineBox label={"CNIC Issue"} text={voter.dateOfIssue} />
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllVoters