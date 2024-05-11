
const Button = ({ text, onClick, disabled , BgColor, textColor, textSize, style}) => {
    return (
        <div className="my-1">
            <button className={`${BgColor} ${textSize} ${style} px-4 py-2 rounded focus:outline-none ${textColor}`} onClick={onClick} disabled={disabled}>{text}</button>
        </div>
    )
}

export default Button