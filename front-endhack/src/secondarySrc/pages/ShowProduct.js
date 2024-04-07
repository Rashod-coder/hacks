import {useLocation} from 'react-router-dom'
import {useEffect, useState} from 'react';
import { doc,collection,  getDoc, getDocs, query, where } from "firebase/firestore";
import { auth } from '../../auth/Authentication';
import { onAuthStateChanged, signOut } from "firebase/auth";


import {db} from '../../Firestore/Firestore';
export default function ShowProduct() {
    const location = useLocation();
    let s = location.pathname.substring(5);
    let initPosts = [];
    const [user, setUser] = useState("");

    const [posts, setPosts] = useState(
        initPosts
    );
    const getDatabase = async () => {
        
        
        const q = query(collection(db, "Orders"));
        const querySnapshot = await getDocs(q);
        const newPosts = []; // Create a new array to store the updated posts
        setPosts([]);
        querySnapshot.forEach((doc) => {
            if(doc.id === s){
                newPosts.push({
                    id: doc.id,
                    Type: doc.data()["Type"],
                    maxAmount: doc.data()["maxAmount"],
                    minAmount: doc.data()["minAmount"],
                    Price: doc.data()["Price"],
                    Description: doc.data()["Description"],
                    Image: doc.data()["Image"],
                    SellerEmail: doc.data()["sellerEmail"]
                });
            }
            // console.log("should be done");
        });
        
        setPosts(newPosts); // Update the state with the new array of posts
        // console.log("Length: ", newPosts.length);
    };
    console.log("HERE", posts[0]);
    // const navigate = useNavigate();

    useEffect(() => {
        getDatabase()
    }, []);


    return (
        // <div>
        // {posts.length > 0 && posts[0].Type ? <div>{posts[0].Type}</div> : <div></div>}
        // {posts.length > 0 && posts[0].Description ? <div>{posts[0].Description}</div> : <div></div>}
        // {posts.length > 0 && posts[0].Price ? <div>${posts[0].Price} per pound</div> : <div></div>}
        // {posts.length > 0 && posts[0].Image ? <img variant="top" src={posts[0].Image} /> : <div></div> } 
        //     {/* <div>{posts[0].Description}</div> */}
        //     {/* <div>{posts[0]}</div> */}
        //     {/* <div>{posts[0].maxAmount}</div>
        //     <div>{posts[0].minAmount}</div>
        //     <div>{posts[0].Price}</div>
        //     <div>{posts[0].Image}</div> */}
        // </div>
        <div>
    {posts.length > 0 && posts[0].Type && (
        <div className="text-xl font-bold mb-2">{posts[0].Type}</div>
    )}

    {posts.length > 0 && posts[0].Description && (
        <div className="text-gray-700 mb-2">{posts[0].Description}</div>
    )}

    {posts.length > 0 && posts[0].Price && (
        <div className="text-green-600 mb-2">${posts[0].Price} per pound</div>
    )}

    {posts.length > 0 && posts[0].Image && (
        <img className="w-full" src={posts[0].Image} alt="Product" />
    )}

    {posts.length > 0 && posts[0].SellerEmail && (
        <div className="text-green-600 mb-2">Poster: {posts[0].SellerEmail}</div>
    )}
</div>
        
    );
}