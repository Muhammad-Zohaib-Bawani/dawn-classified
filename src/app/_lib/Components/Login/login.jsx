"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Logo } from "../../assets/photos";
import "./login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { signInWithEmailAndPassword, auth } from "../Firebase/Firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from 'next/navigation';
import Loader from "../Loader/Loader";

export default function Demo() {
  
  const router = useRouter()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);


  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClick = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        router.push('/dashboard')        
        setLoading(false);
            })
      .catch((error) => {
        console.log(error)
        setLoading(false);
        alert("login fail");
       
      });
    
  };
 
  return (
    <>
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div
        className="bg-white p-4 rounded-lg shadow-lg"
        style={{ maxWidth: "24rem", width: "100%" }}
      >
        <div className="text-center mb-4">
          <Image
            src={Logo}
            alt="Dawn"
            width={140}
            height={120}
            className="mx-auto my-4"
          />
          

          {/* <h2 className="h4 font-weight-semibold text-dark">
            
            <span className="font-weight-bold">Login</span>
          </h2> */}
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label text-dark">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            onChange={handleEmailChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="form-label text-dark">
            Password
          </label>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="form-control"
              value={password}
              onChange={handlePasswordChange}
              required
              style={{ boxShadow : "none !important "}}
            />
            <button
              type="button"
              className="btn btn-outline-secondary input-group-text"
              onClick={handleTogglePassword}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="mbtn btn w-100"
          onClick={handleClick}
          style={{ backgroundColor: "#ffe305", color: "#333" , width: 40 }}
          loading={loading}
        >
        {loading ? <Loader /> : 'LOG IN'}  
        </button>
      </div>
    </div>
    </>
  );
}
