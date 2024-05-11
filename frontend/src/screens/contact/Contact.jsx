import { ComplaintBox } from "../../components";
import Card from "./Card";

const Contact = () => {
  return (
    <div className="my-8 mx-4 lg:my-10 lg:mx-64">
      <div className="p-2">
        <Card 
        heading={"ECP SECRETARIAT ISLAMABAD"} 
        addressText={"Election Commission Of Pakistan Secretariat, Election House, Constitution Avenue, G-5/2, Islamabad"} 
        officeNo={"(+92)(51)(9205611)"} 
        faxNo={"(+92)(51)(9205300)"} />

        <Card 
        heading={"PEC OFFICE PUNJAB"} 
        addressText={"Office of PEC (Provincial Election Commissioner) Punjab, 10-Court Street, Lahore, Punjab"} 
        officeNo={"04299214684"} 
        faxNo={"04299211027"} />

        <Card 
        heading={"PEC OFFICE KHYBER PAKHTUNKHWA"} 
        addressText={"KPK Provincial Election Commissionar Office, Bungalow No. 11-A Michni Rd, Peshawar, KPK"} 
        officeNo={"0919211036"} 
        faxNo={"0919211036"} />

        <Card 
        heading={"PEC OFFICE SINDH"} 
        addressText={"Office of Provincial Election Commissioner, Pak. Sectt. Block No. 44-A, Shahrah-e-Iraq, Sadda"} 
        officeNo={"02199203385"} 
        faxNo={"02199206646"} />

        <Card 
        heading={"PEC OFFICE BALOCHISTAN"} 
        addressText={"Provincial Election Commissioner Bargenza Villas Street 1 Zarghoon Road Qetta"} 
        officeNo={"081-9202334"} 
        faxNo={"081-9202317, 9202112 & 9203674"} />
        
      </div>
      
      <ComplaintBox email={"info@ecp.gov.pk"} pageLink={false} />
    </div>
  )
}

export default Contact