import React, { useState } from 'react';
// import './Checkout.css';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { doc, updateDoc, getDoc, collection, where, query, getDocs } from 'firebase/firestore';
import { db } from '../../Firestore/Firestore';
import { auth } from '../../auth/Authentication';

const Checkout = ({ price, docId, sellerEmail }) => {
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
    const [currency, setCurrency] = useState(options.currency);

    const onCurrencyChange = ({ target: { value } }) => {
        setCurrency(value);
        dispatch({
            type: "resetOptions",
            value: {
                ...options,
                currency: value,
            },
        });
    }

    const onCreateOrder = (data,actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: price,
                    },
                },
            ],
        });
    }

    const onApproveOrder = (data,actions) => {
        return actions.order.capture().then((details) => {
            console.log(details.purchase_units[0].amount.value);
            const name = details.payer.name.given_name;
            const usersDoc = collection(db, "users");
            const q = query(usersDoc, where("email", "==", sellerEmail));
            getDocs(q).then(snapshot => {
                console.log(snapshot.docs);
                const currentEarnings = snapshot.docs[0]._document.data.value.mapValue.fields.earnings;
                const currentSales = snapshot.docs[0]._document.data.value.mapValue.fields.sales;
                let newEarnings = currentEarnings ? currentEarnings.doubleValue ? currentEarnings.doubleValue : currentEarnings.integerValue : 0;
                let newSales = currentSales ? currentSales.integerValue ? currentSales.integerValue : 0 : 0;

                console.log("CURRENT EARNINGS:", currentEarnings)
                if (currentEarnings && (parseFloat(currentEarnings.integerValue) > 0.00 || parseFloat(currentEarnings.doubleValue) > 0.00)) {
                    console.log(typeof newEarnings, typeof details.purchase_units[0].amount.value);
                    newEarnings += parseFloat(details.purchase_units[0].amount.value);
                } else {
                    newEarnings = parseFloat(details.purchase_units[0].amount.value);
                }

                newSales = parseInt(newSales) + 1;

                const userDocsSnap = query(usersDoc, where("email", "==", sellerEmail));
                getDocs(userDocsSnap).then(snapshot2 => {
                    console.log("HELLO");
                    const id = snapshot2.docs[0].id;
                    const usersDocRef = doc(db, "users", id);
                    updateDoc(usersDocRef, { earnings: parseFloat(newEarnings), sales: parseInt(newSales) }).then(() => {
                        alert(`Transaction completed by ${name}`);
                    });
                })                
            });
            // console.log(auth.currentUser.uid)
            // getDoc(docRef).then((docSnap) => {
            //     console.log(docSnap.data())
            //     alert(`Transaction completed by ${name}`);
            // }).catch(e => {
            //     console.error("Error fetching data:", e);
            //     alert(`Transaction completed by ${name}`);
            // })
        });
    }

    return (
        <div className="checkout">
            {isPending ? <p>LOADING...</p> : (
                <>
                    <select value={currency} onChange={onCurrencyChange}>
                            <option value="USD">💵 USD</option>
                            <option value="EUR">💶 Euro</option>
                    </select>
                    <PayPalButtons 
                        style={{ layout: "vertical" }}
                        createOrder={(data, actions) => onCreateOrder(data, actions)}
                        onApprove={(data, actions) => onApproveOrder(data, actions)}
                    />
                </>
            )}
        </div>
    );
}

export default Checkout;