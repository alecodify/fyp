import {TEXT} from "../../theme/theme";

const Card = ({ image , candidateID , name, symbolText, partyName, resultData }) => {
    return (
        <div>
            <span>Candidate ID</span>
            <div className="text-xl font-bold">{candidateID}</div>
            <img src={image} alt="Candidate" className="w-16 lg:w-24 h-16 lg:h-24 mx-auto my-1 fit-cover cursor-pointer rounded-full" />
            <div className="mb-2 cursor-pointer">
                <h2 className={`${TEXT.medium} lg:${TEXT.large}  font-semibold select-none`}>{name}</h2>
                <p className={`${TEXT.small} select-none`}>{symbolText}</p>
                <p className={`${TEXT.small} lg:${TEXT.medium} font-semibold text-gray-500 select-none`}>{partyName}</p>
                <p className={`${TEXT.small} lg:${TEXT.medium} select-none font-medium`}>Votes: {resultData}</p>
            </div>
        </div>
    )
}

export default Card