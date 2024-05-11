import { COLORS, TEXT } from '../../theme/theme'

const HeroCard = ({ name, title, text, source }) => {
    return (
        <div className="mt-4 flex flex-col lg:flex-row mx-10 lg:mx-60 border-red-200 border-2 rounded-lg p-4 shadow-lg">
            <div className="flex-1">
                <div className="flex flex-col px-4 lg:px-10">
                    <p className={`${TEXT.small} lg:${TEXT.large} ${COLORS.darkGray} leading-relaxed`}>
                       {text}
                    </p>
                    <h1 className={`mt-4 ${TEXT.small} lg:${TEXT.medium} font-bold ${COLORS.red} self-end`}>{name}</h1>
                    <p className={`${TEXT.small} lg:${TEXT.medium} text-gray-600 self-end`}>{title}</p>
                </div>
            </div>
            <div className="flex-1 flex justify-end">
                <img src={source} alt="" className="h-28 w-28 lg:h-60 lg:w-60 object-cover rounded-lg shadow-md" />
            </div>
        </div>
    )
}

export default HeroCard