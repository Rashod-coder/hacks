import './App.css';
import Navbar  from './Navbar';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Import Navigate
import Register from './Register'
import Login from './Login'
import Home from './Home'
import Settings from './Settings'
import Sell from "./Sell"
import Buy from "./Buy"
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./Firestore/Firestore";
import {useState} from "react";
import ShowProduct from "./showProduct";
function App() {
let initPosts = [];
const [posts, setPosts] = useState(
   initPosts
);
const getDatabase = async () => {
    const q = query(collection(db, "Orders"));
    const querySnapshot = await getDocs(q);
    const newPosts = []; // Create a new array to store the updated posts
    setPosts([]);
    querySnapshot.forEach((doc) => {
        console.log(doc.data());
        newPosts.push({
            id: doc.id,
            Type: doc.data()["Type"],
            maxAmount: doc.data()["maxAmount"],
            minAmount: doc.data()["minAmount"],
            Price: doc.data()["Price"],
            Description: doc.data()["Description"],
            Image: doc.data()["Image"]
        });
        // console.log("should be done");
    });
    
    setPosts(newPosts); // Update the state with the new array of posts
    // console.log("Length: ", newPosts.length);
  };


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
          <Route path="/Buy/:id" element={<ShowProduct></ShowProduct>} />
          <Route path="*" element={<div>404 not found</div>} />
          {/* make a path here?? */}
<<<<<<< HEAD
=======
          
>>>>>>> bb11c9410fbc84f840142a73a7bd707fb63e9bd2
          
          
         


        </Routes>
      </Router>
    </div>
  );
}

export default App;
