
const LineBox = ({text, label, style}) => {
  return (
    <div><span className="text-sm">{label}<span className={`font-medium select-none ${style}`}>: {text}</span></span></div>
  )
}

export default LineBox