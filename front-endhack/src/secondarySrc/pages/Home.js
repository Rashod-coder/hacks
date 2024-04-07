import { useEffect, useRef, useState } from 'react';
import introVideo from '../assets/video2.mp4';
import { auth } from '../../auth/Authentication';
import { useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from 'react-icons/io5';
import { FaHome } from "react-icons/fa";
import { SiWheniwork } from "react-icons/si";
import { GoGoal } from "react-icons/go";
import { IoCall } from "react-icons/io5";

export default function Home() {
    const videoRef = useRef();
    const navigate = useNavigate();
    const [navOpen, setNavOpen] = useState(false);

    useEffect(() => {
        videoRef.current.playbackRate = 0.60;
    });

    return (
        <div className={`min-h-screen w-screen relative`}>
            <video ref={videoRef} autoPlay loop muted id="video" className={`absolute top-0 left-0 w-full h-full object-cover -z-50`}>
                <source src={introVideo} type='video/mp4' />
            </video>
            {!navOpen && <div className={`absolute top-0 left-0 w-full h-full bg-blue-500 bg-opacity-40 -z-40 hover:bg-opacity-40`}></div>}
            {!navOpen && <div className={`z-50 fixed *:sm:hidden top-2 left-2`}>
                <RxHamburgerMenu className={`block fill-white text-white cursor-pointer`} size={35} onClick={() => setNavOpen(true)} />
            </div>}
            <div className={`h-[14%] z-50 flex flex-row items-center justify-between w-4/6 mx-auto hidden sm:flex`}>
                <h2 className={`font-bold text-5xl mr-auto text-white flex`}>Fresh for All</h2>
                <div className={`flex flex-row items-center mr-auto`}>
                    <p className={`mr-10 font-bold text-lg text-white`}>Home</p>
                    <p className={`mr-10 font-bold text-lg text-white`}>Features</p>
                    <p className={`mr-10 font-bold text-lg text-white`}>Our Mission</p>
                    <p className={`font-bold text-lg text-white`}>Contact</p>
                </div>
                {!auth.currentUser ? (
                    <div className={`flex flex-row items-center`}>
                        <button onClick={() => navigate('/Login')} className={`px-3 mr-10 py-1 rounded-lg bg-purple-700 border-purple-700 border-2 border-spacing-8 hover:bg-purple-600 hover:border-purple-600 transition-all duration-200 ease-in-out text-lg text-white font-semibold`}>Sign In</button>
                        <button onClick={() => navigate('/Register')} className={`px-3 py-1 rounded-lg bg-purple-700 border-2 border-purple-700 hover:bg-purple-600 hover:border-purple-600 transition-all duration-200 ease-in-out text-lg text-white font-semibold`}>Register</button>
                    </div>
                ) : (
                    <button onClick={() => navigate('/Dashboard')} className={` w-fit px-3 py-1 rounded-lg border-purple-700 bg-purple-700 mr-5 border-2 border-spacing-8 hover:bg-purple-600 hover:border-purple-600 transition-all duration-200 ease-in-out text-lg text-white font-semibold`}>Dashboard</button>
                )}
            </div>
            {navOpen && (
                <div className={'w-screen bg-gray-800 fixed top-0 left-0 h-screen px-3 py-3'}>
                    <div className={`w-full flex flex-row items-center`}>
                        <h1 className={`mr-auto text-white text-3xl font-semibold`}>Fresh for All</h1>
                        <IoClose size={30} fill='white' color='white' className={`cursor-pointer hover:fill-gray-300`} onClick={() => setNavOpen(false)} />
                    </div>
                    <hr className={`border-t-2 border-white rounded-full my-2`} />
                    <div>
                        <p className={`text-lg font-normal cursor-pointer text-white mb-1 py-2 px-3 flex flex-row items-center hover:bg-gray-500 rounded-lg`}><FaHome size={25} className={`mr-3`} />Home</p>
                        <p className={`text-lg font-normal cursor-pointer text-white mb-1 py-2 px-3 flex flex-row items-center hover:bg-gray-500 rounded-lg`}><SiWheniwork size={25} className={`mr-3`} />Features</p>
                        <p className={`text-lg font-normal cursor-pointer text-white mb-1 py-2 px-3 flex flex-row items-center hover:bg-gray-500 rounded-lg`}><GoGoal size={25} className={`mr-3`} />Our Mission</p>
                        <p className={`text-lg font-normal cursor-pointer text-white py-2 px-3 flex flex-row items-center hover:bg-gray-500 rounded-lg`}><IoCall size={25} className={`mr-3`} />Contact</p>
                    </div>
                </div>
            )}
        </div>
    )
}