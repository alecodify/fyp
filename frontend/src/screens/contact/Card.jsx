import { BGCOLOR, TEXT } from "../../theme/theme";

const Card = ({heading, addressText, officeNo, faxNo}) => {
    return (
        <div className={`${TEXT.small} ${BGCOLOR.lightGray} py-4 lg:${TEXT.large} shadow rounded-lg px-2 mb-4`}>
            <h1 className="font-bold select-none cursor-pointer">{heading}</h1>
             <div className="flex flex-col lg:flex-row">
             <div className="lg:w-1/2 ">
                <h2 className="font-semibold select-none">Address:</h2>
                <p className="select-none">{addressText}</p>
            </div>
            <div className="lg:w-1/2 lg:pl-4">
                <div className="flex gap-2">
                    <span className="font-semibold select-none">Office Telephone:</span>
                    <span className="cursor-pointer">{officeNo}</span>
                </div>
                <div className="flex gap-2">
                    <span className="font-semibold select-none">Fax:</span>
                    <span className="cursor-pointer">{faxNo}</span>
                </div>
            </div>
             </div>
        </div>
    )
}

export default Card