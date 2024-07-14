import React, { useEffect, useContext } from "react";
import "./careers.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, DatePicker, Space, theme } from "antd";
import {
  Area,
  department,
  experience,
  education,
  data,
} from "../../Common/text";
import { DataContext } from "../context/DataContext";

export default function Career({ setIsModalOpen }) {
  const { cityData, setCityData } = useContext(DataContext);
  useEffect(() => {
    const fetchCityData = async () => {
      try {
        const cityDocRef = doc(db, "dashboard", "Cities");
        const cityDocSnap = await getDoc(cityDocRef);
        if (cityDocSnap.exists()) {
          const cityDataFromDB = cityDocSnap.data().name;
          if (Array.isArray(cityDataFromDB)) {
            setCityData(cityDataFromDB);
          }
        }
      } catch (error) {
        console.error("Error fetching city data:", error);
      }
    };
    fetchCityData();
  }, []);
  // functional area

  // date picker
  const { token } = theme.useToken();
  const style = {
    border: `1px solid ${token.colorPrimary}`,
    borderRadius: "50%",
  };
  const cellRender = (current, info) => {
    if (info.type !== "date") {
      return info.originNode;
    }
    if (typeof current === "number" || typeof current === "string") {
      return <div className="ant-picker-cell-inner">{current}</div>;
    }
    return (
      <div
        className="ant-picker-cell-inner"
        style={current.date() === 1 ? style : {}}
      >
        {current.date()}
      </div>
    );
  };
  // confirm button
  const handleConfirm = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div className="head">
        <h5>JOBS POSTING</h5>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="row mt">
              <label className="col-sm-12 col-md-5">Keyword / Title</label>
              <input type="text" className="col-sm-12 col-md-6 input" />
            </div>
            <div className=" mt">
              <label for="jobType" className="col-sm-12 col-md-5">
                Job Type
              </label>
              <select name="jobType" className="col-sm-12 col-md-6">
                <option value="" disabled selected hidden>
                  Please select
                </option>
                <option value="permanent">Permanent</option>
                <option value="contractual">Contractual</option>
                <option value="freelance">Freelance</option>
              </select>
            </div>

            <div className="row mt">
              <label for="Functional Area" className="col-sm-12 col-md-5">
                Functional Area
              </label>
              <select name="jobType" className="col-sm-12 col-md-6">
                <option value="" disabled selected hidden>
                  Please select
                </option>
                {Area.map((area, index) => (
                  <option value={area} key={index}>
                    {area}
                  </option>
                ))}
              </select>
            </div>

            <div className="row mt">
              <label for="Department" className="col-sm-12 col-md-5">
                Department
              </label>
              <select name="Department" className="col-sm-12 col-md-6">
                <option value="" disabled selected hidden>
                  Please select
                </option>
                {department.map((department, index) => (
                  <option key={index} value={department}>
                    {department}
                  </option>
                ))}
              </select>
            </div>
            <div className="row mt">
              <label for="skills  " className="col-sm-12 col-md-5">
                Skills*
              </label>
              <input type="text" className="col-sm-12 col-md-6 input" />
            </div>
          </div>
          <div className="col-md-4">
            <div className="row mt">
              <label for="Carrer Level*" className="col-sm-12 col-md-5">
                Carrer Level*
              </label>
              <select name="Carrer Level*" className="col-sm-12 col-md-6">
                <option value="" disabled selected hidden>
                  Please select
                </option>
                {data.map((value, index) => (
                  <option value="value" key={index}>
                    {value}
                  </option>
                ))}
              </select>
            </div>

            <div className="row mt">
              <label for="Minimum Experience" className="col-sm-12 col-md-5">
                Minimum Experience
              </label>
              <select name="Minimum Experience" className="col-sm-12 col-md-6">
                <option value="" disabled selected hidden>
                  Please select
                </option>
                {experience.map((value, index) => (
                  <option value="value" key={index}>
                    {value}
                  </option>
                ))}
              </select>
            </div>

            <div className="row mt">
              <label for="Minimum Salary*" className="col-sm-12 col-md-5">
                Minimum Salary*
              </label>
              <input type="number" className="col-sm-12 col-md-6 input" />
            </div>

            <div className="row mt">
              <label for="Education" className="col-sm-12 col-md-5">
                Education
              </label>
              <select name="Education " className="col-sm-12 col-md-6">
                <option value="" disabled selected hidden>
                  Please select
                </option>
                {education.map((value, index) => (
                  <option value="value" key={index}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <div className="row mt">
              <label for="city" className="col-sm-12 col-md-5">
                City*
              </label>
              <select name="city " className="col-sm-12 col-md-6">
                <option value="" disabled selected hidden>
                  Please select
                </option>
                {cityData.map((value, index) => (
                  <option value="value" key={index}>
                    {value}
                  </option>
                ))}
              </select>
            </div>

            <div className="row mt">
              <label for="gender" className="col-sm-12 col-md-5">
                Gender
              </label>
              <select name="gender " className="col-sm-12 col-md-6">
                <option value="" disabled selected hidden>
                  Please select
                </option>
                <option value="Male   ">Male</option>
                <option value="Female">Female</option>
                <option value="Both">Both</option>
              </select>
            </div>
          </div>
          <div className="col-md-4">
            <div className="row mt">
              <label for="shift" className="col-sm-12 col-md-4">
                Shift
              </label>

              <select name="shift" className="col-sm-12 col-md-6">
                <option value="" disabled selected hidden>
                  Please select
                </option>
                <option value="Morning">Morning</option>
                <option value="Evening">Evening</option>
                <option value="Night">Night</option>
                <option value="Rotation">Rotation</option>
              </select>
            </div>
            <label for="Last Date to apply*">Last Date to apply*City*</label>
            <Space size={12} direction="vertical">
              <DatePicker cellRender={cellRender} />
            </Space>
          </div>
        </div>
        <div className="row">
          <label htmlFor="Summary Text*">Summary Text*</label>
          <div className="d-flex">
            <textarea className="textarea"></textarea>
          </div>
        </div>
        <hr style={{ marginTop: "15px", marginBottom: "15px" }} />
        <div className="row">
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
    </>
  );
}
