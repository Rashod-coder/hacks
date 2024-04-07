import { Routes, Route } from 'react-router-dom';
import { auth } from '../auth/Authentication';
import { useNavigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import './output.css';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import { signOut } from 'firebase/auth';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Sell from './pages/Sell';
import Buy from './pages/Buy';
import Settings from './pages/Settings';
import ShowProduct from './pages/ShowProduct';
import NotFound from './pages/404';
import Cookies from 'js-cookie';
import { onAuthStateChanged } from 'firebase/auth';

export default function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const location = useLocation();
    const { hash, pathname, search } = location;

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                Cookies.set('loggedIn', true);
                setLoggedIn(true);
            } else {
                Cookies.get('loggedIn', false);
                setLoggedIn(false);
            }
        });
        console.log(pathname)
    }, []);

    return (
        <>
            <div className={`flex w-screen`}>
                {Cookies.get('loggedIn') === 'true' && pathname !== '/' && pathname !== '/Login' && <Navbar setLoggedIn={setLoggedIn}/>}
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path="/Login" element={<Login setLoggedIn={setLoggedIn} />} />
                    <Route path='/Dashboard' element={<Dashboard />} />
                    <Route path="/Register" element={<Register />} />
                    <Route path="/Settings" element={<Settings />} />
                    <Route path="/Sell" element={<Sell />} />
                    <Route path="/Buy" element={<Buy />} />
                    <Route path="/Buy/:id" element={<ShowProduct />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </>
    )
}