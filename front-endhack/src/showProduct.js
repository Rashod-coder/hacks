import React from 'react';
import {useState, useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { doc,collection,  getDoc, getDocs, query, where } from "firebase/firestore";
import {db} from "./Firestore/Firestore"


function ShowProduct() { // Renamed function to start with an uppercase letter
    const location = useLocation();
    const navigate = useNavigate();
    let s = location.pathname;
    s = s.substring(5);
    console.log(s);
    //check if s exists in Orders
    const getDatabase = async () => {
        const q = query(collection(db, "Orders"));
        const querySnapshot = await getDocs(q);
        let there = false;
        querySnapshot.forEach((doc) => {
            console.log(doc.id)
            if(doc.id === s){
                there = true;
                console.log("YES", doc.id, there)
            }
      });
        if(!there){
            navigate("/1")
        }

    
    };

    
    useEffect(() => {
        getDatabase()
    }, []);
    return (
        
        <div>{s}</div>
    );
}

export default ShowProduct;