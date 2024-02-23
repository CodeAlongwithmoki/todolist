import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { useState, useEffect } from "react";

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

import React from "react";

const App = () => {
  const [inputOne, setInputOne] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await onSnapshot(colRef, (snapshot) => {
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
    }).then(() => setInputOne(""));
  };

  const deleteStff = (id) => {
    const docRef = doc(db, "messages", id);

    deleteDoc(docRef).then(() => {});
  };

  return (
    <div>
      <h1>Firebase Todolist</h1>
      <form onSubmit={addForm}>
        <h2>Add Todo</h2>
        <input
          type="text"
          value={inputOne}
          onChange={(e) => setInputOne(e.target.value)}
        />
        <button>Add</button>
      </form>

      <ul>
        {data.map((item) => (
          <li key={item["id"]}>
            {" "}
            {item["text"]}{" "}
            <button onClick={() => deleteStff(item["id"])}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
