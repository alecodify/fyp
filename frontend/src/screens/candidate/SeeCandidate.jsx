import { useState } from 'react';
import { AdminNav, Button, InputBox } from '../../components';
import { BGCOLOR, COLORS, TEXT } from '../../theme/theme';
import { useLocation } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";
import { toast } from 'react-toastify';

const SeeCandidate = () => {
    const location = useLocation();
    const data = location.state;
    const [candidateData, setcandidateData] = useState({ ...data, image: data?.image || '' });
    const [searchValue, setSearchValue] = useState('');
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setcandidateData({ ...candidateData, [name]: value });
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setcandidateData({ ...candidateData, image: reader.result });
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleUpdateButton = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/candidates/${candidateData._id}', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(candidateData),
            });
            if (response.ok) {
                console.log("candidate data update successfully");
                toast.success("candidate data update successfully")
            } else {
                console.log("candidate data does not update.")
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteButton = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/candidates/${candidateData._id}', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(candidateData),
            });
            if (response.ok) {
                console.log("candidate data delete successfully");
                toast.success("candidate data delete successfully")
            } else {
                console.log("candidate data does not delete.")
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleSearchButton = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`/api/candidates/${searchValue}`);
            if (response.ok) {
                const data = await response.json();
                setcandidateData({ ...data, image: data?.image || '' });
            } else {
                console.error('Failed to fetch candidate');
            }
        } catch (error) {
            console.error('Error fetching candidate:', error);
        }
    };


   

    return (
        <div>
            <AdminNav />

            <div>
            <div className='flex  justify-end items-center mt-4 mr-4'>
                <InputBox name={"search"} type={"text"} value={searchValue} onChange={(e) => setSearchValue(e.target.value) } placeholder={"Search by CNIC"} />
                <CiSearch onClick={handleSearchButton} size={36} color="black" className='cursor-pointer absolute p-1 mr-2 bg-gray-200 mt-1 rounded-lg' />
            </div>
            </div>
        

            <div className="w-full h-full flex justify-center items-center">
                <div className='mx-2 mt-10 lg:mt-0'>

                    <div className="mx-4">

                        <div className="flex justify-center">
                            <label htmlFor="imageInput" className="cursor-pointer">
                                <img src={candidateData.image} alt="" className="w-20 lg:w-24 h-20 lg:h-24 mx-auto my-2 fit-cover rounded-full border-2 border-gray-400" />
                            </label>
                            <input
                                id="imageInput"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageChange} />
                        </div>

                        <div className="text-left grid grid-cols-2 gap-2">
                            <InputBox name={"candidateID"} type={"number"} label={"Candidate ID"} value={candidateData.candidateID} onChange={handleChange} placeholder={"Enter candidate id"} />
                            <InputBox name={"name"} type={"text"} label={"Name"} value={candidateData.name} onChange={handleChange} placeholder={"Enter name"} />
                            <InputBox name={"identityNumber"} type={"text"} label={"Identity Number"} value={candidateData.identityNumber} style={'border-gray-400'} onChange={""} disabled={true} />
                            <InputBox name={"provinceName"} type={"text"} label={"Province"} value={candidateData.provinceName} onChange={handleChange} placeholder={"Enter province"} />
                            <InputBox name={"seat"} type={"text"} label={"Seat"} value={candidateData.seat} onChange={handleChange} placeholder={"Enter seat"} />
                            <InputBox name={"halkaNo"} type={"text"} label={"HalkaNo"} value={candidateData.halkaNo} onChange={handleChange} placeholder={"Enter halkaNo"} />
                            <InputBox name={"partyName"} type={"text"} label={"Party Name"} value={candidateData.partyName} onChange={handleChange} placeholder={"Enter party name"} />
                            <InputBox name={"symbol"} type={"text"} label={"Symbol"} value={candidateData.symbol} onChange={handleChange} placeholder={"Enter symbol"} />
                            <InputBox name={"symbolText"} type={"text"} label={"Symbol Text"} value={candidateData.symbolText} onChange={handleChange} placeholder={"Enter symbol text"} />
                        </div>

                    </div>

                    <div className="flex mx-6 mt-4 gap-2 justify-end">
                        <Button onClick={handleDeleteButton} text={"Delete"} BgColor={`${BGCOLOR.red}`} textColor={`${COLORS.white}`} textSize={`${TEXT.large}`} style={'hover:bg-red-700'} />
                        <Button onClick={handleUpdateButton} text={"Update"} BgColor={`${BGCOLOR.blue}`} textColor={`${COLORS.white}`} textSize={`${TEXT.large}`} style={'hover:bg-green-500'} />
                    </div>

                </div>

            </div>
        </div>
    )
}

export default SeeCandidate