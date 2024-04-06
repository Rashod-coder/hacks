import './App.css';
import Navbar  from './Navbar';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Import Navigate
import Register from './Register'
import Login from './Login'
import Home from './Home'
import Settings from './Settings'
import Sell from "./Sell"
import Buy from "./Buy"

function App() {
  return (
    <div className="App">
     <Router>
      <Navbar/>
        <Routes>
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Settings" element={<Settings />} />
          <Route path="/Sell" element={<Sell />} />
          <Route path="/Buy" element={<Buy />} />

          
         


        </Routes>
      </Router>
    </div>
  );
}

export default App;
