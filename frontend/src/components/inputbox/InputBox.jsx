import { COLORS, TEXT } from "../../theme/theme";

const InputBox = ({ name, label, type, required, placeholder, onChange, value, disabled, style }) => {
    const isRequired = required && label ? '*' : '';
    return (
        <div>
            <label htmlFor={name} className={`block ${TEXT.small} font-medium ${COLORS.gray} select-none`}>
                {label}
                <span className={`${COLORS.red}`}>{isRequired}</span>
            </label>

            <input type={type} disabled={disabled} value={value} id={name} onChange={onChange} placeholder={placeholder} name={name} required={required}
                className={`mt-1 p-2 outline-blue-500 border-blue-500 border-2 rounded-lg w-full ${style} ${required ? "hover:outline-red-500" : ""} ${type === "date" ? "w-44 bg-transparent md:w-52 lg:w-60" : ""}`} />
        </div>
    )
}

export default InputBox