import { useState } from 'react';
import { AdminNav, Button, InputBox, SelectBox } from '../../components';
import { BGCOLOR, COLORS, TEXT } from '../../theme/theme';
import { options, useCitiesForProvince, useCityHalkasForCity, useNationalhalkasForProvince } from '../../data/option';
import { toast } from 'react-toastify';

const Candidate = () => {
    const [candidateImage, setCandidateImage] = useState(null);
    const [candidateName, setCandidateName] = useState("")
    const [province, setProvince] = useState("")
    const [seat, setSeat] = useState("")
    const [city, setCity] = useState("")
    const [halkaNo, setHalkaNo] = useState("")
    const [symbol, setSymbol] = useState("");
    const [symbolText, setSymbolText] = useState("");
    const [partyName, setPartyName] = useState("");
    const [identityNumber, setIdentityNumber] = useState("");

    const handleImageChange = (e, setImageFunction) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = async () => {
                setImageFunction(reader.result)
            };

            reader.readAsDataURL(file);
        } else {
            setImageFunction(null);
        }
    }

    const provinces = options.map(option => option.province);
    const citiesForProvince = useCitiesForProvince(province, options);
    const nationalhalkasForProvince = useNationalhalkasForProvince(province, options);
    const cityHalkasForCity = useCityHalkasForCity(province, city, options);

    const handleSubmit = async() => {
        if (!candidateImage || !candidateName || !province || !city || !seat || !halkaNo || !symbol || !symbolText || !partyName || !identityNumber) {
            toast.error("Please fill all the fields")
            return;
        }

        const candidate = {
            halkaNo: halkaNo,
            provinceName: province,
            seat: seat,
            identityNumber: identityNumber,
            name: candidateName,
            image: candidateImage,
            partyName: partyName,
            city: city,
            symbol: symbol,
            symbolText: symbolText,
        }

        try {
            const response = await fetch(`/api/candidates`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(candidate),
            });

            if (response.ok) {
                console.log("Candidate Add successfully");
                toast.success("Candidate Add successfully");

                // Reset all form fields after successful submission
                setCandidateImage(null);
                setCandidateName("");
                setProvince("");
                setSeat("");
                setCity("");
                setHalkaNo("");
                setSymbol("");
                setSymbolText("");
                setPartyName("");
                setIdentityNumber("");
            } else {
                toast.error("You are Not an Admin only Admin can add data");
                console.error("Failed to add the candidate");
            }
        } catch (error) {
            console.log(error);
        }
       

    }


    return (
        <div>
            <AdminNav /> 
            <div className="flex items-center justify-center">
                <div className="bg-white flex flex-col justify-center items-center p-8">
                    <div className="mb-4 text-center">
                   
                        <div className="flex flex-col gap-2">
                            <div className="container flex justify-center mx-auto my-4">
                                <input type="file" id="candidateImageInput" className="hidden" onChange={(e) => handleImageChange(e, setCandidateImage)} />
                                <label htmlFor="candidateImageInput" className="block w-40 h-40 border-2 border-blue-400 rounded-md cursor-pointer overflow-hidden" >
                                    {candidateImage ? (
                                        <img src={candidateImage} alt="" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="flex items-center justify-center h-full">
                                            <span className={`${COLORS.gray}`}>upload candidate image</span>
                                        </div>
                                    )}
                                </label>
                            </div>
                        </div>

                        <div className="text-left grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-2">
                            <InputBox name={"cName"} required={true} label={"Name"} type={"text"} onChange={(e) => setCandidateName(e.target.value)} />
                            <InputBox name={"cnic"} required={true} label={"CNIC No"} type={"text"} onChange={(e) => setIdentityNumber(e.target.value)} />
                            <SelectBox name={"cProvince"} required={true} label={"Province"} options={provinces} onChange={(e) => setProvince(e.target.value)} />
                            <SelectBox name={"cCity"} required={true} label={"City"} options={citiesForProvince} onChange={(e) => setCity(e.target.value)} />
                            <InputBox name={"cSeat"} required={true} label={"Seat"} placeholder={"National / Province"} type={"text"} onChange={(e) => setSeat(e.target.value)} />
                            <SelectBox name={"cHalka"} required={true} label={"Halka No"} options={seat === "National" ? nationalhalkasForProvince : cityHalkasForCity} onChange={(e) => setHalkaNo(e.target.value)} />
                            <InputBox name={"cSymbol"} required={true} label={"Symbol"} type={"text"} onChange={(e) => setSymbol(e.target.value)} />
                            <InputBox name={"cSymbolText"} required={true} label={"Symbol Text"} type={"text"} onChange={(e) => setSymbolText(e.target.value)} />
                            <InputBox name={"cPartyName"} required={true} label={"Party Name"} type={"text"} onChange={(e) => setPartyName(e.target.value)} />
                        </div>

                    </div>
                    <Button text={"submit"} onClick={handleSubmit} style={`hover:bg-red-500`} BgColor={`${BGCOLOR.blue}`} textColor={`${COLORS.white}`} textSize={`${TEXT.medium}`} />
                </div>
            </div>
        </div>
    )
}

export default Candidate