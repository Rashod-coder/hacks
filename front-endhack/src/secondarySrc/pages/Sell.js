import { useState, useEffect, useRef } from 'react';
import { collection, getDocs, query, where, addDoc } from "firebase/firestore";
import { db } from '../../Firestore/Firestore';
import { useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import { IoClose, IoSparkles } from "react-icons/io5";
import { auth } from '../../auth/Authentication';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { storage } from '../../storage/Storage';
import { ref, uploadBytes } from 'firebase/storage';
import axios from 'axios';
import { FaSpinner } from 'react-icons/fa';
import { FaFileUpload } from "react-icons/fa";
import { ImSpinner8 } from "react-icons/im";

export default function Sell() {
    // eslint-disable-next-line
    const [desc, setDesc] = useState("");
    const [rate, setRate] = useState(0.01);
    const [maxAmt, setMaxAmt] = useState(1);
    const [minAmt, setMinAmt] = useState(0);
    const [type, setType] = useState("");
    const [priceFocused, setPriceFocused] = useState(false);
    const [suggestingPrice, setSuggestingPrice] = useState(false);
    const uploadRef = useRef();
// eslint-disable-next-line
  const [show, setShow] = useState(true);

    // :)
    const [user, setUser] = useState("");

    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [image, setImage] = useState("");
    const [imageName, setImageName] = useState("");
    // eslint-disable-next-line
    const navigate = useNavigate();
    const [put, setPut] = useState(false);
    // const [image, setImage] = useState(null);
    // eslint-disable-next-line
    const [fileName, setFileName] = useState("No selected file");
    const handleImageChange = (event) => {
        const selectedImage = event.target.files[0]; // Get the first file from the selected files array
        
        setImageName(selectedImage.name);
        setImage(URL.createObjectURL(selectedImage)); // Set the selected image to the image state

    }
    

    const keepDatabase = async () => {
        try {
            const response = await fetch(image);
            const blob = await response.blob();

            const docRef = await addDoc(collection(db, "Orders"), {
                Street: street,
                maxAmount: maxAmt,
                minAmount: minAmt,
                Price: rate,
                City: city,
                Zipcode: zipcode,
                Type: type,
                Image: imageName, 
                sellerEmail: user,
                Description: desc
            });

            await uploadBytes(ref(storage, `${docRef.id}/${imageName}`), blob);
            console.log("Successfully uploaded image_file");
            setPut(true);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    const suggestPrice = async () => {
        setSuggestingPrice(true);
        const date = new Date();
        const response = await axios.post("http://localhost:5001/predict", { pounds: maxAmt, dayOfWeek: date.toLocaleString('en-us', { weekday: 'long' }), seasonalYield: 10 }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log(response.data.prediction);
        setRate(Math.round(response.data.prediction * 100) / 100);
        setSuggestingPrice(false);
    }
    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
          if(currentUser){
            // currentUser.uid
            // console.log(currentUser.user.uid)
            // let uid = currentUser.uid;
            let email = currentUser.email;
            setUser(email);
            console.log("email found", email);
          }
          else{
            setUser("");
            console.log("not found");
          }
        });
      }, []);

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
                <h1 className="text-3xl mb-3 font-semibold">Upload your Product Here!</h1>
                <form className="sell-form mx-auto w-3/6 shadow-xl shadow-gray-500 px-10 py-10 rounded-xl flex justify-center flex-col" style={{ backgroundColor: '#73b0ff' }}>
                        
                        <div className="form-group mb-3">
                            <input type="text" className="form-control" placeholder="Type of produce (e.g., Apple)" name="type" onChange={(event) => setType(event.target.value)} required />
                        </div>
                        <div className="form-group mb-3" onFocus={() => setPriceFocused(true)}>
                            <input value={rate} type="text" className="form-control" placeholder="Rate per pound" name="rate" onChange={(event) => setRate(event.target.value)} required/>
                            {priceFocused && <div className='absolute h-fit w-fit bg-gray-200 shadow-lg -right-56 top-10 rounded-xl px-4 py-4'>
                                <p className={`text-lg flex flex-row mb-3 items-center font-semibold`}><IoSparkles size={25} className={`mr-3 fill-purple-600`} />Suggest Price                                <IoClose size={25} className={`w-fit ml-2 cursor-pointer hover:fill-gray-700 transition-all duration-200 ease-in-out`} onClick={() => setPriceFocused(false)} /></p>
                                <button type='button' onClick={suggestPrice} className={`px-2 py-1 rounded-lg bg-green-500 hover:bg-green-400 transition-all duration-200 ease-in-out text-white font-semibold text-lg flex flex-row items-center justify-center`} disabled={suggestingPrice}>{suggestingPrice ? 'Suggesting' : 'Suggest'}{suggestingPrice && <ImSpinner8 className={`animate-spin ml-3`}/>}</button>
                            </div>}
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Amount of produce in stock (e.g., 5 pounds)" name="maxAmt" onChange={(event) => setMaxAmt(event.target.value)} required/>
                        </div>
                        <div className="form-group relative">
                            <input type="text" className="form-control" placeholder="Minimum amount per purchase" name="minAmt" onChange={(event) => setMinAmt(event.target.value)} required/>
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
                            
                        <div className={`w-full bg-blue-950 rounded-xl hover:bg-blue-900 cursor-pointer flex flex-col justify-center items-center py-8 mb-4`} onClick={() => uploadRef.current.click()}>
                            {imageName === "" ? <FaFileUpload size={20} className={`mb-2`} fill='white' /> : <img src={image} alt='image-preview' className={`w-72 mb-2 h-auto`} />}
                            <p className={`text-xl font-semibold text-white`}>{imageName === "" ? 'Add Image' : imageName }</p>
                            <input
                                type="file"
                                ref={uploadRef}
                                className="form-control-file hidden fixed top-0 left-0"
                                accept="image/*"  
                                onChange={handleImageChange} 
                            />
                        </div>
                        <button type="button" className="btn btn-primary btn-block mx-auto" onClick={keepDatabase}>Upload</button>


                    </form>
                </div>
                <br/>
            </div>
        </div>
        </div>
    )
}