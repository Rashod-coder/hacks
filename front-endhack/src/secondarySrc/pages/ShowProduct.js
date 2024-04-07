import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { doc, collection, getDocs, query } from 'firebase/firestore';
import { storage } from '../../storage/Storage';
import { getDownloadURL, ref } from 'firebase/storage';
import { db } from '../../Firestore/Firestore';
import { auth } from '../../auth/Authentication';
import './Product.css';
// import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Checkout from './Checkout';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
// import { loadScript } from "@paypal/paypal-js";



export default function ShowProduct() {

    const initialOptions = {
        "client-id": "AReNJ6ZcnIuG8FVSp16crYtRCAu6lOMQXhKl3Ahlwky1cJZue52Sbm4Fwj6k4KBHBnwggT1a_VwlaTK_",
        currency: "USD",
        intent: "capture",
      };


    const location = useLocation();
    let s = location.pathname.substring(5);
    let initPosts = [];

    const [user, setUser] = useState('');
    const [posts, setPosts] = useState(initPosts);
    const [amount, setAmount] = useState(10);
    const [scriptLoaded, setScriptLoaded] = useState(false);

    
    const getDatabase = async () => {
        const q = query(collection(db, 'Orders'));
        const querySnapshot = await getDocs(q);
        const newPosts = [];

        querySnapshot.forEach((doc) => {
            if (doc.id === s) {
                newPosts.push({
                    id: doc.id,
                    Type: doc.data()['Type'],
                    maxAmount: doc.data()['maxAmount'],
                    minAmount: doc.data()['minAmount'],
                    Price: doc.data()['Price'],
                    Description: doc.data()['Description'],
                    Image: doc.data()['Image'],
                    SellerEmail: doc.data()['sellerEmail'],
                });
            }
        });

        setPosts(newPosts);
    };
    console.log("HERE", posts[0]);
    // const navigate = useNavigate();

    useEffect(() => {
        getDatabase();
    }, []);

    return (
        <>
            { posts.length > 0 && (
            <div className="w-screen px-16 py-20 flex justify-between">
                <div className={`w-[48%]`}>
                    {posts.length > 0 && (
                        <img src={posts[0].Image} alt={posts[0].Type + " Image"} className={`w-full rounded-xl h-96`} />
                    )}
                </div>
                <div className={`w-[48%]`}>
                    <h2 className={`text-3xl font-semibold mb-2`}>{posts[0].Type}</h2>
                    <p className={`text-xl font-normal leading-relaxed mb-2`}>{posts[0].Description}</p>
                    <p className={`text-xl font-normal`}>Seller: <span className={`font-semibold cursor-pointer hover:text-gray-600`}>{auth.currentUser.email}</span></p>
                </div>
                <PayPalScriptProvider options={initialOptions}>
                    <Checkout/>
                </PayPalScriptProvider>
            </div>
            )}
         </>
    );
}
