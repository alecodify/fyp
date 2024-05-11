import { Link } from "react-router-dom";
import { BGCOLOR, COLORS, TEXT } from "../../theme/theme";

const Footer = () => {
    return (
        <footer className={`${BGCOLOR.lightGray} border-y`}>
            <div className="mx-auto w-full max-w-screen-xl px-4 py-4 lg:py-8">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0">
                        <Link to="/" className="flex items-center">
                            <img src="/images/logo.png" className="mr-3 h-14 lg:h-16 rounded-lg" alt="" />
                        </Link>
                    </div>
                    <div className="ml-4 grid grid-cols-3 gap-4 sm:gap-3 sm:grid-cols-3">
                        <div>
                            <h2 className={`mb-6 ${TEXT.small} font-semibold ${COLORS.dark} uppercase`}>Resources</h2>
                            <ul className={`${COLORS.gray} ${TEXT.small} lg:${TEXT.medium} font-medium`}>
                                <li className="mb-2">
                                    <Link to="/" className="hover:underline">Home</Link>
                                </li>
                                <li className="mb-2">
                                    <Link to="vote" className="hover:underline">Vote</Link>
                                </li>
                                <li>
                                    <Link to="contact" className="hover:underline">Help</Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className={`mb-6 font-semibold ${TEXT.small} ${COLORS.dark} uppercase`}>Follow Us</h2>
                            <ul className={`${COLORS.gray} font-medium ${TEXT.small} lg:${TEXT.medium} `}>
                                <li className="mb-2">
                                    <a href="https://github.com/whyyali" className="hover:underline" target="_blank" rel="noreferrer" >
                                        Github
                                    </a>
                                </li>
                                <li className="mb-2">
                                    <a href="https://www.linkedin.com/in/whyyali/" className="hover:underline" target="_blank" rel="noreferrer">
                                        LinkedIn
                                    </a>
                                </li>
                                <li>
                                    <a href="https://wa.me/923206914610" className="hover:underline" target="_blank" rel="noreferrer">
                                        Whatsapp
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className={`mb-6 font-semibold ${TEXT.small}  ${COLORS.dark} uppercase`}>Guidess</h2>
                            <ul className={`${COLORS.gray} ${TEXT.small} lg:${TEXT.medium} font-medium`}>
                                <li className="mb-2">
                                    <a href="/" className="hover:underline">For voter</a>
                                </li>
                                <li className="mb-2">
                                    <a href="/" className="hover:underline ">For candidates</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr className="my-4 border-white border-2 sm:mx-auto lg:my-8" />
                <div className="sm:flex sm:items-center sm:justify-center text-center">
                    <span className={`text-sm ${COLORS.gray} sm:text-center`}>@2024
                        <a href="/" className={`hover:${COLORS.red}`}> AliRaza </a>
                        . All Rights Reserved.
                    </span>
                </div>
            </div>
        </footer>
    )
}

export default Footer