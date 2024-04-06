import React, { useState, useEffect, Fragment, useContext } from 'react';
import {
  doc,
  onSnapshot,
  updateDoc,
  setDoc,
  deleteDoc,
  collection,
  serverTimestamp,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from 'firebase/firestore';

function SnapshotFirebaseAdvanced() {
    const colletionRef = collection(db, 'schools');
  
    const { currentUser } = useContext(AuthContext);
  
    const currentUserId = currentUser ? currentUser.uid : null;
    const [schools, setSchools] = useState([]);
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [score, setScore] = useState('');
  
  
    //REALTIME GET FUNCTION
    useEffect(() => {
      const q = query(
        colletionRef,
        //  where('owner', '==', currentUserId),
        where('title', '==', 'Orders') // does not need index
        //  where('score', '<=', 100) // needs index  https://firebase.google.com/docs/firestore/query-data/indexing?authuser=1&hl=en
        // orderBy('score', 'asc'), // be aware of limitations: https://firebase.google.com/docs/firestore/query-data/order-limit-data#limitations
        // limit(1)
      );
  
      setLoading(true);
      // const unsub = onSnapshot(q, (querySnapshot) => {
      const unsub = onSnapshot(colletionRef, (querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        setSchools(items);
        setLoading(false);
      });
      return () => {
        unsub();
      };
  
      // eslint-disable-next-line
    }, []);
  
    // ADD FUNCTION
    async function addSchool() {
      const owner = currentUser ? currentUser.uid : 'unknown';
      const ownerEmail = currentUser ? currentUser.email : 'unknown';
  
      const newSchool = {
        title,
        desc,
        score: +score,
        id: uuidv4(),
        owner,
        ownerEmail,
        createdAt: serverTimestamp(),
        lastUpdate: serverTimestamp(),
      };
  
      try {
        const schoolRef = doc(colletionRef, newSchool.id);
        await setDoc(schoolRef, newSchool);
      } catch (error) {
        console.error(error);
      }
    }
  
    //DELETE FUNCTION
    async function deleteSchool(school) {
      try {
        const schoolRef = doc(colletionRef, school.id);
        await deleteDoc(schoolRef, schoolRef);
      } catch (error) {
        console.error(error);
      }
    }
  
    // EDIT FUNCTION
    async function editSchool(school) {
      const updatedSchool = {
        score: +score,
        lastUpdate: serverTimestamp(),
      };
  
      try {
        const schoolRef = doc(colletionRef, school.id);
        updateDoc(schoolRef, updatedSchool);
      } catch (error) {
        console.error(error);
      }
    }
  
    return (
        <div>HERE</div>
    );
  }
  
  export default SnapshotFirebaseAdvanced;