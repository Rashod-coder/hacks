import {useState} from 'react'
import { doc,collection,  getDoc, getDocs, query, where } from "firebase/firestore";

import {db} from "./Firestore/Firestore"
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link, useNavigate } from 'react-router-dom';


function Buy(){
    //1. extract all the data from the database.
    //2. then modularize 
    // const [cities, addCities] = useState([]);
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
            console.log("should be done");
        });
        
        setPosts(newPosts); // Update the state with the new array of posts
        console.log("Length: ", newPosts.length);
    };
    // const getDatabase = async() => {
    //     const q = query(collection(db, "Orders"));
    //     const querySnapshot = await getDocs(q);
    //     querySnapshot.forEach((doc) => {
    //         console.log(doc.id);
    //         setPosts([
    //             ...posts,
    //             {id: doc.id, Type: doc.data()["Type"], maxAmount : doc.data()["maxAmount"], minAmount : doc.data()["minAmount"], Price: doc.data()["Price"]},
    //         ]);
    //         console.log("should be done");
    //       });
    //       console.log("Length: ", posts.length);
       
    // }
    // const getDatabase = () => {
    //     querySnapshot.forEach((doc) => {
    //         console.log(doc.id);
    //         setPosts(prevPosts => [
    //             ...prevPosts,
    //             { id: doc.id, Type: doc.data().Type, maxAmount: doc.data().maxAmount, minAmount: doc.data().minAmount, Price: doc.data().Price },
    //         ]);
    //         console.log("should be done");
    //     });
    // }
    return(
        <>
            <div onLoad = {getDatabase}>
                <div></div>
                <h2>Current Posts</h2>
                <ul>
                    {posts.map(post => (
                        // <li key = {post.id}>
                        //     {post.id}{' '}   
                        // </li>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={post.Image} />
                            <Card.Body>
                                <Card.Title>{post.Type}</Card.Title>
                                <Card.Text>
                                    ${post.Price} per Pound
                                </Card.Text>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                            <ListGroup.Item>{post.Description}</ListGroup.Item>
                            <ListGroup.Item> Minimum amount of pounds: {post.minAmount}</ListGroup.Item>
                            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                            </ListGroup>
                        </Card>  
                    ))}
                </ul>
                <div className="posts-container">
                
      </div>
    </div>

    <button onClick = {getDatabase}>Click me!</button>
    </>
    );
}
export default Buy;