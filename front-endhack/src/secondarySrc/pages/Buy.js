import {useEffect, useState} from 'react';
import { doc,collection,  getDoc, getDocs, query, where } from "firebase/firestore";

import {db} from '../../Firestore/Firestore';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { storage } from '../../storage/Storage';
import { getDownloadURL, ref } from 'firebase/storage';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';

export default function Buy() {
    let nextId = 1;
    let initPosts = [
      ];
    const [posts, setPosts] = useState(
       initPosts
    );
    const getDatabase = async () => {
        const q = query(collection(db, "Orders"));
        const querySnapshot = await getDocs(q);
        const newPosts = []; // Create a new array to store the updated posts
        setPosts([]);
        const promises = []; // Array to store promises for fetching download URLs
    
        querySnapshot.forEach((doc) => {
            const imageRef = ref(storage, `${doc.id}/${doc.data()["Image"]}`);
            const downloadPromise = getDownloadURL(imageRef)
                .then((downloadUrl) => {
                    newPosts.push({
                        id: doc.id,
                        Type: doc.data()["Type"],
                        maxAmount: doc.data()["maxAmount"],
                        minAmount: doc.data()["minAmount"],
                        Price: doc.data()["Price"],
                        Description: doc.data()["Description"],
                        Image: downloadUrl
                    });
                })
                .catch((error) => {
                    console.error("Error getting download URL:", error);
                });
            promises.push(downloadPromise);
        });
    
        // Wait for all promises to resolve
        await Promise.all(promises);
    
        setPosts(newPosts); // Update the state with the new array of posts
    };
    
    const navigate = useNavigate();

    useEffect(() => {
        getDatabase()
    }, []);

    return (
        <div className={`w-screen px-2 py-3`}>
            <div>
                <h2 className={`text-center text-5xl font-semibold mb-3`}>Current Posts</h2>
                <div className={`px-4 flex flex-wrap `}>
                    {posts.map(post => (
                        <div onClick={() => navigate(`/Buy/${post.id}`, { replace: true })} className={`w-72 rounded-xl shadow-md h-96 mr-6 hover:scale-105 transition-all duration-200 ease-in-out cursor-pointer`}>
                            <img src={post.Image} className={`w-full shadow-inner rounded-t-xl h-3/6`} />
                            <div className={`bg-white h-2/6 px-4 py-3`}>
                                <p className={`text-xl font-semibold mb-2`}>{post.Type}</p>
                                <p className={`text-lg line-clamp-2`}>{post.Description}</p>
                            </div>
                            <p className={`rounded-b-lg text-3xl font-semibold text-green-600 h-1/6 px-4 pb-5`}>${post.Price}/lbs</p>
                        </div>
                    ))}
                </div>
                <div className="posts-container">
                
      </div>
    </div>
        </div>
    )
}