import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import { BallotCard } from "../../components";
import { toast } from "react-toastify";
import { BGCOLOR, COLORS, TEXT} from "../../theme/theme";

const Ballot = () => {
  const location = useLocation();
  const data = location.state;

  const navigate = useNavigate();
  const [nationalHalkaNo, setNationalHalkaNo] = useState(data.nationalHalkaNo);
  const [provinceHalkaNo, setProvinceHalkaNo] = useState(data.provinceHalkaNo);
  const [nationalCandidates, setNationalCandidates] = useState([]);
  const [provinceCandidates, setProvinceCandidates] = useState([]);
  const [voteCasted, setVoteCasted] = useState({
    voter: data._id,
    nationalVote: {
      candidateId: "",
      candidateCNIC: "",
      halkaNo: "",
    },
    provinceVote: {
      candidateId: "",
      candidateCNIC: "",
      halkaNo: "",
    },
    voteCasted: true
  })


  useEffect(() => {
    const fetchAllCandidates = async () => {
      try {
        const response = await fetch(`/api/candidates`);
        if (response.ok) {
          const responseData = await response.json();
          const candidatesData = responseData.candidates; 
          if (Array.isArray(candidatesData)) {
            const nationalCandidatesData = candidatesData.filter((candidate) => candidate.halkaNo === nationalHalkaNo);
            setNationalCandidates(nationalCandidatesData);
            const provinceCandidatesData = candidatesData.filter((candidate) => candidate.halkaNo === provinceHalkaNo);
            setProvinceCandidates(provinceCandidatesData);
          } else {
            console.error("Received non-array candidates data:", candidatesData);
            toast.error("Failed to fetch candidates. Data format error.");
          }
        } else {
          console.error("Failed to fetch candidates");
          toast.error("Failed to fetch candidates.");
        }
      } catch (error) {
        console.error(error);
        toast.error("An error occurred while fetching candidates.");
      }
    };
    
    fetchAllCandidates();
  }, [nationalHalkaNo, provinceHalkaNo]);
  


  useEffect(() => {
    const sendVoteCastedData = async (vote) => {
      try {
        const response = await fetch(`/api/votes`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(vote),
        });

        if (response.ok) {
          console.log("Vote casted data sent successfully");
          toast.success("Vote casted successfully");
          navigate("../")
        } else {
          console.error("Failed to send vote casted data");
          toast.error("Failed to vote casted");
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (voteCasted.provinceVote.candidateId && voteCasted.provinceVote.halkaNo && voteCasted.nationalVote.candidateId && voteCasted.nationalVote.halkaNo) {
      sendVoteCastedData(voteCasted);
    }
  }, [voteCasted]);

  const handleNationalVote = async (candidateID, cnic) => {
    const confirmed = window.confirm(`Are you sure you want to cast your national vote to candidateID ${candidateID} ?`);
    if (confirmed) {
       setVoteCasted((prev) => ({
        ...prev,
        nationalVote: {
          ...prev.nationalVote,
          candidateId: candidateID,
          halkaNo: nationalHalkaNo,
          candidateCNIC: cnic
        },
       }))
       toast.success("Your National Vote Casted successfully")
    } else {
      console.log("Please Cast Your National Vote");
      toast.error("Your National Vote is not cast yet")
    }
  };

  const handleProvinceVote = async (candidateID, cnic) => {
    const confirmed = window.confirm(`Are you sure you want to cast your national vote to candidateID ${candidateID} ?`);

    if (confirmed) {
      setVoteCasted((prev) => ({
        ...prev,
        provinceVote: {
          ...prev.provinceVote,
          candidateId: candidateID,
          halkaNo: provinceHalkaNo,
          candidateCNIC: cnic
        },
      }))
      toast.success("Your Province Vote Casted successfully");
    } else {
      console.log("Please Cast Your Province Vote");
      toast.error("Your Province Vote is not casted yet")
    }
  };

    
  return (
    <div className="my-10 mx-auto container text-center">
      <div className="mx-auto">
        <h1 className={`${TEXT.xLarge} lg:${TEXT.xxLarge} font-semibold mt-4 mb-4 lg:mb-4 select-none `}>National Seat Candidates</h1>
        <h2 className={`${TEXT.xLarge} lg:${TEXT.xxLarge} ${COLORS.green} font-semibold mt-4 mb-4 lg:mb-4 select-none uppercase`}>{nationalHalkaNo}</h2>
        <div className="mx-4 grid grid-cols-2 mt-4 md:grid-cols-4 lg:grid-cols-6 gap-3">
         {nationalCandidates.map((candidate) => (
            <div key={candidate.candidateID} >
              <BallotCard onClick={() => handleNationalVote(candidate.candidateID, candidate.identityNumber)} id={candidate.candidateID} cardColor={"green"} name={candidate.name} symbol={candidate.symbol} symbolText={candidate.symbolText} partyName={candidate.partyName} image={candidate.image} />
            </div>
          ))
          } 
        </div>
        <hr className="my-4 mx-20 lg:mx-0 border-red-500 border-2" />
        <h1 className={`${TEXT.xLarge} lg:${TEXT.xxLarge} font-semibold mt-4 mb-4 lg:mb-4 select-none `}>Province Seat Candidates</h1>
        <h2 className={`${TEXT.xLarge} lg:${TEXT.xxLarge} ${COLORS.green} font-semibold mt-4 mb-4 lg:mb-4 select-none uppercase`}>{provinceHalkaNo}</h2>
        <div className="mx-4 grid grid-cols-2 mt-4 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {provinceCandidates.map((candidate) => (
            <div key={candidate.candidateID} className="" >
              <BallotCard onClick={() => handleProvinceVote(candidate.candidateID, candidate.identityNumber)} id={candidate.candidateID} name={candidate.name} symbol={candidate.symbol} symbolText={candidate.symbolText} partyName={candidate.partyName} image={candidate.image} />
            </div>
          ))
          }
        </div>
      </div>
    </div>
  )
}

export default Ballot