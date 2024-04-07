import { Routes, Route } from 'react-router-dom';
import { auth } from '../auth/Authentication';
import { useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import './output.css';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import { signOut } from 'firebase/auth';
import Dashboard from './pages/Dashboard';

export default function App() {
    const [loggedIn, setLoggedIn] = useState(true);

    useEffect(() => {
        if (auth.currentUser) {
            setLoggedIn(false);
        } else {
            setLoggedIn(false);
        }
    }, []);

    return (
        <>
            <div className={`flex w-screen`}>
                {loggedIn && <Navbar/>}
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path="/Login" element={<Login setLoggedIn={setLoggedIn} />} />
                    <Route path='/Dashboard' element={<Dashboard />} />
                </Routes>
            </div>
        </>
    )
}