import { Link } from "react-router-dom"

const ComplaintBox = ({ email, pageLink }) => {
    return (
        <div className="text-center mx-10 text-sm lg:text-lg">
            <p>For any complaint and suggestion please contact us on Email ID:
                <span className="text-red-500 cursor-pointer"> {email} </span>
                {pageLink === true ? (
                    <span>
                        or go to
                        <Link to={"/contact"} className="text-red-500"> contact </Link>
                        Page.
                    </span>
                ) : (
                    <div></div>
                )}
            </p>
        </div>
    )
}

export default ComplaintBox