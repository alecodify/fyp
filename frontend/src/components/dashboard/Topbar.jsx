import { Link } from "react-router-dom";
import { BGCOLOR, COLORS, TEXT } from "../../theme/theme";

const Topbar = () => {

    return (
        <header className="h-16 sticky top-0 z-50 shadow">
            <nav className={`${BGCOLOR.lightGray} h-full px-4 py-2.5 lg:px-6`}>
                <div className="flex h-full flex-wrap justify-between items-center mx-auto max-w-screen-xl">

                    <Link to="/admin/dashboard" className="flex items-center">
                        <span className={`${COLORS.black} ${TEXT.large} lg:text-xl font-semibold`}>Voting System</span>
                    </Link>

                    <div className="h-12 w-12 rounded-xl cursor-pointer">
                      <img src="/admin.jpg" alt="" className="h-10 w-10 rounded-2xl" />
                    </div>
                   
                </div>
            </nav>
        </header>
    );
};

export default Topbar;
