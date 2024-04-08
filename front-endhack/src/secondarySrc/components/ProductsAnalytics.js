import { useEffect, useState } from "react";
import { FaChartSimple, FaCalendar } from "react-icons/fa6";
import { MdOutlineAttachMoney } from "react-icons/md";
import { getDoc, doc, collection, where, query, getDocs } from 'firebase/firestore';
import { db } from "../../Firestore/Firestore";
import { auth } from "../../auth/Authentication";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TbCalendarDollar } from "react-icons/tb";
import { IoAnalyticsSharp } from "react-icons/io5";
import { PieChart, Pie, Sector, Cell } from 'recharts';

const data2 = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};


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

const datasets = {
    "Week": [
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
    ],
    "Month": [
            {
                name: 'Jan',
                uv: 4000,
                pv: 2400,
                amt: 2400,
              },
              {
                name: 'Feb',
                uv: 3000,
                pv: 1398,
                amt: 2210,
              },
              {
                name: 'March',
                uv: 2000,
                pv: 9800,
                amt: 2290,
              },
              {
                name: 'April',
                uv: 2780,
                pv: 3908,
                amt: 2000,
              },
              {
                name: 'May',
                uv: 1890,
                pv: 4800,
                amt: 2181,
              },
              {
                name: 'June',
                uv: 2390,
                pv: 3800,
                amt: 2500,
              },
              {
                name: 'July',
                uv: 3490,
                pv: 4300,
                amt: 2100,
              },
              {
                name: 'Aug',
                uv: 1890,
                pv: 4800,
                amt: 2181,
              },
              {
                name: 'Sep',
                uv: 2390,
                pv: 3800,
                amt: 2500,
              },
              {
                name: 'Oct',
                uv: 3490,
                pv: 4300,
                amt: 2100,
              },
              {
                name: 'Nov',
                uv: 1890,
                pv: 4800,
                amt: 2181,
              },
              {
                name: 'Dec',
                uv: 2390,
                pv: 3800,
                amt: 2500,
              },
    ],
    "Year": data,
    "YTD": data,
    "All Time": data,
}

const orders = [
    {
        name: "Katherine Smith",
        product: "Avacados",
        pounds: 12,
        cost: 11.47,
    },
    {
        name: "John Doe",
        product: "Bananas",
        pounds: 2,
        cost: 1.39,
    },
    {
        name: "Jane Foster",
        product: "Mangos",
        pounds: 10,
        cost: 12.52,
    },
    {
        name: "Alex Leonardo",
        product: "Grapefruit",
        pounds: 6.47,
        cost: 6.23,
    }
]

export default function ProductsAnalytics() {

    const [totalEarnings, setTotalEarnings] = useState(undefined);
    const [totalSales, setTotalSales] = useState(undefined);
    const [choiceIndex, setChoiceIndex] = useState(0);
    const choices = ["Week", "Month", "Year", "YTD", "All Time"];
    const [currentDataset, setCurrentDataset] = useState(datasets[choices[choiceIndex]])

    useEffect(() => {
        const getAnalytics = async () => {
            const usersDoc = collection(db, "users");
            const q = query(usersDoc, where("email", "==", auth.currentUser.email));
            const snapshot = await getDocs(q);
            const earnings = snapshot.docs[0].data()["earnings"];
            const sales = snapshot.docs[0].data()["sales"];
            console.log(sales)
            setTotalEarnings(Math.round(parseFloat(earnings) * 100) / 100);
            setTotalSales(parseInt(sales));
        }

        getAnalytics();
    }, []);

    useEffect(() => {
        setCurrentDataset(datasets[choices[choiceIndex]]);
    }, [choiceIndex]);

    return (
        <div className={`h-[91%]`}>
            <div className={`w-full flex flex-row justify-between mb-3`}>
                <div className={`w-[24%] h-fit px-3 py-2 rounded-lg bg-white flex flex-row items-center`}>
                    <div className={`bg-gray-200 rounded-full w-fit p-3 my-2 mr-3`}><FaChartSimple size={30} className={`fill-purple-700`} /></div>
                    <div>
                        <p className={`text-md text-gray-400 font-medium`}>Total Earnings</p>
                        <p className={`text-xl text-black font-semibold`}>{totalEarnings ? "$" + totalEarnings : 0}</p>
                    </div>
                </div>
                <div className={`w-[24%] h-fit px-3 py-2 rounded-lg bg-white flex flex-row items-center`}>
                    <div className={`bg-gray-200 rounded-full w-fit p-3 my-2 mr-3`}><TbCalendarDollar size={30} className={`text-purple-700`} /></div>
                    <div>
                        <p className={`text-md text-gray-400 font-medium`}>Earnings this Month</p>
                        <p className={`text-xl text-black font-semibold`}>{totalEarnings / 3 ? "$" + (Math.round((totalEarnings / 3) * 100) / 100) : 0}</p>
                    </div>
                </div>
                <div className={`w-[24%] h-fit px-3 py-2 rounded-lg bg-white flex flex-row items-center`}>
                    <div className={`bg-gray-200 rounded-full w-fit p-3 my-2 mr-3`}><IoAnalyticsSharp size={30} className={`fill-purple-700`} /></div>
                    <div>
                        <p className={`text-md text-gray-400 font-medium`}>Total Sales</p>
                        <p className={`text-xl text-black font-semibold`}>{totalSales ? (parseInt((totalSales))) : 0}</p>
                    </div>
                </div>
                <div className={`w-[24%] h-fit px-3 py-2 rounded-lg bg-white flex flex-row items-center`}>
                    <div className={`bg-gray-200 rounded-full w-fit p-3 my-2 mr-3`}><FaCalendar size={30} className={`fill-purple-700`} /></div>
                    <div>
                        <p className={`text-md text-gray-400 font-medium`}>Sales this Month</p>
                        <p className={`text-xl text-black font-semibold`}>{totalSales - 1 ? (parseInt(totalSales - 1)) : 0}</p>
                    </div>
                </div>
            </div>
            <div className={`w-full flex flex-row justify-between`}>
                <div className={`w-[65%] bg-white rounded-xl py-3 px-10 h-full`}>
                    <div className={`flex flex-row items-center mb-5 w-5/6 mx-auto`}>
                        <h3 className={`mr-auto text-2xl font-semibold`}>Earnings</h3>
                        <button className={`bg-gray-300 text-black font-semibold px-3 py-1 rounded-lg hover:bg-gray-200 w-fit h-fit`} onClick={() => {
                            if (choiceIndex === choices.length - 1) {
                                setChoiceIndex(0);
                            } else {
                                setChoiceIndex(index => index += 1);
                            }
                        }}>{choices[choiceIndex]}</button>
                    </div>
                        <LineChart
                        className={`mx-auto`}
                        width={800}
                        height={300}
                        data={currentDataset}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 10,
                            bottom: 5,
                        }}
                        >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" strokeWidth={3} dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="uv" strokeWidth={3} stroke="#82ca9d" />
                        </LineChart>
                </div>
                <div className={`w-[33.35%] bg-white rounded-xl py-2 px-10 h-full`}>
                    <h1 className={`text-center text-2xl font-semibold mb-3`}>Orders</h1>
                    <div className={`w-full`}>
                        {orders.map((order, index) => {
                            return (
                                <div key={index} className={`w-full border-b-2 border-b-gray-400 mb-3`}>
                                    <p className={`w-full text-lg flex justify-between`}><span className={`mr-auto font-semibold text-lg`}>{order.name}</span><span className={`ml-auto text-green-600 font-medium`}>${order.cost}</span></p>
                                    <p className={`w-full text-md flex justify-between mb-3`}><span className={`mr-auto font-medium text-md text-gray-500`}>{order.product}</span><span className={`text-gray-500 font-medium`}>{order.pounds} lbs</span></p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}