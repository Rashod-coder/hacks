import {useState} from 'react'
import { collection, addDoc } from "firebase/firestore"; 

import {db} from "./Firestore/Firestore"
function Sell(){
    //lets get data
    const [desc, setDesc] = useState("");
    const [rate, setRate] = useState(.01);
    const [maxAmt, setMaxAmt] = useState(1);
    const [minAmt, setMinAmt] = useState(0);
    const [type, setType] = useState("");

    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [zipcode, setZipcode] = useState("");
    const keepDatabase = async() => {
        try {
            const docRef = await addDoc(collection(db, "Orders"), {
              Street: street,
              maxAmount: maxAmt,
              minAmount: minAmt,
              Price: rate,
              City: city,
              Zipcode: zipcode,
              Type: type
            });
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }    }

    return(
        <div id = "box"className='wrapper'>
            <div className='input-box'>
            <input type="text" placeholder='Type of produce (e.x: Apple)' name="type" onChange={(event) => {
                setType(event.target.value);
            }}/>
            </div>
            <div className='input-box'>
            <input type="text" placeholder='Rate per pound' name="rate" onChange={(event) => {
                setRate(event.target.value);
            }}/>
            </div>
            <div className='input-box'>
            <input type="text" placeholder='Amount of produce (e.x: 5 pounds)' name="mxamt" onChange={(event) => {
                setMaxAmt(event.target.value);
            }}/>
            </div>
            <div className='input-box'>
            <input type="text" placeholder='Minimum amount per purchase' name="mnamt"  onChange={(event) => {
                setMinAmt(event.target.value);
            }}/>
            </div>
            <div className='input-box'>
            <input type="text" placeholder='Description of product' name="desc"  onChange={(event) => {
                setDesc(event.target.value);
            }}/>
            </div>


            <div className='input-box'>
            <input type="text" placeholder='Street' name="street"  onChange={(event) => {
                setStreet(event.target.value);
            }}/>
            </div>
            <div className='input-box'>
            <input type="text" placeholder='City' name="city"  onChange={(event) => {
                setCity(event.target.value);
            }}/>
            </div>
            <div className='input-box'>
            <input type="text" placeholder='Zipcode' name="zipcode"  onChange={(event) => {
                setZipcode(event.target.value);
            }}/>
            </div>
            <button onClick = {keepDatabase}>Upload</button>
        </div>
    );
}
export default Sell;