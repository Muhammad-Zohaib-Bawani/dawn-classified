"use client";
import React, { useState, useEffect, useRef, useContext } from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Checkbox, Modal } from "antd";
import { img, bike, Home } from "../../assets/photos/index.js";
import Image from "next/image";
import Calender from "../calender/calender";
import RealEstate from "../RealState/realEstate";
import Automobile from "../2Automobiles/automobile";
import Career from "../3careers/career";
import Alert from "../alert/alert";
import Term from "../terms/term";
import { DataContext } from "../context/DataContext";
import { db, setDoc, doc, getDoc } from "../Firebase/Firebase";

export default function Main({ setSelectedDates, selectedDates }) {
  const { locationData, setLocationData, categoryData, setCategoryData } =
    useContext(DataContext);
  // use states
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [city, setCity] = useState(false);
  const [selectedEdition, setSelectedEdition] = useState([]);
  const [text, setText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTermModalOpen, setIsTermModalOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertWord, setAlertWord] = useState();
  const [wordCount, setWordCount] = useState();
  const [warning, setWarning] = useState(false);
  const [wordNumber, setWordNumber] = useState(0);
  const [insertion, setInsertion] = useState();
  const [dollarRate, setDollarRate] = useState([]);
  const [isBold, setIsBold] = useState(false);
  const [calculation, setCalculation] = useState(false);
  const [total, setTotal] = useState(0);
  const [karachi, setKarachi] = useState(0);
  const [lahore, setLahore] = useState(0);
  const [islamabad, setIslamabad] = useState(0);
  const [nationwide, setNationwide] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch location data
      const locationDocRef = doc(db, "dashboard", "Location");
      const locationDocSnap = await getDoc(locationDocRef);
      if (locationDocSnap.exists()) {
        setLocationData(locationDocSnap.data().name || []);
      }
    };
    const fetchCategoryData = async () => {
      const categoryDocRef = doc(db, "dashboard", "Category");
      const categoryDocSnap = await getDoc(categoryDocRef);

      if (categoryDocSnap.exists()) {
        setCategoryData(categoryDocSnap.data().name || []);
      }
    };
    const fetchWordData = async () => {
      try {
        const WordDocRef = doc(db, "dashboard", "Word Count");
        const wordDocSnap = await getDoc(WordDocRef);

        if (wordDocSnap.exists()) {
          const data = wordDocSnap.data();
          console.log(data.name);
          const fetchPrice = async (cityName) => {
            const city = await data.name.find((city) => city.name === cityName);

            return city.price;
          };
          setKarachi(await fetchPrice("karachi"));
          console.log("test", await fetchPrice("karachi"));
          setLahore(await fetchPrice("lahore"));
          setIslamabad(await fetchPrice("Islamabad"));
          setNationwide(islamabad + karachi + lahore);
        }
      } catch (error) {
        console.error("Error fetching word data:", error.message);
      }
    };
    fetchWordData();
    fetchData();
    fetchCategoryData();
  }, []);

  const handleRatesClick = () => {
    window.location.href = "http://classifieds.dawn.com/advertisment-rates";
  };

  const handleGuidelinesClick = () => {
    window.location.href =
      "http://classifieds.dawn.com/advertisment-guidelines";
  };

  // location
  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  // category
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedSubcategory("");
  };

  // sub Category

  const handleSubcategoryChange = (e) => {
    setSelectedSubcategory(e.target.value);
  };

  // Editions

  const handleNationwideChange = (event) => {
    if (event.target.checked) {
      setCity(true);
      setSelectedEdition(["Nationwide"]);
    } else {
      setCity(false);
      setSelectedEdition([]);
    }
  };
  const handleEditionChange = (event) => {
    const newValue = event.target.value;
    if (selectedEdition.includes(newValue)) {
      setSelectedEdition(selectedEdition.filter((item) => item !== newValue));
    } else {
      setSelectedEdition([...selectedEdition, newValue]);
    }
  };

  // bold

  const handleBoldButtonClick = () => {
    setIsBold(!isBold);
  };
  // text area

  const handleTextChange = (event) => {
    setText(event.target.value);
    const words = event.target.value
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0);

    const newWordNumber = words.length;
    console.log("number", newWordNumber);
    setWordNumber(newWordNumber);

    if (newWordNumber >= 20) {
      setWarning(false);
    } else {
      setWarning(true);
    }
  };

  // Modal
  const addDetails = ["REAL ESTATE", "AUTOMOBILES", "CAREERS"];

  const showModal = () => {
    setIsModalOpen(true);
  };
  const showTermModal = () => {
    setIsTermModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleTermCancel = () => {
    setIsTermModalOpen(false);
  };
  // image
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const validFiles = [];

    files.forEach((file) => {
      if (file.size > 1024 * 1024) {
        alert("File size must be less than 1 MB.");
      } else {
        validFiles.push(URL.createObjectURL(file));
      }
    });

    setImages((prevImages) => [...prevImages, ...validFiles]);
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  // Calculate
  console.log("decode----->", nationwide, insertion, wordCount);
  const prices = {
    Karachi: karachi * insertion * wordCount,
    Lahore: lahore * insertion * wordCount,
    Islamabad: islamabad * insertion * wordCount,
    Nationwide: nationwide * insertion * wordCount,
  };

  const handleCalculate = () => {
    if (selectedLocation === "") {
      setAlertWord("Location  is not selected!");
      setShowAlert(false);
      setTimeout(() => setShowAlert(true), 0);
    } else if (selectedCategory === "") {
      setAlertWord("Category  is not selected!");
      setShowAlert(false);
      setTimeout(() => setShowAlert(true), 0);
    } else if (selectedSubcategory === "") {
      setAlertWord("Sub Category  is not selected!");
      setShowAlert(false);
      setTimeout(() => setShowAlert(true), 0);
    } else if (selectedEdition === "") {
      setAlertWord("Edition  is not selected!");
      setShowAlert(false);
      setTimeout(() => setShowAlert(true), 0);
    } else if (text === "") {
      setAlertWord("Please write Content!");
      setShowAlert(false);
      setTimeout(() => setShowAlert(true), 0);
    } else if (selectedDates.size === 0) {
      setAlertWord("Please Select Date!");
      setShowAlert(false);
      setTimeout(() => setShowAlert(true), 0);
    } else {
      setShowAlert(false);
      document
        .getElementById("target-section")
        .scrollIntoView({ behavior: "smooth" });
      setWarning(false);
      setWordCount(wordNumber >= 20 ? wordNumber : "20");
      setInsertion(selectedDates.size);

      setCalculation(true);
      // price calculation
      let newtotal = 0;
      selectedEdition.forEach((value) => {
        console.log("value---->", value);
        console.log("check--", prices[value]);
        newtotal += prices[value];
      });
      setTotal(newtotal);
    }
  };

  // Checkout

  const handleCheckout = () => {
    if (calculation) {
      console.log("calculate kar lia");
    } else {
      setAlertWord("Please Calculate First");
      setTimeout(() => setShowAlert(true), 0);
      setShowAlert(false);
    }
  };
  return (
    <>
      <Alert showAlert={showAlert} alertWord={alertWord} />

      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={600}
      >
        {selectedCategory === "REAL ESTATE" && (
          <RealEstate setIsModalOpen={setIsModalOpen} />
        )}
        {selectedCategory === "AUTOMOBILES" && (
          <Automobile setIsModalOpen={setIsModalOpen} />
        )}
        {selectedCategory === "CAREERS" && (
          <Career setIsModalOpen={setIsModalOpen} />
        )}
      </Modal>

      <div className="container  ">
        <div className="row topbx" style={{ marginTop: "40px" }}>
          <div className="col-lg-4 col-xl-4 col-md-4">
            <h1 className="main-heading">
              START MARKING <br />
              YOUR AD
            </h1>
            <p>
              Advertisement
              <button className="butn" onClick={handleRatesClick}>
                Rates
              </button>
              and
              <button
                className="butn"
                style={{ padding: "5px", margin: "4px" }}
                onClick={handleGuidelinesClick}
              >
                Guidelines
              </button>
            </p>
          </div>
          <div className="col-lg-5 col-xl-5 col-md-5">
            <div className=" heading-list-height">
              <ul>
                <li className="bullet1 ">
                  Ads published in the DAWN National Advertiser will also appear
                  on our website, free of cost.
                </li>
                <li className="bullet1 ">
                  Classifieds must be booked online three (3) working days prior
                  to the date of publication.
                </li>
                <li className="bullet1 ">
                  Ads with bold lettering stand out more (extra charges apply){" "}
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 col-xl-3 col-md-3">
            <div style={{ textAlign: "center" }} className="img-bike">
              <Image
                src={bike}
                alt=""
                className="divider"
                style={{ width: "200px", height: "auto" }}
              />
            </div>
          </div>
        </div>

        <div style={{ marginTop: "10px", fontSize: "12px" }}>
          *Classifieds will not appear in the same way that they do on screen;
          however, the text will remain the same..
        </div>
      </div>
      <div className="container" style={{ marginTop: "30px" }}>
        {/* divider */}
        <div>
          <Image
            src={img}
            alt=""
            className="divider"
            style={{ marginBottom: "30px" }}
          />
        </div>
        {/* form start */}
        <div className="container">
          <div className="row ">
            <div className="col-xl-4  borderright2">
              <div className="row line">
                <label
                  htmlFor="Your_Location"
                  className=" col-sm-12 col-md-4 label"
                >
                  Your Location
                </label>
                <select
                  className=" col-sm-12 col-md-7 select"
                  onChange={handleLocationChange}
                >
                  <option disabled selected hidden>
                    Please select
                  </option>
                  {locationData.map((value, index) => (
                    <option value={value}>{value}</option>
                  ))}
                </select>
              </div>
              <div className="row line">
                <label htmlFor="Category" className=" col-sm-12 col-md-4 label">
                  Category
                </label>
                <select
                  className=" col-sm-12 col-md-7 select"
                  onChange={handleCategoryChange}
                >
                  <option value="" disabled selected hidden>
                    Please select
                  </option>
                  {categoryData.map((item, index) => (
                    <option value={item.name} key={index}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="row line">
                <label
                  htmlFor="SubCategory"
                  className=" col-sm-12 col-md-4 label"
                >
                  SubCategory
                </label>
                <select
                  name="SubCategory"
                  value={selectedSubcategory}
                  onChange={handleSubcategoryChange}
                  id=""
                  className=" col-sm-12 col-md-7 select"
                >
                  <option value="" disabled selected hidden>
                    Please select
                  </option>

                  {selectedCategory &&
                    categoryData
                      .find((category) => category.name === selectedCategory)
                      ?.subcategories.map((subcategory, index) => (
                        <option key={index} value={subcategory}>
                          {subcategory}
                        </option>
                      ))}
                </select>
              </div>
              <div className="row line">
                <label htmlFor="edition" className="col-sm-12 col-md-4 label">
                  Edition(s)
                </label>
                <div className="col-sm-12 col-md-7">
                  <span>
                    <label className="Edition-label">
                      <input
                        type="checkbox"
                        onChange={handleEditionChange}
                        disabled={city}
                        value="Karachi"
                        checked={selectedEdition.includes("Karachi")}
                      />
                      Karachi
                    </label>
                    <label className="Edition-label">
                      <input
                        type="checkbox"
                        onChange={handleEditionChange}
                        disabled={city}
                        value="Lahore"
                        checked={selectedEdition.includes("Lahore")}
                      />
                      Lahore
                    </label>
                    <label className="Edition-label">
                      <input
                        type="checkbox"
                        onChange={handleEditionChange}
                        disabled={city}
                        value="Islamabad"
                        checked={selectedEdition.includes("Islamabad")}
                      />
                      Islamabad
                    </label>
                  </span>
                  <div>
                    <label className="Edition-label">
                      <input
                        type="checkbox"
                        onChange={handleNationwideChange}
                        value="Nationwide"
                        checked={selectedEdition.includes("Nationwide")}
                      />
                      All 3 (Nationwide)
                    </label>
                  </div>
                </div>
              </div>

              <div className="row line">
                <button
                  className="col-3 bold "
                  id={isBold ? "bold" : ""}
                  onClick={handleBoldButtonClick}
                >
                  Bold
                </button>

                <p
                  style={{ lineHeight: "19px" }}
                  className="col-9 para"
                  id="text-area"
                >
                  <b>Ads</b> with bold words standout more to the buyer (Bold
                  words are charged extra)
                </p>
              </div>
              <div className="row line ">
                <div>
                  <textarea
                    onChange={handleTextChange}
                    id="area"
                    // ref={textRef}
                    //contentEditable

                    // style={{
                    //   fontWeight: isBold ? "bold" : "normal",
                    //   border: "1px solid black",
                    //   padding: "10px",
                    // }}
                    // dangerouslySetInnerHTML={{ __html: text }}
                  ></textarea>
                  {warning && (
                    <p
                      style={{
                        color: "#d92929",
                        fontSize: "10px",
                        margin: "0",
                      }}
                    >
                      Minimum 20 words required
                    </p>
                  )}
                </div>
                <p className="advertisement">
                  *Advertisement might not be published as they appear, but the
                  content will remain the same.
                </p>
              </div>
              {selectedCategory && addDetails.includes(selectedCategory) && (
                <div className="row line">
                  <p className=" col-8 advertisement">
                    Takes a minute to add details about your advertisement and
                    increase its chances of success.
                  </p>
                  <div className="col-3">
                    {" "}
                    <button onClick={showModal} className="details">
                      Add Details
                    </button>
                  </div>
                </div>
              )}

              <div className="row line">
                <label className="lastRow">
                  <span>
                    <input type="checkbox" style={{ width: "25px" }} />
                  </span>
                  If you want to keep your contact information private, you can
                  purchase a DAWN Box with DAWN – an extra charge will apply
                </label>
              </div>
            </div>

            <div className="col-xl-4 borderright2 topborder">
              <h5 align="center">INSERTION DATE</h5>

              <div className=" row" align="center">
                <Calender
                  style={{ zIndex: 1, position: "relative" }}
                  selectedDates={selectedDates}
                  setSelectedDates={setSelectedDates}
                />
              </div>
            </div>
            <div className="col-xl-4 topborder">
              <h3
                align="center"
                style={{
                  padding: "30px",
                }}
              >
                Preview
              </h3>
              <div
                style={{ display: "flex", justifyContent: "center" }}
                className="imgbx"
              >
                <div className="add-photo">
                  <Image
                    src={Home}
                    alt="Click to upload"
                    style={{ cursor: "pointer" }}
                    onClick={handleImageClick}
                  />
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      marginTop: "10px",
                    }}
                  >
                    {images.map((image, index) => (
                      <div
                        key={index}
                        style={{
                          position: "relative",
                          width: "60px",
                          height: "60px",
                          margin: "5px",
                          display: "flex",
                        }}
                      >
                        <button
                          onClick={() => handleRemoveImage(index)}
                          className="cross"
                        >
                          x
                        </button>
                        <img
                          src={image}
                          alt="Uploaded"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <textarea
                name=""
                id=""
                value={text}
                readOnly
                className="area"
                style={{ marginTop: "50px", width: "100%" }}
              ></textarea>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "30px",
                }}
              >
                <button
                  align="center"
                  className="mbtn"
                  onClick={handleCalculate}
                >
                  Calculate
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* reciept */}

        <div
          className="container"
          id="target-section"
          style={{ marginTop: "30px", marginBottom: "30px" }}
        >
          <h2 className="heading-hr" alt="www">
            <hr />
            RECEIPT
          </h2>
        </div>

        <div className="container">
          <div
            className="row "
            style={{
              border: "1px dashed #999",
              marginTop: "60px",
              marginBottom: "30px",
            }}
          >
            <div className="col-lg-4 col-md-12 rightborder  ">
              <div className="row mt-10">
                <label htmlFor="boldWord" className=" col-sm-12 col-md-7 label">
                  Bold Word Count*
                </label>
                <input
                  type="text"
                  className=" col-sm-12 col-md-4 recieptInput"
                  disabled="disabled"
                />
              </div>
              <div className="row mt-10">
                <label
                  htmlFor="insertions"
                  className=" col-sm-12 col-md-7 label"
                >
                  Number of Insertions
                </label>
                <input
                  type="text"
                  className=" col-sm-12 col-md-4 recieptInput"
                  disabled="disabled"
                  value={insertion}
                />
              </div>
              <div className="row mt-10">
                <label htmlFor="Stations" className=" col-4 label">
                  Stations
                </label>
                <span className="col-6 ">
                  {selectedEdition &&
                    calculation &&
                    selectedEdition.map((value, index) => (
                      <>
                        <label
                          key={index}
                          className="col-5 label"
                          style={{ fontSize: "10px", fontWeight: "600" }}
                        >
                          {value}
                        </label>
                        <input
                          type="text"
                          className=" col-5 recieptInput"
                          disabled="disabled"
                          style={{ marginBottom: "2px", fontSize: "10px" }}
                          value={prices[value]}
                        />
                      </>
                    ))}
                </span>
              </div>
              <div className="row mt-10 ">
                <label htmlFor="category" className=" col-sm-12 col-md-7 label">
                  Category
                </label>
                <input
                  type="text"
                  className=" col-sm-12 col-md-4 recieptInput"
                  disabled="disabled"
                  value={selectedCategory}
                  style={{ fontSize: "10px  " }}
                />
              </div>
            </div>

            <div className="col-lg-4 col-md-12 rightborder">
              <div className="row mt-10">
                <label htmlFor="Word" className=" col-sm-12 col-md-7 label">
                  Word Count
                </label>
                <input
                  type="text"
                  className=" col-sm-12 col-md-4 recieptInput"
                  disabled="disabled"
                  value={wordCount}
                />
              </div>
              <div className="row mt-10">
                <label htmlFor="boldWord" className=" col-sm-12 col-md-7 label">
                  US Dollar Rate
                </label>
                <input
                  type="text"
                  className=" col-sm-12 col-md-4 recieptInput"
                  disabled="disabled"
                  value={dollarRate}
                />
              </div>
            </div>

            <div className="col-lg-4 col-md-12">
              <div
                className="flex"
                style={{
                  fontSize: "xx-large",
                  fontWeight: "600",
                  marginTop: "60px",
                }}
              >
                <span>Rs.</span>
                <span className="rupee">{total}</span>
              </div>

              <div
                className="row"
                style={{
                  padding: "10px",
                  borderBottom: "1px dashed rgb(153, 153, 153)",
                  borderTop: "1px dashed rgb(153, 153, 153)",
                  margin: "10px",
                }}
              >
                <Checkbox>
                  I Agree to the
                  <a onClick={showTermModal} className="terms">
                    terms and condition
                  </a>
                  <Modal
                    open={isTermModalOpen}
                    onCancel={handleTermCancel}
                    footer={null}
                    width={650}
                  >
                    <Term setIsTermModalOpen={setIsTermModalOpen} />
                  </Modal>
                </Checkbox>
              </div>

              <div className="flex">
                <button className="mbtn downBtn" onClick={handleCheckout}>
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
