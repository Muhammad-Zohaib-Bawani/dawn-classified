import React, { useState, useEffect, useContext } from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { year, price, cities, car } from "../../Common/text";

export default function Automobile({ setIsModalOpen }) {
  // Use State
  const [selectedMake, setSelectedMake] = useState();
  const [selectedModel, setSelectedModel] = useState();

  // Make
  const handleMake = (event) => {
    setSelectedMake(event.target.value);
  };

  // Model
  const handleModel = (event) => {
    setSelectedModel(event.target.value);
  };
  const model = [
    "Mehran",
    "Cultus",
    "Alto",
    "Bolan",
    "Khyber",
    "Aerio",
    "Alto Eco",
    "Alto Lapin",
    "APV",
    "Baleno",
    "Carry",
    "Celerio",
    "Cervo",
    "Ciaz",
    "Escudo",
    "Every",
    "Every Wagon",
    "FX",
    "Gn250",
    "Hustler",
    "Ignis",
    "Jimny",
    "Jimny Sierra",
    "Kei",
    "Kizashi",
    "Landy",
    "Liana",
    "Lj80",
    "Margalla",
    "MR Wagon",
    "Other",
    "Palette",
    "Palette Sw",
    "Potohar",
    "Ravi",
    "Samuari",
    "Sj410",
    "Solio",
    "Solio Bandit",
    "Spacia",
    "Splash",
    "Swift",
    "Sx4",
    "Twin",
    "Vitara",
    "Wagon R",
    "Wagon R Stingray",
  ];
  // Version
  const version = [
    "VX Euro II",
    "VXR Euro II",
    "VX Euro II (CNG)",
    "VXR Euro II (CNG)",
    "VX",
    "VXR",
    "VX (CNG)",
    "VXR (CNG)",
  ];

  // Confirm Button

  const handleConfirm = () => {
    setIsModalOpen(false);
  };
  console.log("car--", car);
  return (
    <>
      <div className="head">
        <h5>AUTOMOBILE</h5>
      </div>
      <div className="container p-4">
        <div className="row">
          <div className="col-md-6 col-sm-12 sideBox">
            <div className="row line mt-2">
              <label className="col-sm-12 col-md-4 rlabel">Make*</label>
              <select
                placeholder="Please select"
                onChange={handleMake}
                className=" col-sm-12 col-md-7 rselect"
              >
                {car.map((make, index) => (
                  <option value={make.make} key={index}>
                    {make.make}
                  </option>
                ))}
              </select>
            </div>
            <div className="row line">
              <label className=" col-sm-12 col-md-4 rlabel">Model*</label>
              <select
                placeholder="Please select"
                className=" col-sm-12 col-md-7 rselect"
                onChange={handleModel}
              >
                {selectedMake &&
                  car
                    .find((make) => make.make === selectedMake)
                    ?.models.map((model, index) => (
                      <option key={index} value={model.model}>
                        {model.model}
                      </option>
                    ))}
              </select>
            </div>
            <div className="row line">
              <label className=" col-sm-12 col-md-4 rlabel">Version</label>
              <select
                placeholder="Please select"
                className=" col-sm-12 col-md-7 rselect"
              >
                {selectedModel &&
                  car
                    .find((make) => make.make === selectedMake)
                    .models.find((model) => model.model === selectedModel)
                    .versions.map((version, index) => (
                      <option key={index} value={version}>
                        {version}
                      </option>
                    ))}
              </select>
            </div>
            <div className="row line">
              <label className=" col-sm-12 col-md-4 rlabel">Year*</label>{" "}
              <select
                placeholder="Please select"
                className=" col-sm-12 col-md-7 rselect"
              >
                {year.map((year, index) => (
                  <option key={index} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <div className="row line">
              <label className=" col-sm-12 col-md-4 rlabel">Purpose*</label>{" "}
              <select
                placeholder="Please select"
                className=" col-sm-12 col-md-7 rselect"
              >
                <option value="forRent">For Rent</option>
                <option value="forSale">For Sale</option>
              </select>
            </div>
            <div className="row line">
              <label className=" col-sm-12 col-md-4 rlabel">
                Registration City*
              </label>
              <select
                placeholder="Please select"
                className=" col-sm-12 col-md-7 rselect"
              >
                {cities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            <div className="row line">
              <label className=" col-sm-12 col-md-4 rlabel">Tax*</label>
              <select
                placeholder="Please select"
                className=" col-sm-12 col-md-7 rselect"
              >
                <option value="Paid">Paid</option>
                <option value="UnPaid">UnPaid</option>
              </select>
            </div>
          </div>
          <div className="col-md-6 col-sm-12 secondBox">
            <div className="row line mt-2">
              <label className=" col-sm-12 col-md-4 rlabel">Millage (KM)</label>
              <input type="number" className=" col-sm-12 col-md-7 rselect" />
            </div>

            <div className="row line">
              <label className=" col-sm-12 col-md-4 rlabel">
                Exterior Color
              </label>
              <input type="text" className=" col-sm-12 col-md-7 rselect" />
            </div>

            <div className="row line">
              <label className=" col-sm-12 col-md-4 rlabel">Engine Type</label>
              <select
                placeholder="Please select"
                className=" col-sm-12 col-md-7 rselect"
              >
                <option value="petrol">Petrol</option>
                <option value="hybrid">Hybrid</option>
                <option value="diesel">Diesel</option>
                <option value="cng">CNG</option>
                <option value="lpg">LPG</option>
              </select>
            </div>
            <div className="row line">
              <label className=" col-sm-12 col-md-4 rlabel">Engine CC</label>
              <input type="number" className=" col-sm-12 col-md-7 rselect" />
            </div>
            <div className="row line">
              <label className=" col-sm-12 col-md-4 rlabel">Transmission</label>
              <select
                placeholder="Please select"
                className=" col-sm-12 col-md-7 rselect"
              >
                <option value="manual">Manual</option>
                <option value="automatic">Automatic</option>
              </select>
            </div>

            <div className="row line">
              <label className=" col-sm-12 col-md-4 rlabel">Price Range</label>
              <select
                placeholder="Please select"
                className=" col-sm-12 col-md-7 rselect"
              >
                {price.map((price, index) => (
                  <option value={price} key={index}>
                    {price}
                  </option>
                ))}
              </select>
            </div>

            <div className="row line">
              <label className=" col-sm-12 col-md-4 rlabel">City</label>{" "}
              <select
                placeholder="Please select"
                className=" col-sm-12 col-md-7 rselect"
              >
                {cities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <p>
                <span>
                  <b>Features:</b>
                  <span style={{ margin: "8px" }}>
                    <label for="chk_Abs" className="rlabel">
                      ABS
                    </label>
                    <input type="checkbox" name="chk_Abs" />
                  </span>
                  <span style={{ margin: "8px" }}>
                    <label for="chkAirBag" className="rlabel">
                      Air Bags
                    </label>
                  </span>
                  <input type="checkbox" name="chkAirBag" />
                </span>
                <span style={{ margin: "8px" }}>
                  <label for="chk_ac" className="rlabel">
                    A/C{" "}
                  </label>
                  <input type="checkbox" name="chk_ac" />
                </span>
                <span style={{ margin: "8px" }}>
                  <label for="chk_cp" className="rlabel">
                    Casette Player
                  </label>
                  <input type="checkbox" name="chk_cp" />
                </span>
                <span style={{ margin: "8px" }}>
                  <label for="chk_cd" className="rlabel">
                    CD Player
                  </label>
                  <input type="checkbox" name="chk_cd" />
                </span>
                <span style={{ margin: "8px" }}>
                  <label for="chk_ke" className="rlabel">
                    Keyless Entry
                  </label>
                  <input type="checkbox" name="chk_ke" />
                </span>
                <span style={{ margin: "8px" }}>
                  <label for="chk_Pl" className="rlabel">
                    Power Locks
                  </label>
                  <input type="checkbox" name="chk_Pl" />
                </span>
                <span style={{ margin: "8px" }}>
                  <label className="rlabel" for="chk_pw">
                    Power Windows
                  </label>
                  <input type="checkbox" name="chk_pw" />
                </span>
                <span style={{ margin: "8px" }}>
                  <label for="chk_sr" className="rlabel">
                    Sun Roof
                  </label>
                  <input type="checkbox" name="chk_sr" />
                </span>
                <span style={{ margin: "8px" }}>
                  <label for="chk_ns" className="rlabel">
                    Navigation System
                  </label>
                  <input type="checkbox" name="chk_ns" />
                </span>
                <span style={{ margin: "6px" }}>
                  <label for="chk_ns" className="rlabel">
                    Camera
                  </label>
                  <input type="checkbox" name="chk_camera" />
                </span>
                <span style={{ margin: "2px" }}>
                  <label for="chk_ns" className="rlabel">
                    LED Screen
                  </label>
                  <input type="checkbox" name="chk_led" />
                </span>
              </p>
            </div>
            <div className="row line">
              <label className=" col-sm-12 col-md-2 rlabel">Others</label>
              <textarea
                name=""
                className=" col-sm-12 col-md-10 rselect"
                style={{ height: 50 }}
              ></textarea>
            </div>
            <hr />
            <div className="row">
              <p className="col-10 fsize">
                Disclaimer NIC verification will be mandatory for all ads before
                being published
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
      </div>
    </>
  );
}
