import React, { useRef, useState } from "react";
import "./login.css";
import { Cancel, Room } from "@mui/icons-material";
import axios from "axios";

export default function Login({ setShowLogin, setCurrentUser, myStorage }) {
  const [error, setError] = useState(false);
  const nameRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username: nameRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const res = await axios.post("/users/login", user);
      myStorage.setItem("user", res.data.username);
      setCurrentUser(res.data.username);
      setShowLogin(false);
      setError(false);
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="loginContainer">
      <div className="logo">
        <Room />
        community compass
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="username" ref={nameRef} />

        <input type="password" placeholder="password" ref={passwordRef} />
        <button className="loginBtn">Login</button>

        {error && <span className="failure">Something went wrong.</span>}
      </form>
      <Cancel className="loginCancel" onClick={() => setShowLogin(false)} />
    </div>
  );
}
