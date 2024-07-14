"use client";
import React, { useState } from "react";
import { country, Numbers } from "../../Common/text";
import "./Reciept.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Receipt() {
  // states
  const [name, setName] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [identity, setIdentity] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [number, setNumber] = useState("");

  // Name
  const handleName = (e) => {
    setName(e.target.value);
  };
  // Country
  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };
  //  Identity
  const handleIdentity = (event) => {
    setIdentity(event.target.value);
  };
  // City
  const handleCity = (e) => {
    setCity(e.target.value);
  };
  // Adress
  const handleAddress = (e) => {
    setAddress(e.target.value);
  };
  // Moile Number code
  const handleCode = (event) => {
    const selectedCode = event.target.value;

    setCountryCode(selectedCode);
    setNumber("");
  };

  // Mobile Number
  const handleNumber = (e) => {
    console.log(e.target.value);
    const { value } = e.target;
    setNumber(value);
  };

  return (
    <div className="container">
      <div
        className="row col-lg-6 sec1"
        style={{ float: "none", margin: "0 auto" }}
        align="center"
      >
        <div className="col-lg-12 mt-3">
          <div className="form-group row ">
            <label htmlFor="txtName" className="col-sm-4 col-form-label label">
              Name*
            </label>
            <div className="col-sm-8">
              <input
                onChange={handleName}
                type="text"
                maxLength="20"
                className="form-control form-control-sm"
              />
            </div>
          </div>
        </div>
        <div className="col-lg-12 mt-3 ">
          <div className="form-group row ">
            <label htmlFor="txtNic" className="col-sm-4 col-form-label label">
              NIC/Passport Number*
            </label>

            <div className="col-sm-8 row" style={{ marginLeft: "2px" }}>
              <span className="col-sm-4" style={{ paddingLeft: "0px" }}>
                <select
                  className="custom-form form-control-sm "
                  onChange={handleCountryChange}
                  value={selectedCountry}
                  style={{ marginBottom: "10px" }}
                >
                  <option selected className="option">
                    Country
                  </option>
                  {country.map((item, index) => (
                    <option key={index} value={item} className="option">
                      {item}
                    </option>
                  ))}
                </select>
              </span>
              <span className="col-sm-4" style={{ paddingLeft: "0px" }}>
                <select
                  className="col-sm-4 custom-form form-control-sm "
                  onChange={handleIdentity}
                  value={identity}
                  style={{ marginBottom: "10px" }}
                >
                  <option selected hidden>
                    Identity
                  </option>
                  <option value="passport-number">Passport Number</option>
                  <option value=" NIC">Identity Card Number</option>
                </select>
              </span>
              <span
                className="col-sm-4"
                style={{ paddingLeft: "0px", paddingRight: "0px" }}
              >
                <input
                  name="txtNic"
                  type="text"
                  maxLength="15"
                  className="form-control option"
                  style={{
                    marginBottom: "10px",
                    height: "35px",
                    marginRight: "9px",
                  }}
                />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div
        className="row col-lg-6 sec1"
        style={{ float: "none", margin: "0 auto" }}
        align="center"
      >
        <br />
        <div className="col-lg-12">
          <div className="form-group row mt-3">
            <label htmlFor="txtCity" className="col-sm-4 col-form-label label">
              City*
            </label>
            <div className="col-sm-8">
              <input
                onChange={handleCity}
                type="text"
                maxLength="18"
                className="form-control form-control-sm"
              />
            </div>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="form-group row mt-2">
            <label
              htmlFor="txtCountry"
              className="col-sm-4 col-form-label label"
            >
              Country*
            </label>
            <div className="col-sm-8">
              <input
                name="txtCountry"
                type="text"
                maxLength="18"
                className="form-control form-control-sm"
              />
            </div>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="form-group row mt-2">
            <label
              htmlFor="txtAddress"
              className="col-sm-4 col-form-label label"
            >
              Address*
            </label>
            <div className="col-sm-8">
              <input
                name="txtAddress"
                onChange={handleAddress}
                type="text"
                maxLength="25"
                className="form-control form-control-sm"
              />
              <span id="lblAddress" style={{ color: "Red" }}></span>
            </div>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="form-group row mt-2 mb-3">
            <label
              htmlFor="txtRegion"
              className="col-sm-4 col-form-label label"
            >
              Region*
            </label>
            <div className="col-sm-8">
              <input
                type="text"
                disabled
                className="aspNetDisabled form-control form-control-sm"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className="row col-lg-6 sec1"
        style={{ float: "none", margin: "0 auto" }}
        align="center"
      >
        <br />
        <div className="col-lg-12">
          <div className="form-group row mt-3">
            <label
              htmlFor="txtMobile"
              className="col-sm-4 col-form-label label"
            >
              Mobile
            </label>

            <div className="col-sm-8 row " style={{ marginLeft: "2px" }}>
              <div className="col-sm-4" style={{ paddingLeft: "0px" }}>
                <select
                  onChange={handleCode}
                
                  className="col-sm-4 custom-form form-control-sm"
                  style={{ marginBottom: "10px" }}
                >
                  <option selected hidden>
                    Select Country
                  </option>

                  {Numbers.map((i) => (
                    <option value={i.code}>
                      {i.country} {i.code}
                    </option>
                  ))}
                </select>
              </div>
              <span className="col-sm-8">
                <input
                  type="text"
                  name="phone"
                  value={countryCode}
                  onChange={(e) =>
                    setCountryCode(e.target.value)
                  }
                  className="col-sm-4 form-control form-control-sm"
                  required
                />
              </span>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="email" className="col-sm-4">
              Email*
            </label>
            <div className=" col-sm-8">
              <input
                type="email"
                className="form-control form-control-sm option"
                required
              />
            </div>
          </div>
          <div className="row">
            <label className="option mt-3 mb-3">
              <input type="checkbox" className="checkbox" />I Agree to the terms
              and conditions
            </label>
          </div>
          <button className="mbtn">Confirm</button>
        </div>
      </div>
    </div>
  );
}
