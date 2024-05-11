import { TEXT } from "../../theme/theme"

const Heading = ({halkaNo, totalVotes, style}) => {
    return (
        <div>
            <h2 className={`text-center mx-auto ${TEXT.xxLarge} ${style}`}>{halkaNo}</h2>
            <p className={`text-center mx-auto ${TEXT.large}`}>Total Votes Casted {totalVotes}</p>
        </div>
    )
}

export default Heading