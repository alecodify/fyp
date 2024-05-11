import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { MdPersonAddAlt1 , MdViewList } from "react-icons/md";
import { IoEyeSharp } from "react-icons/io5";
import { TiTick } from "react-icons/ti";
import { BGCOLOR, COLORS, TEXT } from "../../theme/theme";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener("click", handleOutsideClick);

        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const openMenu = () => {
        setIsMenuOpen(true);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <header className="h-16 sticky top-0 z-50 shadow">
            <nav className={`${BGCOLOR.lightGray} h-full px-4 py-2.5 lg:px-6`}>
                <div className="flex h-full flex-wrap justify-between items-center mx-auto max-w-screen-xl">

                    <Link to="/admin/dashboard" className="flex items-center">
                        <span className={`${COLORS.black} ${TEXT.large} lg:text-xl font-semibold`}>Welcome</span>
                    </Link>

                    <div
                        ref={menuRef}
                        className="relative inline-block text-left"
                        onMouseEnter={openMenu}
                        onMouseLeave={closeMenu}>
                        <div>
                            <button
                                type="button"
                                className={`inline-flex w-full justify-center gap-x-1.5 rounded-md ${BGCOLOR.white} px-3 py-2 ${TEXT.small} font-semibold ${COLORS.darkGray} shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50`}
                                onClick={toggleMenu} aria-expanded={isMenuOpen} aria-haspopup="true">

                                {isMenuOpen ? "Close" : "Menu"}
                                {isMenuOpen ? (
                                    <AiOutlineClose className="-mr-1 h-5 w-5 text-gray-400" />
                                ) : (
                                    <GiHamburgerMenu className="-mr-1 h-5 w-5 text-gray-400" />
                                )}
                            </button>
                        </div>

                        {isMenuOpen && (
                            <div
                                className={`absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
                                role="menu"
                                aria-orientation="vertical"
                                aria-labelledby="menu-button"
                                tabIndex="-1"
                                onMouseEnter={openMenu}
                                onMouseLeave={closeMenu}
                            >
                                <div className="py-1" role="none">
                                    <Link to={"/admin/candidate"} className="text-gray-700 flex gap-2 items-center px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0"> <MdPersonAddAlt1 size={20}/> <span>Add Candidate</span></Link>
                                    <Link to={"/admin/seecandidate"} className="text-gray-700 flex gap-2 items-center px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-1"><IoEyeSharp size={20}/> <span>See Candidate</span></Link>
                                    <Link to={"/admin/allcandidates"} className="text-gray-700 flex gap-2 items-center px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-1"><MdViewList size={20} /> <span>List of Candidates</span></Link>
                                    <Link to={"/admin/voter"} className="text-gray-700 flex gap-2 items-center px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-2"><MdPersonAddAlt1 size={20}/> <span>Add Voter</span></Link>
                                    <Link to={"/admin/seevoter"} className="text-gray-700 flex gap-2 items-center px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-2"><IoEyeSharp size={20}/> <span>See Voter</span></Link>
                                    <Link to={"/admin/allvoters"} className="text-gray-700 flex gap-2 items-center px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-2"><MdViewList size={20} /> <span>List of Voters</span></Link>
                                    <Link to={"/admin/results/halkavice"} className="text-gray-700 flex gap-2 items-center px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-2"><TiTick size={20}/> <span>HalkaVice Result</span></Link>
                                    <Link to={"/admin/results/assemblyvice"} className="text-gray-700 flex gap-2 items-center px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-2"><TiTick size={20}/> <span>AssemblyVice Result</span></Link>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
                 <ToastContainer position='top-right' />
            </nav>
        </header>
    );
};

export default Navbar;
