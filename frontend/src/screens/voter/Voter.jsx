import { useState } from "react"
import { options, useCitiesForProvince, useNationalhalkasForProvince, useCityHalkasForCity } from "../../data/option";
import { AdminNav, Button, InputBox, SelectBox } from "../../components";
import { BGCOLOR, TEXT, COLORS } from "../../theme/theme";
import { toast } from "react-toastify";

const Voter = () => {
  const [userImage, setUserImage] = useState(null);
  const [userName, setUserName] = useState("")
  const [fatherName, setFatherName] = useState("")
  const [gender, setGender] = useState("")
  const [province, setProvince] = useState("")
  const [currentAddress, setCurrentAddress] = useState("")
  const [permanentAddress, setPermanentAddress] = useState("")
  const [identityNumber, setIdentityNumber] = useState("")
  const [email, setEmail] = useState("")
  const [nationalHalkaNo, setNationalHalkaNo] = useState("")
  const [provinceHalkaNo, setProvinceHalkaNo] = useState("")
  const [dateOfBirth, setDateOfBirth] = useState("")
  const [dateOfIssue, setDateOfIssue] = useState("")
  const [dateOfExpiry, setDateOfExpiry] = useState("")

  const provinces = options.map(option => option.province);
  const citiesForProvince = useCitiesForProvince(province, options);
  const nationalhalkasForProvince = useNationalhalkasForProvince(province, options);
  const cityHalkasForCity = useCityHalkasForCity(province, permanentAddress, options);


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

  const handleButton = async () => {
    if (!userName || !fatherName || !province || !currentAddress || !email || !permanentAddress || !nationalHalkaNo || !provinceHalkaNo || !dateOfBirth || !dateOfIssue || !identityNumber || !dateOfExpiry || !userImage) {
      toast.error("Please fill in all fields");
      return;
    }
    const user = {
      name: userName,
      fatherName: fatherName,
      gender: gender,
      province: province,
      currentAddress: currentAddress,
      permanentAddress: permanentAddress,
      identityNumber: identityNumber,
      email: email,
      nationalHalkaNo: nationalHalkaNo,
      provinceHalkaNo: provinceHalkaNo,
      dateOfBirth: dateOfBirth,
      dateOfIssue: dateOfIssue,
      dateOfExpiry: dateOfExpiry,
      image: userImage
    }

    try {
      const response = await fetch(`/api/voters`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        console.log("Voter Add successfully");
        toast.success("Voter Add successfully");

        // Reset all form fields after successful submission
        setUserName("");
        setFatherName("");
        setGender("");
        setIdentityNumber("");
        setEmail("")
        setProvince("");
        setNationalHalkaNo("");
        setCurrentAddress("");
        setPermanentAddress("");
        setProvinceHalkaNo("");
        setDateOfBirth("");
        setDateOfIssue("");
        setDateOfExpiry("");
        setUserImage(null)

      } else {
        toast.error("You are Not an Admin only Admin can add data");
        console.error("Failed to add the Voter");
      }
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <div>
      <AdminNav />

      <div className="flex items-center justify-center">
        <div className="bg-white flex flex-col justify-center items-center p-8 pt-0">
          <div className="mb-4 text-center">
            <div className="flex flex-col gap-2">
              <div className="container flex justify-center mx-auto my-4">
                <input
                  type="file"
                  id="userImageInput"
                  className="hidden"
                  onChange={(e) => handleImageChange(e, setUserImage)}
                />
                <label
                  htmlFor="userImageInput"
                  className="block w-40 h-40 border-2 border-blue-400 rounded-md cursor-pointer overflow-hidden"
                >
                  {userImage ? (
                    <img
                      src={userImage}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <span className={`${COLORS.gray}`}>upload cnic user image</span>
                    </div>
                  )}
                </label>
              </div>
            </div>
            <div className="text-left grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-2">
              <InputBox name={"name"} required={true} label={"Name"} type={"text"} onChange={(e) => setUserName(e.target.value)} />
              <InputBox name={"fatherName"} required={true} label={"Father Name"} type={"text"} onChange={(e) => setFatherName(e.target.value)} />
              <InputBox name={"gender"} required={true} label={"Gender"} type={"text"} onChange={(e) => setGender(e.target.value)} />
              <InputBox name={"cnic"} required={true} label={"CNIC No"} type={"text"} onChange={(e) => setIdentityNumber(e.target.value)} />
              <InputBox name={"email"} required={true} label={"Email"} type={"text"} onChange={(e) => setEmail(e.target.value)} />
              <SelectBox name={"province"} required={true} label={"Province"} options={provinces} onChange={(e) => setProvince(e.target.value)} />
              <SelectBox name={"nationalarea"} required={true} label={"National Halka No"} options={nationalhalkasForProvince} onChange={(e) => setNationalHalkaNo(e.target.value)} />
              <SelectBox name={"currentarea"} required={true} label={"Current Area"} options={citiesForProvince} onChange={(e) => setCurrentAddress(e.target.value)} />
              <SelectBox name={"permenantarea"} required={true} label={"Permanent Area"} options={citiesForProvince} onChange={(e) => setPermanentAddress(e.target.value)} />
              <SelectBox name={"provincearea"} required={true} label={"Province Halka No"} options={cityHalkasForCity} onChange={(e) => setProvinceHalkaNo(e.target.value)} />
              <InputBox name={"dateofbirth"} required={true} label={"Date of Birth"} type={"date"} onChange={(e) => setDateOfBirth(e.target.value)} />
              <InputBox name={"dateofissue"} required={true} label={"Date of Issue"} type={"date"} onChange={(e) => setDateOfIssue(e.target.value)} />
              <InputBox name={"dateofexpiry"} required={true} label={"Date of Expiry"} type={"date"} onChange={(e) => setDateOfExpiry(e.target.value)} />
            </div>
          </div>
          <Button text={"submit"} onClick={handleButton} style={`hover:bg-red-500`} BgColor={`${BGCOLOR.blue}`} textColor={`${COLORS.white}`} textSize={`${TEXT.medium}`} />
        </div>
      </div>
    </div>
  )
}

export default Voter