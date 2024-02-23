import Todolist from "./components/todolist";
import React from "react";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
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

const auth = getAuth();
const provider = new GoogleAuthProvider();

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  const signInAsync = async () => {
    try {
      await signInWithRedirect(auth, provider);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {user ? (
        <Todolist user={user} />
      ) : (
        <div>
          <h1>Todolist</h1>
          <button onClick={signInAsync}>Signin</button>
        </div>
      )}
    </div>
  );
};

export default App;
