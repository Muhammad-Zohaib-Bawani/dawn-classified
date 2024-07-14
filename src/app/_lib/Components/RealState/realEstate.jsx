import React, { useEffect, useState, useContext } from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { options, location, cities } from "../../Common/text";

export default function RealEstate({ setIsModalOpen }) {
  // states
  const [selectedSection, setSelectedSection] = useState();
  const [selectedPropertyType, setSelectedPropertyType] = useState();
  const [selectedPropertyDetail, setSelectedPropertyDetail] = useState();
  const [selectedCity, setSelectedCity] = useState();
  const [selectedLocation, setSelectedLocation] = useState();

  // section
  const handleSectionChange = (value) => {
    setSelectedSection(value);
  };
  // property type
  const handlePropertyTypeChange = (event) => {
    setSelectedPropertyType(event.target.value);
    setSelectedPropertyDetail("");
  };
  // property details
  const handlePropertyDetailChange = (event) => {
    setSelectedPropertyDetail(event.target.value);
  };

  // cities

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
    setSelectedLocation("");
  };

  // location
  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  // Confirm Button

  const handleConfirm = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="head">
        <h5>REAL ESTATE</h5>
      </div>
      <div className="container">
        <div className="row p-3">
          <div className="col-md-6 col-sm-12 sideBox">
            {/* // form start */}

            <div className="row line">
              <label htmlFor="" className=" col-sm-12 col-md-4 rlabel">
                Section*
              </label>
              <select
                className=" col-sm-12 col-md-7 rselect"
                onChange={handleSectionChange}
                placeholder="Please Select"
              >
                <option disabled selected hidden>
                  Please select
                </option>
                <option value="Rent">Rent</option>
                <option value="Sale">Sale</option>
                <option value="Wanted">Wanted</option>
              </select>
            </div>

            <div className="row line">
              <label htmlFor="" className=" col-sm-12 col-md-4 rlabel">
                Property Type*
              </label>

              <select
                placeholder="Please Select"
                onChange={handlePropertyTypeChange}
                className=" col-sm-12 col-md-7 rselect"
              >
                <option value="property">Property</option>
                <option value="plot">Plots</option>
                <option value="commercial">Commercial</option>
              </select>
            </div>
            <div className="row line">
              <label htmlFor="" className=" col-sm-12 col-md-4 rlabel">
                Property Detail
              </label>

              <select
                placeholder="Please Select"
                onChange={handlePropertyDetailChange}
                className=" col-sm-12 col-md-7 rselect"
              >
                <option disabled selected hidden>
                  Please select
                </option>
                {selectedPropertyType &&
                  options
                    .find((option) => option.name === selectedPropertyType)
                    ?.subOptions.map((suboption, index) => (
                      <option key={index} value={suboption}>
                        {suboption}
                      </option>
                    ))}
              </select>
            </div>
            <div className="row line">
              <label htmlFor="" className=" col-sm-12 col-md-4 rlabel">
                City
              </label>
              <select
                placeholder="Please Select"
                onChange={handleCityChange}
                className=" col-sm-12 col-md-7 rselect"
              >
                <option disabled selected hidden>
                  Please select
                </option>
                {cities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
            <div className="row line">
              <label htmlFor="" className=" col-sm-12 col-md-4 rlabel">
                Location*
              </label>
              <select
                placeholder="Please Select"
                onChange={handleLocationChange}
                className=" col-sm-12 col-md-7 rselect"
              >
                <option disabled selected hidden>
                  Please select
                </option>
                {selectedCity &&
                  location
                    .find((location) => location.name === selectedCity)
                    ?.sublocation.map((sublocation, index) => (
                      <option key={index} value={sublocation}>
                        {sublocation}
                      </option>
                    ))}
              </select>
            </div>
          </div>
          <div className="col-md-6 col-sm-12 secondBox">
            <div className="row">
              <label htmlFor="size" className="col-3 rlabel">
                Size*
              </label>
              <input type="number" className="number col-4 " />

              <select
                className="col-4"
                style={{
                  background: "#f2f0f0",
                  borderRadius: "10px",
                  marginLeft: "10px",
                }}
              >
                <option value="sf">Square feets</option>
                <option value="sy">Square Yards</option>
                <option value="sm">Square Meters</option>
                <option value="canal">Canal</option>
                <option value="marla">Marla</option>
                <option value="acre">Acre</option>
              </select>
            </div>
            <div className="row">
              {" "}
              <label htmlFor="bathroom" className="rlabel col-4 mt">
                Bathrooms*
              </label>
              <input type="number" className="number col-4 mt" required />
            </div>
            <div className="row">
              {" "}
              <label htmlFor="bedroom" className="rlabel col-4 mt">
                Bedrooms*
              </label>
              <input type="number" className="number col-4 mt" required />
            </div>
            <div className="row">
              {" "}
              <label htmlFor="price" className="rlabel col-4 mt">
                *Price
              </label>
              <input type="number" className="number col-4 mt" required />
            </div>
          </div>
          <div style={{ margin: "15px" }} className="row">
            <p className="col-10 fsize">
              Disclaimer NIC verification for all ads and posts the photographs
              will go through a vetting process before being published
            </p>

            <button
              onClick={handleConfirm}
              htmlType="submit"
              className="cbtn col-2"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
