import {COLORS,TEXT} from "../../theme/theme";

const Card = ({id, cardColor ,symbol, name, symbolText, image, partyName, onClick ,  disabled}) => {
    return (
        <div className="">
            <div className={`${cardColor === "green" ? "bg-green-200" : "bg-white"} p-2 rounded-md shadow`} style={{ border: "1px solid gray" }}>
                <span>Candidate ID</span>
                <div className={`${TEXT.large} font-bold`}>{id}</div>
                <img
                    src={image}
                    alt={name}
                    className="w-20 lg:w-24 h-20 lg:h-24 mx-auto my-1 fit-cover cursor-pointer rounded-full"
                />
                <div className="mb-2 lg:mb-4 cursor-pointer">
                    <h2 className={`${TEXT.large} lg:${TEXT.xLarge} font-semibold select-none`}>{name}</h2>
                    <p className={`${TEXT.small} lg:${TEXT.large} ${COLORS.gray} select-none`}>{symbolText}</p>
                    <p className={`${TEXT.small} lg:${TEXT.large} ${COLORS.gray} font-semibold select-none`}>{partyName}</p>
                    <button onClick={onClick} disabled={disabled} className="mt-2 rounded-lg py-1 lg:py-2 text-lg text-white px-3 lg:px-4 bg-blue-600">vote</button>
                </div>
            </div>
        </div>
    )
}

export default Card