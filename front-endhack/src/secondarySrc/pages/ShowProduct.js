import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { doc, collection, getDocs, query } from 'firebase/firestore';
import { storage } from '../../storage/Storage';
import { getDownloadURL, ref } from 'firebase/storage';
import { db } from '../../Firestore/Firestore';
import './Product.css';
import { auth } from '../../auth/Authentication';

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

    
    const getDatabase = () => {
        console.log(s);
        const q = query(collection(db, "Orders"));
        getDocs(q)
            .then((querySnapshot) => {
                const promises = []; // Array to store promises for download URL
                const newPosts = []; // Create a new array to store the updated posts
                setPosts([]);
                querySnapshot.forEach((doc) => {
                    if (doc.id === s) {
                        console.log(doc.data()["Type"]);
                        const imageRef = ref(storage, `${doc.id}/${doc.data()["Image"]}`);
                        const downloadPromise = getDownloadURL(imageRef)
                            .then((downloadUrl) => {
                                console.log(downloadUrl, "DOWNLOAD URL");
                                newPosts.push({
                                    id: doc.id,
                                    Type: doc.data()["Type"],
                                    maxAmount: doc.data()["maxAmount"],
                                    minAmount: doc.data()["minAmount"],
                                    Price: doc.data()["Price"],
                                    Description: doc.data()["Description"],
                                    Image: downloadUrl,
                                    SellerEmail: doc.data()["sellerEmail"],
                                    Street: doc.data()["Street"],
                                    City: doc.data()["City"]
                                });
                            })
                            .catch((error) => {
                                console.error("Error getting download URL:", error);
                            });

                        promises.push(downloadPromise);
                    }
                });
                Promise.all(promises)
                    .then(() => {
                        console.log(newPosts);
                        setPosts(newPosts); // Update the state with the new array of posts
                    })
                    .catch((error) => {
                        console.error("Error fetching download URLs:", error);
                    });
            })
            .catch((error) => {
                console.error("Error getting documents:", error);
            });
    };
    
    useEffect(() => {
        getDatabase();
    }, []);

    return (
        <>
            { posts.length > 0 && (
            <div className="w-screen px-16 py-20 flex justify-between">
                <div className={`w-[48%]`}>
                    {posts.length > 0 && (
                        <img src={posts[0].Image} alt={posts[0].Type + " Image"} className={`w-full rounded-xl h-96 shadow-lg`} />
                    )}
                </div>
                <div className={`w-[48%]`}>
                    <h2 className={`text-3xl font-semibold mb-2`}>{posts[0].Type}</h2>
                    <p className={`text-xl font-normal leading-relaxed mb-2`}>{posts[0].Description}</p>
                    <p className={`text-xl font-normal leading-relaxed mb-2 flex`}>Price: <span className={`text-4xl ml-3 text-green-700`}>${posts[0].Price}/lbs</span></p>
                    <p className={`text-xl font-normal leading-relaxed mb-2 flex`}>Min Amount you can purchase: <span className={`text-2xl ml-3 text-black-700`}>{posts[0].minAmount} lbs</span></p>
                    <p className={`text-xl font-normal leading-relaxed mb-2 flex`}>Stock available: <span className={`text-2xl ml-3 text-black-700`}>{posts[0].maxAmount} lbs</span></p>
                    <p className={`text-xl font-normal leading-relaxed mb-2 flex`}>Location <span className={`text-2xl ml-3 text-black-700`}>{posts[0].City}, {posts[0].Street} </span></p>
                    <p className={`text-xl font-normal mb-3`}>Seller: <span className={`font-semibold cursor-pointer hover:text-gray-600`}>{posts[0].SellerEmail}</span></p>
                    <div className={`w-full mx-auto`}>
                        <PayPalScriptProvider options={initialOptions}>
                            <Checkout price={posts[0].Price} docId={posts[0].id} sellerEmail={posts[0].SellerEmail}/>
                        </PayPalScriptProvider>
                    </div>
                </div>
            </div>
            )}
         </>
    );
}
