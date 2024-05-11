import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { InputBox } from '../../components';
import { MdOutlineHowToVote } from "react-icons/md";
import { BGCOLOR, COLORS } from '../../theme/theme';

const Signin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        try {
            const response = await fetch(`/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email, password}),
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Admin Login successfully");
                navigate("/admin/dashboard");
            } else {
                console.error("Failed to login admin");
                setError(data.message)
            }

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={`flex justify-center items-center h-screen bg-gray-100 `}>
            <div className={`${BGCOLOR.white} shadow-lg p-6 rounded-lg flex flex-col gap-4 w-96 border border-gray-200`}>
                <div className="text-center mb-4">
                    <MdOutlineHowToVote size={60} color='black' className='mx-auto' />
                    <h2 className="text-2xl font-bold text-gray-700">Admin Login</h2>
                </div>
                <InputBox required={true} placeholder={"Email"} type={"email"} onChange={(e) => setEmail(e.target.value)} />
                <InputBox required={true} placeholder={"Password"} type={"password"} onChange={(e) => setPassword(e.target.value)} />
                <button onClick={handleLogin} className={`py-2 ${BGCOLOR.blue} text-white rounded-lg font-bold hover:${BGCOLOR.red} hover:bg-red-500 `}>
                    Login
                </button>
                <p className="text-red-500 text-sm text-center">{error}</p>
                <Link to="/" className={`text-center w-30 mx-auto border-b-2 border-transparent ${COLORS.black} hover:border-b-2 hover:border-red-500 `}>Back to Home</Link>
            </div>
        </div>
    );
};

export default Signin;
