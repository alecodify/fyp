import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, InputBox } from "../../components";
import { toast } from "react-toastify";

const Vote = () => {
  const navigate = useNavigate();
  const [cnicNo, setCnicNo] = useState("");
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [voter, setVoter] = useState({});
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [receivedCode, setReceivedCode] = useState("");

  const handleButton = async (e) => {
    e.preventDefault();

    if (!cnicNo) {
      toast.error("Please Enter Your CNIC.");
      return;
    }

    try {
      const response = await fetch(`/api/voters/${cnicNo}`);
      if (response.ok) {
        const data = await response.json();
        setVoter(data);

        if (data.email === email) {
          if (data.isVoteCasted) {
            toast.error("Your vote has already been casted.");
          } else {
            const codeResponse = await fetch('/api/code/send', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ contact: email })
            });

            if (codeResponse.ok) {
              const codeData = await codeResponse.json();
              setReceivedCode(codeData.code);
              setCodeSent(true);
              toast.success("Verification code sent.");
            } else {
              toast.error("Failed to send verification code.");
            }
          }
        } else {
          toast.error("Email or Phone number does not match.");
        }
      } else {
        toast.error("Failed to fetch voter data.");
      }
    } catch (error) {
      console.error("Error fetching voter:", error);
      toast.error("An error occurred while fetching voter data.");
    }
  };

  const verifyCode = async () => {
    try {
      const response = await fetch('/api/code/receive', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ contact: email, code: verificationCode })
      });

      if (response.ok) {
        navigate("../ballot", { state: voter });
      } else {
        const data = await response.json();
        toast.error(data.message || "Invalid verification code.");
      }
    } catch (error) {
      console.error("Error verifying code:", error);
      toast.error("An error occurred while verifying the code.");
    }
  };

  return (
    <div className="mt-24 lg:mt-6 flex items-center mb-28 lg:mb-0 justify-center">
      <div className="bg-white flex flex-col justify-center items-center p-8">
        <div className="flex justify-center items-center flex-col gap-2">
          <InputBox name={"votercnic"} label={"Enter CNIC No"} required={true} type={"text"} onChange={(e) => setCnicNo(e.target.value)} />
          <InputBox name={"voteremail"} label={"Enter Email"} required={true} type={"text"} onChange={(e) => setEmail(e.target.value)} />
          {codeSent && (
            <InputBox name={"verificationCode"} label={"Enter Verification Code"} required={true} type={"text"} onChange={(e) => setVerificationCode(e.target.value)} />
          )}
          {!codeSent ? (
            <Button text={"Submit"} onClick={handleButton} disabled={buttonDisabled} BgColor={"bg-red-500"} textColor={"text-white"} />
          ) : (
            <Button text={"Verify Code"} onClick={verifyCode} disabled={buttonDisabled} BgColor={"bg-green-500"} textColor={"text-white"} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Vote;
