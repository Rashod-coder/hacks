import { useEffect, useRef } from 'react';
import introVideo from '../assets/video2.mp4';
import { auth } from '../../auth/Authentication';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const videoRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        videoRef.current.playbackRate = 0.60;
    });

    return (
        <div className={`min-h-screen w-screen`}>
            <div className={`h-screen relative`}>
                <video ref={videoRef} autoPlay loop muted id="video" className={`absolute top-0 left-0 w-full h-full object-cover -z-50`}>
                    <source src={introVideo} type='video/mp4' />
                </video>
                <div className={`absolute top-0 left-0 w-full h-full bg-blue-500 bg-opacity-40 -z-40 hover:bg-opacity-40`}></div>
                <div className={`h-[14%] z-50 flex flex-row items-center w-4/6 mx-auto`}>
                    <h2 className={`font-bold text-5xl mr-auto text-white`}>Fresh for All</h2>
                    <div className={`flex flex-row items-center mr-auto`}>
                        <p className={`mr-10 font-bold text-lg text-white`}>Home</p>
                        <p className={`mr-10 font-bold text-lg text-white`}>Features</p>
                        <p className={`mr-10 font-bold text-lg text-white`}>Our Mission</p>
                        <p className={`font-bold text-lg text-white`}>Contact</p>
                    </div>
                    {!auth.currentUser ? <div className={`flex flex-row items-center`}>
                        <button onClick={() => navigate('/Login')} className={`px-3 mr-10 py-1 rounded-lg bg-purple-700 border-purple-700 border-2 border-spacing-8 hover:bg-purple-600 hover:border-purple-600 transition-all duration-200 ease-in-out text-lg text-white font-semibold`}>Sign In</button>
                        <button className={`px-3 py-1 rounded-lg bg-purple-700 border-2 border-purple-700 hover:bg-purple-600 hover:border-purple-600 transition-all duration-200 ease-in-out text-lg text-white font-semibold`}>Register</button>
                    </div> : <div>
                        <button onClick={() => navigate('/Dashboard')} className={` w-fit px-3 py-1 rounded-lg border-purple-700 bg-purple-700 mr-5 border-2 border-spacing-8 hover:bg-purple-600 hover:border-purple-600 transition-all duration-200 ease-in-out text-lg text-white font-semibold`}>Dashboard</button>
                    </div>}
                </div>
                <div className={`h-5/6 z-50`}></div>
            </div>
        </div>
    )
}