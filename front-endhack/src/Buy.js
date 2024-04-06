import {useState} from 'react'
import { doc,collection,  getDoc, getDocs, query, where } from "firebase/firestore";

import {db} from "./Firestore/Firestore"
import Cards from "./Components/Cards"

function Buy(){
    //1. extract all the data from the database.
    //2. then modularize 
    // const [cities, addCities] = useState([]);
    const cities = []
    
    const getDatabase = async() => {
        const q = query(collection(db, "Orders"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            // addCities(append(doc.data()["City"]));
            cities.push(doc.data()["City"]);
          });
        

        // const docRef = doc(db, "Orders", "JEUxSxigFeL5slnQiSbQ");
        // const docSnap = await getDoc(docRef);

        // if (docSnap.exists()) {
        //     console.log("Document data:", docSnap.data());
        //   } else {
        //     // docSnap.data() will be undefined in this case
        //     console.log("No such document!");
        //   }
        // console.log(cities);
        // for(let i = 0; i < cities.length; i++){
        //     console.log(cities);
        // }
    }
    return(
        <>
            {/* <div>HI</div> */}
            {<Cards></Cards>}
            {/* <div>HERE</div> */}
            <button onClick = {getDatabase}>Click me!</button>
        </>
    );
}
export default Buy;