import { useState } from 'react';
import { AdminNav, Button, InputBox } from "../../components";
import { BGCOLOR, TEXT, COLORS } from '../../theme/theme';
import { useLocation } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";
import { toast } from 'react-toastify';

const SeeVoter = () => {
    const location = useLocation();
    const data = location.state;

    console.log(data)

    const [voterData, setVoterData] = useState({ ...data, image: data?.image || '' });
    const [searchValue, setSearchValue] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVoterData({ ...voterData, [name]: value });
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setVoterData({ ...voterData, image: reader.result });
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleUpdateButton = async (e) =>{
        e.preventDefault();

        try {
            const response = await fetch('/api/voters/${voterData._id}', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(voterData),
            });
            if (response.ok) {
                console.log("voter data update successfully");
                toast.success("voter data update successfully")
            } else {
                console.log("voter data does not update.")
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleDeleteButton = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/voters/${voterData._id}', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(voterData),
            });
            if (response.ok) {
                console.log("voter data delete successfully");
                toast.success("voter data delete successfully")
            } else {
                console.log("voter data does not delete.")
            }
        } catch (error) {
            console.error(error);
        }

    }

    const handleSearchButton = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch(`/api/voters/${searchValue}`);
            if (response.ok) {
                const data = await response.json();
                setVoterData({ ...data, image: data?.image || '' });
            } else {
                console.error('Failed to fetch voter');
            }
        } catch (error) {
            console.error('Error fetching voter:', error);
        }
    }

    return (
        <div>

            <AdminNav />

            <div>
                <div className='flex  justify-end items-center mt-4 lg:mt-2 mr-4'>
                    <InputBox name={"search"} type={"text"} value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder={"Search by CNIC"} />
                    <CiSearch onClick={handleSearchButton} size={36} color="black" className='cursor-pointer absolute p-1 mr-2 bg-gray-200 mt-1 rounded-lg' />
                </div>
            </div>


            <div className="w-full h-full flex justify-center items-center">
                <div className='mx-2 mt-10 lg:mt-[-50px]'>

                    <div className="mx-4">
                        <div className="flex justify-center">
                            <label htmlFor="imageInput" className="cursor-pointer">
                                <img src={voterData.image} alt="" className="w-20 lg:w-24 h-20 lg:h-24 mx-auto my-2 fit-cover rounded-full border-2 border-gray-400" />
                            </label>
                            <input
                                id="imageInput"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageChange}
                            />
                        </div>

                        <div className="text-left grid grid-cols-2 gap-2">
                            <InputBox name={"name"} type={"text"} label={"Name"} value={voterData.name} onChange={handleChange} placeholder={"Enter name"} />
                            <InputBox name={"fatherName"} type={"text"} label={"Father Name"} value={voterData.fatherName} onChange={handleChange} placeholder={"Enter fathername"} />
                            <InputBox name={"gender"} type={"text"} label={"Gender"} value={voterData.gender} onChange={handleChange} placeholder={"Enter gender"} />
                            <InputBox name={"identityNumber"} type={"text"} label={"Identity Number"} value={voterData.identityNumber} style={'border-gray-400'} onChange={""} disabled={true} />
                            <InputBox name={"userEmail"} type={"text"} label={"Email"} placeholder={"Enter email"} value={voterData.email} onChange={handleChange} />
                            <InputBox name={"province"} type={"text"} label={"Province"} value={voterData.province} onChange={handleChange} placeholder={"Enter province"} />
                            <InputBox name={"nationalHalkaNo"} type={"text"} label={"National HalkaNo"} value={voterData.nationalHalkaNo} onChange={handleChange} placeholder={"Enter national halkaNo"} />
                            <InputBox name={"provinceHalkaNo"} type={"text"} label={"Province HalkaNo"} value={voterData.provinceHalkaNo} onChange={handleChange} placeholder={"Enter province halkaNo"} />
                            <InputBox name={"dateOfBirth"} type={"date"} label={"Date of Birth"} value={voterData.dateOfBirth} onChange={handleChange} placeholder={"Enter date of birth"} />
                            <InputBox name={"dateOfExpiry"} type={"date"} label={"Date of Expiry"} value={voterData.dateOfExpiry} onChange={handleChange} placeholder={"Enter date of expiry"} />
                            <InputBox name={"dateOfIssue"} type={"date"} label={"Date of Issue"} value={voterData.dateOfIssue} onChange={handleChange} placeholder={"Enter date of issue"} />
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

export default SeeVoter