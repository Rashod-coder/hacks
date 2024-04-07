import { useState } from 'react';
import { collection, addDoc } from "firebase/firestore"; 
import { db } from '../../Firestore/Firestore';
import { useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import { IoSparkles } from "react-icons/io5";
import axios from 'axios';

export default function Sell() {
    // eslint-disable-next-line
    const [desc, setDesc] = useState("");
    const [rate, setRate] = useState(0.01);
    const [maxAmt, setMaxAmt] = useState(1);
    const [minAmt, setMinAmt] = useState(0);
    const [type, setType] = useState("");
    const [priceFocused, setPriceFocused] = useState(false);
    const [suggestingPrice, setSuggestingPrice] = useState(false);
// eslint-disable-next-line
  const [show, setShow] = useState(true);

    // :)

    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [image, setImage] = useState("");
    // eslint-disable-next-line
    const navigate = useNavigate();
    const [put, setPut] = useState(false);
    // const [image, setImage] = useState(null);
    // eslint-disable-next-line
    const [fileName, setFileName] = useState("No selected file");
    const handleImageChange = (event) => {
        const selectedImage = event.target.files[0]; // Get the first file from the selected files array
        
        setImage(URL.createObjectURL(selectedImage)); // Set the selected image to the image state

    }
    const keepDatabase = async () => {
        try {
            const docRef = await addDoc(collection(db, "Orders"), {
                Street: street,
                maxAmount: maxAmt,
                minAmount: minAmt,
                Price: rate,
                City: city,
                Zipcode: zipcode,
                Type: type,
                Image: image 
            });
            console.log("Document written with ID: ", docRef.id);
            setPut(true);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    return (
        <div className={'w-screen flex justify-center items-center'}>
            <div className="container-fluid sell-container">
            <div className="row">
             <div className="">
                {put ?  <Alert variant="success" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>Product Added!</Alert.Heading>
        <p>
          Your product is on the marketplace!
        </p>
      </Alert>
      
     
     : <div></div>}
                {/* {put ? navigate("/Dashboard") : <div></div>} */}
                {}
                <h1 className="text-3xl">Upload your Products here!</h1>
                <form className="sell-form mx-auto w-1 shadow-lg" style={{ backgroundColor: '#73b0ff' }} mb-3>
                        
                        <div className="form-group mb-3">
                            <input type="text" className="form-control" placeholder="Type of produce (e.g., Apple)" name="type" onChange={(event) => setType(event.target.value)} required />
                        </div>
                        <div className="form-group mb-3">
                            <input type="text" className="form-control" placeholder="Rate per pound" name="rate" onChange={(event) => setRate(event.target.value)} required />
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Amount of produce in stock (e.g., 5 pounds)" name="maxAmt" onChange={(event) => setMaxAmt(event.target.value)} />
                        </div>
                        <div className="form-group relative">
                            <input type="text" onFocus={() => setPriceFocused(true)} onBlur={() => setPriceFocused(false)} className="form-control" placeholder="Minimum amount per purchase" name="minAmt" onChange={(event) => setMinAmt(event.target.value)} />
                            {priceFocused && <div className='absolute h-fit w-fit bg-gray-200 shadow-lg -right-56 -top-10 rounded-xl px-4 py-4'>
                                <p className={`text-lg flex flex-row mb-3 items-center font-semibold`}><IoSparkles size={25} className={`mr-3 fill-purple-600`} />Suggest Price</p>
                                <button className={`px-2 py-1 rounded-lg bg-green-500 hover:bg-green-400 transition-all duration-200 ease-in-out text-white font-semibold text-lg`}>Suggest</button>
                            </div>}
                        </div>
                        <div className="form-group mb-3">
                            <input type="text" className="form-control" placeholder="Description of product" name="desc" onChange={(event) => setDesc(event.target.value)} required/>
                        </div>
                        <div className="form-group mb-3">
                            <input type="text" className="form-control" placeholder="Street" name="street" onChange={(event) => setStreet(event.target.value)} required />
                        </div>
                        <div className="form-group mb-3">
                            <input type="text" className="form-control" placeholder="City" name="city" onChange={(event) => setCity(event.target.value)} required />
                        </div>
                        <div className="form-group mb-3">
                            <input type="text" className="form-control" placeholder="Zipcode" name="zipcode" onChange={(event) => setZipcode(event.target.value)} required />
                        </div>
                            
                        <div className="form-group mb-3">
                            Upload Image 
                            <input
                                type="file"
                                className="form-control-file"
                                accept="image/*"  // Specify accepted file types
                                onChange={handleImageChange} // Handle image selection
                            />
                        </div>
                        <button type="button" className="btn btn-primary btn-block" onClick={keepDatabase}>Upload</button>

                    </form>
                </div>
            </div>
        </div>
        </div>
    )
}