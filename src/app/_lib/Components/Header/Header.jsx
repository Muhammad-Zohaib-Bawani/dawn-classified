"use client";
import React from "react";
import "./header.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Logo } from "../../assets/photos";
import Image from 'next/image'

export default function HeaderApp() {
  return (
    <>
    
      <nav>
       
        <div className=" container nav-container header-child">
          
          <a  href="http://classifieds.dawn.com/">
          <Image src={Logo} alt="Dawn" width={140} height={120} className="imgl"/>
          </a>
          <input type="checkbox" id="bar" />

<label for="bar">
  <div className=" barlines" >
    <div className="bar-line line-1"></div>
    <div className="bar-line line-2"></div>
    <div className="bar-line line-3"></div>
  </div>
</label>
          <ul>
            <li>
              <a href="http://classifieds.dawn.com/contact-us">Contact Us</a>
            </li>
            <li>
              <a href="http://classifieds.dawn.com/advertisment-rates">Advertisment Rates</a>
            </li>
            <li >
              <a href="http://classifieds.dawn.com/advertisment-guidelines">Advertisment Rates</a>
            </li>
           
          </ul>
        </div>

      </nav>
      
    </>
  );
}
