import { FaStore, FaUserCog } from "react-icons/fa";
import { RiDashboard2Fill } from "react-icons/ri";
import { MdSell } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";

export default function Navbar() {
    const isUser = undefined;
    function logout() {

    }
    return (
        <div className={`min-h-screen w-[20%] px-6 py-4 shadow-lg bg-gray-100`}>
            <h2 className={`font-bold text-3xl text-black mb-3`}>Fresh for All</h2>
            <hr className={`border-t-2 border-gray-400 rounded-full my-3`} />
            <p className={'text-xl font-semibold text-gray-400 mb-2'}>General</p>
            <div className={`ml-0 mb-3`}>
                <p className={`mr-10 w-full rounded-lg cursor-pointer hover:bg-gray-200 transition-all duration-200 ease-in-out font-normal text-xl text-black mb-1 px-3 py-2 flex flex-row items-center`}><FaStore className={`mr-2`} size={25} />Store</p>
                <p className={`mr-10 w-full rounded-lg cursor-pointer hover:bg-gray-200 transition-all duration-200 ease-in-out font-normal text-xl text-black mb-1 px-3 py-2 flex flex-row items-center`}><RiDashboard2Fill className={`mr-2`} size={25} />Dashboard</p>
                <p className={`mr-10 w-full rounded-lg cursor-pointer hover:bg-gray-200 transition-all duration-200 ease-in-out font-normal text-xl text-black px-3 py-2 flex flex-row items-center`}><MdSell className={`mr-2`} size={25} />Sell Produce</p>
            </div>
            <p className={'text-xl font-semibold text-gray-400 mb-2'}>Account</p>
            <div className={`ml-0 mb-5`}>
                <p className={`mr-10 w-full rounded-lg cursor-pointer hover:bg-gray-200 transition-all duration-200 ease-in-out font-normal text-xl text-black mb-1 px-3 py-2 flex flex-row items-center`}><FaUserCog className={`mr-2`} size={25} />Settings</p>
                <p className={`mr-10 w-full rounded-lg cursor-pointer hover:bg-gray-200 transition-all duration-200 ease-in-out font-normal text-xl text-black px-3 py-2 flex flex-row items-center`}><IoLogOut className={`mr-2`} size={25} />Logout</p>
            </div>
        </div>
    )
}