import { COLORS, TEXT } from "../../theme/theme"

const FourOhFour = () => {
    return (
        <div className="flex flex-col justify-center items-center text-center" style={{ minHeight: "100vh" }}>
            <h2 className={`${COLORS.red} text-7xl font-bold`}>404</h2>
            <span className={`${TEXT.large} font-semibold`}>Not Found</span>
        </div>
    )
}

export default FourOhFour