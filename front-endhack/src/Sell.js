import { useState } from 'react';
import { collection, addDoc } from "firebase/firestore"; 
import { db } from "./Firestore/Firestore";
import './Sell.css'; // Import your custom CSS file for Sell component styling

function Sell() {
    const [desc, setDesc] = useState("");
    const [rate, setRate] = useState(0.01);
    const [maxAmt, setMaxAmt] = useState(1);
    const [minAmt, setMinAmt] = useState(0);
    const [type, setType] = useState("");

    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [zipcode, setZipcode] = useState("");

    const keepDatabase = async () => {
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
        }
    }

    return (
        <div className="container-fluid sell-container">
            <div className="row">
             <div className="col-lg-6">
                <form className="sell-form">
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Type of produce (e.g., Apple)" name="type" onChange={(event) => setType(event.target.value)} />
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Rate per pound" name="rate" onChange={(event) => setRate(event.target.value)} />
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Amount of produce (e.g., 5 pounds)" name="maxAmt" onChange={(event) => setMaxAmt(event.target.value)} />
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Minimum amount per purchase" name="minAmt" onChange={(event) => setMinAmt(event.target.value)} />
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Description of product" name="desc" onChange={(event) => setDesc(event.target.value)} />
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Street" name="street" onChange={(event) => setStreet(event.target.value)} />
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="City" name="city" onChange={(event) => setCity(event.target.value)} />
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Zipcode" name="zipcode" onChange={(event) => setZipcode(event.target.value)} />
                        </div>
                        <button type="button" className="btn btn-primary btn-block" onClick={keepDatabase}>Upload</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Sell;
