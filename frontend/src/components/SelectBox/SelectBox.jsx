import { COLORS, TEXT } from '../../theme/theme';

const SelectBox = ({ name, label, required, onChange, options , style }) => {
    const isRequired = required ? '*' : '';
    return (
        <div className="w-42 lg:w-60">
            <label htmlFor={name} className={`block ${TEXT.small} ${COLORS.gray} font-medium select-none`}>
                {label} <span className={`${COLORS.red}`}>{isRequired}</span>
            </label>
            <select id={name} name={name} className={`mt-1 p-2 ${style} w-full bg-transparent border-2 border-blue-400 overflow-hidden rounded-md ${required ? "outline-red-500" : ""}`} onChange={onChange} defaultValue={`Select ${label}`}>
                <option value="" disabled>
                    Select {label}
                </option>
                {options && options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default SelectBox