import { useEffect, useState } from "react";
import { FaChartSimple, FaCalendar } from "react-icons/fa6";
import { MdOutlineAttachMoney } from "react-icons/md";
import { getDoc, doc, collection, where, query, getDocs } from 'firebase/firestore';
import { db } from "../../Firestore/Firestore";
import { auth } from "../../auth/Authentication";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function ProductsAnalytics() {

    const [totalEarnings, setTotalEarnings] = useState(undefined);
    const [totalSales, setTotalSales] = useState(undefined);

    useEffect(() => {
        const getAnalytics = async () => {
            const usersDoc = collection(db, "users");
            const q = query(usersDoc, where("email", "==", auth.currentUser.email));
            const snapshot = await getDocs(q);
            const earnings = snapshot.docs[0].data()["earnings"];
            const sales = snapshot.docs[0].data()["sales"];
            setTotalEarnings(Math.round(parseFloat(earnings) * 100) / 100);
            setTotalSales(parseInt(sales));
        }

        getAnalytics();
    }, []);

    const data = [
        {
            name: 'Monday',
            uv: 4000,
            pv: 2400,
            amt: 2400,
          },
          {
            name: 'Tuesday',
            uv: 3000,
            pv: 1398,
            amt: 2210,
          },
          {
            name: 'Wednesday',
            uv: 2000,
            pv: 9800,
            amt: 2290,
          },
          {
            name: 'Thursday',
            uv: 2780,
            pv: 3908,
            amt: 2000,
          },
          {
            name: 'Friday',
            uv: 1890,
            pv: 4800,
            amt: 2181,
          },
          {
            name: 'Saturday',
            uv: 2390,
            pv: 3800,
            amt: 2500,
          },
          {
            name: 'Sunday',
            uv: 3490,
            pv: 4300,
            amt: 2100,
          },
    ]

    return (
        <div className={`h-[91%]`}>
            <div className={`w-full flex flex-row justify-between mb-3`}>
                <div className={`w-[24%] h-fit px-3 py-2 rounded-lg bg-white flex flex-row items-center`}>
                    <div className={`bg-gray-200 rounded-full w-fit p-3 my-2 mr-3`}><FaChartSimple size={30} className={`fill-purple-700`} /></div>
                    <div>
                        <p className={`text-md text-gray-400 font-medium`}>Total Earnings</p>
                        <p className={`text-xl text-black font-semibold`}>{totalEarnings ? "$" + totalEarnings : "---"}</p>
                    </div>
                </div>
                <div className={`w-[24%] h-fit px-3 py-2 rounded-lg bg-white flex flex-row items-center`}>
                    <div className={`bg-gray-200 rounded-full w-fit p-3 my-2 mr-3`}><FaCalendar size={30} className={`fill-purple-700`} /></div>
                    <div>
                        <p className={`text-md text-gray-400 font-medium`}>Earnings this Month</p>
                        <p className={`text-xl text-black font-semibold`}>{totalEarnings / 3 ? "$" + (Math.round((totalEarnings / 3) * 100) / 100) : "---"}</p>
                    </div>
                </div>
                <div className={`w-[24%] h-fit px-3 py-2 rounded-lg bg-white flex flex-row items-center`}>
                    <div className={`bg-gray-200 rounded-full w-fit p-3 my-2 mr-3`}><FaCalendar size={30} className={`fill-purple-700`} /></div>
                    <div>
                        <p className={`text-md text-gray-400 font-medium`}>Total Sales</p>
                        <p className={`text-xl text-black font-semibold`}>{totalSales ? (parseInt((totalSales))) : "---"}</p>
                    </div>
                </div>
                <div className={`w-[24%] h-fit px-3 py-2 rounded-lg bg-white flex flex-row items-center`}>
                    <div className={`bg-gray-200 rounded-full w-fit p-3 my-2 mr-3`}><FaCalendar size={30} className={`fill-purple-700`} /></div>
                    <div>
                        <p className={`text-md text-gray-400 font-medium`}>Sales this Month</p>
                        <p className={`text-xl text-black font-semibold`}>{totalSales - 1 ? (parseInt(totalSales - 1)) : "---"}</p>
                    </div>
                </div>
            </div>
            <div className={`w-full flex flex-row items-center justify-between`}>
                <div className={`w-[65%] bg-white rounded-xl py-5 pt-6`}>
                        <LineChart
                        className={`mx-auto`}
                        width={800}
                        height={300}
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                        >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                        </LineChart>
                </div>
                <div className={`w-[32.5%] bg-white rounded-xl h-full`}></div>
            </div>
        </div>
    )
}