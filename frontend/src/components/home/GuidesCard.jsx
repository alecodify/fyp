import { IoMdArrowRoundForward } from "react-icons/io";
import { BGCOLOR, COLORS, TEXT } from "../../theme/theme";

const GuidesCard = ({ title, data }) => {
    return (
        <div className={`flex-1 ${BGCOLOR.white} p-2 border-gray-300 border-2 lg:p-6 rounded-lg shadow-md`}>
            <span className="flex items-center gap-2 text-xl text-red-500 font-bold">
                <IoMdArrowRoundForward className="text-2xl" /> {title} </span>

            <div className={`flex flex-col ${TEXT.small} lg:${TEXT.large} mt-4`}>
                {data.map((lines) => (
                    <div key={lines.id} className="mb-2">
                        <span className={`${COLORS.darkGray}`}>{lines.id}: {lines.line}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default GuidesCard