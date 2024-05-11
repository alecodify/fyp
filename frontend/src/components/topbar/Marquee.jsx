import { BGCOLOR, TEXT } from "../../theme/theme";
import "./style.css"

const Marquee = ({ text }) => {
    return (
        <div className={`${BGCOLOR.lightGreen} overflow-hidden whitespace-nowrap`}>
            <div className={`marquee-text py-3 ${TEXT.small} lg:${TEXT.large}`} >{text}</div>
        </div>
    )
}

export default Marquee