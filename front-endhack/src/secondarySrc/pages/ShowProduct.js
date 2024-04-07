import {useLocation} from 'react-router-dom'
import {useEffect, useState} from 'react';
import { doc,collection,  getDoc, getDocs, query, where } from "firebase/firestore";
import { storage } from '../../storage/Storage';
import { getDownloadURL, ref } from 'firebase/storage';
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
                                    SellerEmail: doc.data()["sellerEmail"]
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
    
    // const navigate = useNavigate();

    useEffect(() => {
        getDatabase()
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
                    <p className={`text-xl font-normal leading-relaxed mb-2`}>Price: ${posts[0].Price}/lbs</p>

                    <p className={`text-xl font-normal`}>Seller: <span className={`font-semibold cursor-pointer hover:text-gray-600`}>{auth.currentUser.email}</span></p>
                </div>
            </div>
            )}
         </>
    );
    
}