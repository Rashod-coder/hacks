import { FaStore, FaUserCog } from "react-icons/fa";
import { RiDashboard2Fill } from "react-icons/ri";
import { MdSell } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import { auth } from "../../auth/Authentication";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { FaHome } from "react-icons/fa";

export default function Navbar({ setLoggedIn }) {
    const isUser = undefined;
    const navigate = useNavigate();
    function logout() {
        Cookies.set('loggedIn', false);
        setLoggedIn(false);
        auth.signOut().then(() => {
            navigate('/', { replace: true });
        }).catch((e) => {
            console.error('ERROR:', e);
        });
    }

    return (
        <div className={`min-h-screen w-[20%] px-6 py-4 shadow-lg bg-gray-100`}>
            <h2 className={`font-bold text-3xl text-black mb-3`}>Fresh for All</h2>
            <hr className={`border-t-2 border-gray-400 rounded-full my-3`} />
            <p className={'text-xl font-semibold text-gray-400 mb-2'}>General</p>
            <div className={`ml-0 mb-3`}>
            <p onClick={() => navigate('/', { replace: true })} className={`mr-10 w-full rounded-lg cursor-pointer hover:bg-gray-200 transition-all duration-200 ease-in-out font-normal text-xl text-black mb-1 px-3 py-2 flex flex-row items-center`}><FaHome  className={`mr-2`} size={25} />Home</p>
                <p onClick={() => navigate('/Buy', { replace: true })} className={`mr-10 w-full rounded-lg cursor-pointer hover:bg-gray-200 transition-all duration-200 ease-in-out font-normal text-xl text-black mb-1 px-3 py-2 flex flex-row items-center`}><FaStore className={`mr-2`} size={25} />Store</p>
                <p onClick={() => navigate('/Dashboard', { replace: true })} className={`mr-10 w-full rounded-lg cursor-pointer hover:bg-gray-200 transition-all duration-200 ease-in-out font-normal text-xl text-black mb-1 px-3 py-2 flex flex-row items-center`}><RiDashboard2Fill className={`mr-2`} size={25} />Dashboard</p>
                <p onClick={() => navigate('/Sell', { replace: true })} className={`mr-10 w-full rounded-lg cursor-pointer hover:bg-gray-200 transition-all duration-200 ease-in-out font-normal text-xl text-black px-3 py-2 flex flex-row items-center`}><MdSell className={`mr-2`} size={25} />Sell Produce</p>
            </div>
            <p className={'text-xl font-semibold text-gray-400 mb-2'}>Account</p>
            <div className={`ml-0 mb-5`}>
                <p onClick={() => navigate('/Settings', { replace: true })} className={`mr-10 w-full rounded-lg cursor-pointer hover:bg-gray-200 transition-all duration-200 ease-in-out font-normal text-xl text-black mb-1 px-3 py-2 flex flex-row items-center`}><FaUserCog className={`mr-2`} size={25} />Settings</p>
                <p onClick={logout} className={`mr-10 w-full rounded-lg cursor-pointer hover:bg-gray-200 transition-all duration-200 ease-in-out font-normal text-xl text-black px-3 py-2 flex flex-row items-center`}><IoLogOut className={`mr-2`} size={25} />Logout</p>
            </div>
        </div>
    )
}