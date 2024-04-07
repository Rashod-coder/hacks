import {useEffect, useState} from 'react';
import { doc,collection,  getDoc, getDocs, query, where } from "firebase/firestore";

import {db} from '../../Firestore/Firestore';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
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
                        // <li key = {post.id}>
                        //     {post.id}{' '}   
                        // </li>
                        <Card style={{ width: '18rem' }} >
                            <Card.Img variant="top" src={post.Image} />
                            <Card.Body>
                                <Card.Title>{post.Type}</Card.Title>
                                <Card.Text>
                                    ${post.Price} per Pound
                                </Card.Text>
                            </Card.Body>
                            <ListGroup className="list-group-flush center-button">
                            {/* <ListGroup.Item>{post.Description}</ListGroup.Item> */}
                            <ListGroup.Item> Minimum amount of pounds: {post.minAmount}</ListGroup.Item>
                            <ListGroup.Item>Total amount of pounds: {post.maxAmount}</ListGroup.Item>
                            <Button onClick = {() => navigate("/Buy/"+post.id)}>Buy now</Button>
                            </ListGroup>
                        </Card>  
                    ))}
                    </Row>
                </ul>
                <div className="posts-container">
                
      </div>
    </div>
        </div>
    )
}