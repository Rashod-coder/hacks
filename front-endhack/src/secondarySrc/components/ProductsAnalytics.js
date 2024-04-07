import { useEffect } from "react";
import { FaChartSimple } from "react-icons/fa6";
import { MdOutlineAttachMoney } from "react-icons/md";
import { getDoc, doc, collection, where, query } from 'firebase/firestore';
import { db } from "../../Firestore/Firestore";


export default function ProductsAnalytics() {

    useEffect(() => {
        const getAnalytics = async () => {
            const usersDoc = collection(db, "users");
            const q = query(usersDoc, where())
        }
    }, []);

    return (
        <div className={`h-[91%]`}>
            <div className={`w-full flex flex-row justify-between`}>
                <div className={`w-[16%] h-fit px-3 py-2 rounded-lg shadow-xl bg-white`}>
                    <div className={`bg-gray-200 rounded-full w-fit p-3 my-2`}><FaChartSimple size={30} className={`fill-purple-700`} /></div>
                    <div>
                        <p>Total Earnings</p>
                        <p></p>
                    </div>
                </div>
                <div className={`w-[16%] h-fit px-3 py-2 rounded-lg shadow-xl bg-white`}></div>
                <div className={`w-[16%] h-fit px-3 py-2 rounded-lg shadow-xl bg-white`}></div>
                <div className={`w-[16%] h-fit px-3 py-2 rounded-lg shadow-xl bg-white`}></div>
                <div className={`w-[16%] h-fit px-3 py-2 rounded-lg shadow-xl bg-white`}></div>
                <div className={`w-[16%] h-fit px-3 py-2 rounded-lg shadow-xl bg-white`}></div>
            </div>
        </div>
    )
}