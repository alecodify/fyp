import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { BGCOLOR, COLORS, TEXT } from "../../theme/theme";

const Navbar = () => {
    const [mobileMenuButton, setMobileMenuButton] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const closeMobileMenuOutsideClick = (event) => {
            const menuButton = document.getElementById("menuButton");
            const menu = document.getElementById("menu");
            if (
                menuButton &&
                menu &&
                !menuButton.contains(event.target) &&
                !menu.contains(event.target)
            ) {
                setMobileMenuButton(false);
            }
        };
        document.addEventListener("click", closeMobileMenuOutsideClick);

        return () => {
            document.removeEventListener("click", closeMobileMenuOutsideClick);
        };
    })

    const toggleMobileMenu = () => {
        setMobileMenuButton(!mobileMenuButton);
    }

    const closeMobileMenu = () => {
        setMobileMenuButton(false);
    }

    const handleNavLinkClick = (path) => {
        navigate(path)
        closeMobileMenu();
    }

    return (
        <header className="h-16 sticky top-0 z-50 shadow">
            <nav className={`${BGCOLOR.lightGray} px-4 py-2.5 lg:px-6`}>
                <button id="menuButton" onClick={toggleMobileMenu} className="lg:hidden px-1 py-2"><GiHamburgerMenu /></button>
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    
                    <Link to="/" className="flex items-center">
                        <img src="/images/logo.png" alt="" className="mr-0 h-12 lg:h-20 rounded-lg " />
                    </Link>

                    <div className={`flex items-center lg:flex-row lg:order-2 `}>
                       
                    </div>

                    <div id="menu" className={`${mobileMenuButton ? `lg:hidden fixed top-0 left-0 w-2/4 h-full flex-col bg-white z-50` : "hidden"} justify-between items-center w-full lg:flex lg:w-auto lg:order-1`} >
                        <button onClick={closeMobileMenu} className="lg:hidden absolute top-4 right-4 mb-4"><AiOutlineClose /></button>
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <li>
                                <NavLink to="/" className={({ isActive }) => `block py-2 pl-3 duration-200 border-b ${TEXT.large} border-gray-100  ${isActive ? `${COLORS.red}`: `${COLORS.gray}`} lg:hover:bg-transparent lg:border-0 hover:${COLORS.red} lg-p-0 `} onClick={() => handleNavLinkClick("/")}>Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="/vote" className={({ isActive }) => `block py-2 pl-3 duration-200 border-b ${TEXT.large} border-gray-100   ${isActive ? `${COLORS.red}`: `${COLORS.gray}`} lg:hover:bg-transparent lg:border-0 hover:${COLORS.red} lg-p-0`} onClick={() => handleNavLinkClick("/vote")}>Vote</NavLink>
                            </li>
                            <li>
                                <NavLink to="/contact" className={({ isActive }) => `block py-2 pl-3 duration-200 border-b ${TEXT.large} border-gray-100  ${isActive ? `${COLORS.red}`: `${COLORS.gray}`} lg:hover:bg-transparent lg:border-0 hover:${COLORS.red} lg-p-0`} onClick={() => handleNavLinkClick("/contact")}>Contact</NavLink>
                            </li>
                            <li className={`${mobileMenuButton ? "visible" : "hidden"}`}>
                                {/* <NavLink to="" className={({ isActive }) => `block py-2 pl-3 duration-200 border-b border-gray-100  ${isActive ? `${COLORS.red}`: `${COLORS.gray}`} lg:hover:bg-transparent lg:border-0 hover:text-red-500 lg-p-0`} onClick={() => handleNavLinkClick("")}>Result</NavLink>
                                <NavLink to="" className={({ isActive }) => `block py-2 pl-3 duration-200 border-b border-gray-100  ${isActive ? `${COLORS.red}`: `${COLORS.gray}`} lg:hover:bg-transparent lg:border-0 hover:text-red-500 lg-p-0`} onClick={() => handleNavLinkClick("")}>profile</NavLink> */}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar