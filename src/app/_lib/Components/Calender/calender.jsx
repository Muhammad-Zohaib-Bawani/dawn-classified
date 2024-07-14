import React, { useState, useEffect } from "react";
import "./calender.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { MdCancel } from "react-icons/md";
import zIndex from "@mui/material/styles/zIndex";

export default function Calender({ setSelectedDates, selectedDates }) {
  const today = new Date();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  useEffect(() => {
    // This effect runs on mount and when currentMonth or currentYear changes.
  }, [currentMonth, currentYear]);

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleDateClick = (date) => {
    const dateKey = `${currentYear}-${currentMonth}-${date}`;
    const newSelectedDates = new Set(selectedDates);

    if (newSelectedDates.has(dateKey)) {
      newSelectedDates.delete(dateKey);
    } else {
      newSelectedDates.add(dateKey);
    }

    setSelectedDates(newSelectedDates);
    console.log(
      `Selected date: ${monthNames[currentMonth]} ${date}, ${currentYear}`
    );
  };

  const handleRemoveDate = (dateKey) => {
    const newSelectedDates = new Set(selectedDates);
    newSelectedDates.delete(dateKey);
    setSelectedDates(newSelectedDates);
  };

  const isDateBlurred = (date) => {
    const currentDate = new Date(currentYear, currentMonth, date);
    const todayDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const diffTime = currentDate - todayDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays < 0 || (diffDays >= 0 && diffDays <= 2);
  };

  return (
    <>
      <div className="p-4 max-w-md mx-auto" style={{ zIndex: "-999" }}>
        <div className="flex justify-between items-center topDate">
          <button onClick={handlePrevMonth} className="text-500 prev">
            ◄
          </button>
          <div className="text-500 date">
            <span>{monthNames[currentMonth]}</span> <span>{currentYear}</span>
          </div>
          <button onClick={handleNextMonth} className="text-500 next">
            ►
          </button>
        </div>

        <div className="grid grid-cols-7 text-center text-zinc-500  week">
          <div className="dateBox colr">Sun</div>
          <div className="dateBox colr">Mon</div>
          <div className="dateBox colr">Tue</div>
          <div className="dateBox colr">Wed</div>
          <div className="dateBox colr">Thu</div>
          <div className="dateBox colr">Fri</div>
          <div className="dateBox colr">Sat</div>
        </div>

        <div className="grid grid-cols-7 text-center">
          {[...Array(firstDay)].map((_, index) => {
            const prevMonthLastDate = new Date(
              currentYear,
              currentMonth,
              0
            ).getDate();
            const date = prevMonthLastDate - firstDay + index + 1;
            return (
              <div
                key={`prev-month-${index}`}
                className=" text-gray-400 blurred dateBox "
                title="Not available"
              >
                {date}
              </div>
            );
          })}

          {[...Array(daysInMonth)].map((_, date) => {
            const actualDate = date + 1;
            const dateKey = `${currentYear}-${currentMonth}-${actualDate}`;
            const isSelected = selectedDates.has(dateKey);
            const isToday =
              actualDate === today.getDate() &&
              currentMonth === today.getMonth() &&
              currentYear === today.getFullYear();
            const isBlurred = isDateBlurred(actualDate);

            return (
              <div
                key={actualDate}
                className={`dateBox  cursor-pointer ${
                  isBlurred ? "blurred" : ""
                } ${isSelected ? "bg-yellow-300" : ""} ${
                  isToday ? "border border-yellow-500" : ""
                }`}
                onClick={
                  !isBlurred ? () => handleDateClick(actualDate) : undefined
                }
                title={isBlurred ? "Not available" : ""}
              >
                {actualDate}
              </div>
            );
          })}

          {[...Array(7 - ((firstDay + daysInMonth) % 7))].map((_, index) => {
            return (
              <div
                key={`next-month-${index}`}
                className="p-2 text-gray-400 dateBox "
              >
                {index + 1}
              </div>
            );
          })}
        </div>

        {/* <div className="selection-box">{} <i class="fa fa-times" aria-hidden="true"></i></div> */}
        <div className="container">
          {" "}
          <div className="row">
            {[...selectedDates].map((dateKey) => {
              const [year, month, day] = dateKey.split("-");
              return (
                <div key={dateKey} className="col-4 selection-box">
                  {`${monthNames[parseInt(month)]} ${day}, ${year}`}
                  <MdCancel
                    aria-hidden="true"
                    className="cut"
                    onClick={() => handleRemoveDate(dateKey)}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div className="row top">
          <p className="col-8">Number of Insertions </p>
          <button className="col-2 Insertions">{selectedDates.size}</button>
        </div>
      </div>
    </>
  );
}
