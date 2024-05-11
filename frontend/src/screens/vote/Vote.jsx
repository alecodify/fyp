import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, InputBox } from "../../components";
import { toast } from "react-toastify";

const Vote = () => {
  const navigate = useNavigate()
  const [cnicNo, setCnicNo] = useState(null);
  const [voter, setVoter] = useState([]);
  const [isVoteCasted , setISVoteCasted] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(false);


  const handleButton = async (e) => {
    e.preventDefault();

    if (!cnicNo) {
      toast.error("Please Enter Your Cnic.");
      return;  
    }

    try {
      const response = await fetch(`/api/voters/${cnicNo}`);
      if (response.ok) {
        const data = await response.json();
        if (data.isVoteCasted) {
          toast.error("Your vote has already been casted.");
        } else {
          setVoter(data);
          navigate("../ballot", { state: data });
        }
      } else {
        toast.error("Failed to fetch voter data.");
      }
    } catch (error) {
      console.error("Error fetching voter:", error);
      toast.error("An error occurred while fetching voter data.");
    }

  }

  return (
    <div className="mt-24 lg:mt-20 flex items-center mb-28 lg:mb-2 justify-center">
      <div className="bg-white flex flex-col justify-center items-center p-8">
        <div className="flex justify-center items-center flex-col gap-2">
          <InputBox name={"votercnic"} label={"Enter CNIC No"} required={true} type={"text"} onChange={(e) => setCnicNo(e.target.value)} />
          <Button text={"submit"} onClick={handleButton} disabled={buttonDisabled} BgColor={"bg-red-500"} textColor={"text-white"} />
        </div>
      </div>
    </div>
  )
}

export default Vote