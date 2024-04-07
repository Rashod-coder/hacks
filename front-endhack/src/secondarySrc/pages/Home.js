import { useEffect, useRef, useState } from 'react';
import introVideo from '../assets/video2.mp4';
import { auth } from '../../auth/Authentication';
import { useNavigate } from 'react-router-dom';
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
        <div className={`min-h-screen w-screen max-w-screen overflow-x-hidden relative`}>
            <div className={`h-screen w-screen max-w-screen`}>
                <video ref={videoRef} autoPlay loop muted id="video" className={`absolute top-0 left-0 w-full h-full object-cover -z-50`}>
                    <source src={introVideo} type='video/mp4' />
                </video>
                {!navOpen && <div className={`absolute top-0 left-0 w-full h-full bg-blue-600 bg-opacity-30 -z-40 hover:bg-opacity-30`}></div>}
                {!navOpen && <div className={`z-50 fixed *:sm:hidden top-2 left-2 rounded-lg hover:bg-gray-500 hover:bg-opacity-75`}>
                    <RxHamburgerMenu className={`block fill-white text-white cursor-pointer m-1`} size={40} onClick={() => setNavOpen(true)} />
                </div>}
                <div className={`h-[14%] z-50 flex flex-row items-center justify-between w-4/6 mx-auto hidden sm:flex`}>
                    <h2 className={`font-bold text-5xl mr-auto text-white flex`}>Fresh for All</h2>
                    <div className={`flex flex-row items-center mr-auto`}>
                        <p className={`mr-10 font-bold text-xl text-white`}>Home</p>
                        <p className={`mr-10 font-bold text-xl text-white`}>Features</p>
                        <p className={`mr-10 font-bold text-xl text-white`}>Our Mission</p>
                        <p className={`font-bold text-xl text-white`}>Contact</p>
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
                <div className={`h-[86%] z-50 flex justify-center items-center`}>
                    <div className='w-full'>
                        <h1 className={`text-3xl sm:text-7xl sm:w-4/6 sm:mx-auto px-5 font-semibold text-white`}>Produce, fresh from the farm for everyone.</h1>
                        <p></p>
                    </div>
                </div>
            </div>
            <div className={`h-screen bg-white w-screen px-20 py-10`}>
                <h2 className={`text-4xl font-semibold mb-4`}>Features</h2>
                <div className={`flex flex-wrap justify-between`}>
                    <div className={`shadow-lg bg-white rounded-xl w-[32%] mb-4`}>
                        <div className={`bg-gray-200 h-48 rounded-t-xl`}></div>
                        <div className={`h-36 bg-white shadow-inner rounded-b-xl px-4 py-3`}>
                            <p className={`text-xl font-semibold mb-1`}>Feature 1</p>
                            <p className={`text-md`}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Iaculis nunc sed augue lacus viverra.</p>
                        </div>
                    </div>
                    <div className={`shadow-lg bg-white rounded-xl w-[32%] mb-4`}>
                        <div className={`bg-gray-200 h-48 rounded-t-xl`}></div>
                        <div className={`h-36 bg-white shadow-inner rounded-b-xl px-4 py-3`}>
                            <p className={`text-xl font-semibold mb-1`}>Feature 1</p>
                            <p className={`text-md`}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Iaculis nunc sed augue lacus viverra.</p>
                        </div>
                    </div>
                    <div className={`shadow-lg bg-white rounded-xl w-[32%] mb-4`}>
                        <div className={`bg-gray-200 h-48 rounded-t-xl`}></div>
                        <div className={`h-36 bg-white shadow-inner rounded-b-xl px-4 py-3`}>
                            <p className={`text-xl font-semibold mb-1`}>Feature 1</p>
                            <p className={`text-md`}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Iaculis nunc sed augue lacus viverra.</p>
                        </div>
                    </div>
                    <div className={`shadow-lg bg-white rounded-xl w-[32%]`}>
                        <div className={`bg-gray-200 h-48 rounded-t-xl`}></div>
                        <div className={`h-36 bg-white shadow-inner rounded-b-xl px-4 py-3`}>
                            <p className={`text-xl font-semibold mb-1`}>Feature 1</p>
                            <p className={`text-md`}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Iaculis nunc sed augue lacus viverra.</p>
                        </div>
                    </div>
                    <div className={`shadow-lg bg-white rounded-xl w-[32%]`}>
                        <div className={`bg-gray-200 h-48 rounded-t-xl`}></div>
                        <div className={`h-36 bg-white shadow-inner rounded-b-xl px-4 py-3`}>
                            <p className={`text-xl font-semibold mb-1`}>Feature 1</p>
                            <p className={`text-md`}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Iaculis nunc sed augue lacus viverra.</p>
                        </div>
                    </div>
                    <div className={`shadow-lg bg-white rounded-xl w-[32%]`}>
                        <div className={`bg-gray-200 h-48 rounded-t-xl`}></div>
                        <div className={`h-36 bg-white shadow-inner rounded-b-xl px-4 py-3`}>
                            <p className={`text-xl font-semibold mb-1`}>Feature 1</p>
                            <p className={`text-md`}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Iaculis nunc sed augue lacus viverra.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`h-fit w-screen bg-gray-800 px-20 py-10`}>
                <h2 className={`text-4xl font-semibold mb-4 text-white`}>Our Mission</h2>
                <p className={`text-2xl text-white leading-relaxed font-normal`}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat ac tincidunt vitae semper quis lectus nulla. Etiam erat velit scelerisque in dictum non consectetur. Purus non enim praesent elementum. Semper quis lectus nulla at. Id eu nisl nunc mi ipsum faucibus vitae aliquet. Orci dapibus ultrices in iaculis. Netus et malesuada fames ac turpis egestas maecenas pharetra convallis. Tortor id aliquet lectus proin nibh nisl condimentum. In ornare quam viverra orci sagittis. Faucibus scelerisque eleifend donec pretium vulputate sapien nec. Eget nunc scelerisque viverra mauris in.</p>
            </div>
            <div className={`h-fit w-screen bg-white px-20 py-10`}>
                <h2 className={`text-4xl font-semibold mb-4 text-black`}>Contact</h2>
                <div className={`w-2/6 mx-auto`}>  
                    <div className={`w-full flex justify-between mb-3`}>
                        <input className={`px-3 w-[49%] py-1 text-lg border-b-2 focus:outline-none border-gray-400 focus:border-purple-600`} placeholder='Enter your name'/>
                        <input className={`px-3 w-[49%] py-1 text-lg border-b-2 focus:outline-none border-gray-400 focus:border-purple-600`} placeholder='Enter your email'/>
                    </div>
                    <textarea className={`text-lg mb-3 border-gray-400 rounded-xl focus:outline-none border-2 px-3 py-2 w-full focus:border-purple-600`} placeholder="Enter your message and we'll get back to you as soon as possible!" rows={3}></textarea>
                    <button className={`w-full bg-purple-700 hover:bg-purple-600 transition-all duration-200 ease-in-out py-2 px-3 text-lg text-white`}>Send Message</button>
                </div>
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