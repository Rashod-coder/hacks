import {useLocation} from 'react-router-dom'
import {useEffect, useState} from 'react';
import { doc,collection,  getDoc, getDocs, query, where } from "firebase/firestore";
import { auth } from '../../auth/Authentication';
import { onAuthStateChanged, signOut } from "firebase/auth";
import './Product.css';



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
    
        <div className="show-product-container">
            <div className='product-form'>
            {/* Product Name */}
            <div className="product-name text-3xl font-bold mb-4">{posts.length > 0 && posts[0].Type}</div>
    
            {/* Moved image rendering here */}
            {posts.length > 0 && posts[0].Image && (
                <img className="product-image" src={posts[0].Image} alt="Product" />
            )}
    
            <div className="flex flex-row md:flex-row md:w-full"> {/* Changed to flex-col and added md:w-full */}
                {/* Left column */}
                <div className="left-column md:w-1/2 md:mr-4"> {/* Half width on medium screens */}
                    <div className="text-gray-700 mb-2"> {/* Removed md:w-80 */}
                        {posts.length > 0 && posts[0].SellerEmail && (
                            <div className="text-green-600 mb-2">Seller: {posts[0].SellerEmail}</div>
                        )}
                        {posts.length > 0 && posts[0].Price && (
                            <div className="text-green-600 mb-2">Price: ${posts[0].Price} per pound</div>
                        )}
                    </div>
                </div>
    
                {/* Right column */}
                <div className="right-column md:w-1/2"> {/* Half width on medium screens */}
                    {/* Description */}
                    {posts.length > 0 && posts[0].Description && (
                        <div>{posts[0].Description}</div>
                    )}
                </div>
            </div>
         </div>
         </div>
         
    );
    
}