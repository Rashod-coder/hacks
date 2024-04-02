import './App.css';
import Navbar  from './Navbar';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Import Navigate
import Register from './Register'
import Login from './Login'
import Home from './Home'


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
         


        </Routes>
      </Router>
    </div>
  );
}

export default App;
