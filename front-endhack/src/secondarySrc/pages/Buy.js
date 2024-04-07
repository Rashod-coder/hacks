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
        <div className={`w-screen`}>
            <div>
                <div></div>
                <h2>Current Posts</h2>
                <ul>
                <Row xs={1} md={1} className="g-4">
                    {posts.map(post => (
                        <div className={`w-52`}>
                            <img src={post.Image} />
                        </div>
                    ))}
                    </Row>
                </ul>
                <div className="posts-container">
                
      </div>
    </div>
        </div>
    )
}