import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { signOut, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA82L51_qZbhBXi-ML7aihCWCpHgMzI8wI",
  authDomain: "fir-app-46ef5.firebaseapp.com",
  projectId: "fir-app-46ef5",
  storageBucket: "fir-app-46ef5.appspot.com",
  messagingSenderId: "343643383575",
  appId: "1:343643383575:web:c5150c17fb00957b2eb952",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore();

const colRef = collection(db, "messages");
const q = query(colRef, orderBy("createdAt", "asc"));

import React from "react";

const Todolist = ({ user }) => {
  const auth = getAuth();
  const [inputOne, setInputOne] = useState("");
  const [inputTwo, setInputTwo] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await onSnapshot(q, (snapshot) => {
        let messages = [];
        snapshot.docs.forEach((doc) => {
          messages.push({ ...doc.data(), id: doc.id });
        });
        setData(messages);
      });
    };

    fetchData();
  }, []);

  const addForm = (e) => {
    e.preventDefault();
    addDoc(colRef, {
      text: inputOne,
      createdAt: serverTimestamp(),
    }).then(() => setInputOne(""));
  };

  const deleteStff = (id) => {
    const docRef = doc(db, "messages", id);

    deleteDoc(docRef).then(() => {});
  };

  const updateStff = (id) => {
    const updRef = doc(db, "messages", id);
    updateDoc(updRef, {
      text: inputOne,
    }).then(() => setInputOne(""));
  };

  const signO = () => {
    signOut(auth);
  };

  return (
    <div>
      <h1>
        {" "}
        Welcome <img src={user["photoUrl"]} alt="" />
        {user["displayName"]}
      </h1>
      <form onSubmit={addForm}>
        <h2>Add Todo</h2>

        <input
          type="text"
          value={inputOne}
          onChange={(e) => setInputOne(e.target.value)}
        />
        <button>Add</button>
      </form>
      <button onClick={signO}>SignOut</button>

      <ul>
        {data.map((item) => (
          <li key={item["id"]}>
            {" "}
            {item["text"]}{" "}
            <button onClick={() => deleteStff(item["id"])}>delete</button>
            <button onClick={() => updateStff(item["id"])}>update</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todolist;
