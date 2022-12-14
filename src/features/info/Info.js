import React from "react";
import Styles from "./Info.module.css";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ClockFill,
  CameraVideoFill,
  CalendarDate,
} from "react-bootstrap-icons";

const Info = ({ time }) => {
  const monthName = [
    "January",
    "Feburary",
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
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thusday",
    "Friday",
    "Saturday",
  ];

  const navigate = useNavigate();

  const addExtraZero = (item) => {
    if (String(item).length < 2) {
      return "0" + String(item);
    } else return String(item);
  };
  const getTimeString = () => {
    const timeNum = Number(time);
    let month = monthName[new Date(timeNum).getMonth()];
    let day = days[new Date(timeNum).getDay()];
    let date = new Date(timeNum).getDate();
    let year = new Date(timeNum).getFullYear();
    let hours = new Date(timeNum).getHours();
    let minutes = new Date(timeNum).getMinutes();
    let toHours, toMinutes;
    if (minutes === 30) {
      toHours = hours + 1;
      toMinutes = 0;
    } else {
      toHours = hours;
      toMinutes = 30;
    }
    return `${addExtraZero(hours)}:${addExtraZero(minutes)} - ${addExtraZero(
      toHours
    )}:${addExtraZero(toMinutes)}, ${day}, ${month} ${date}, ${year}`;
  };

  return (
    <div>
      <div className={Styles.userInfo}>
        <div className={Styles.backArrowButton} onClick={() => navigate("/")}>
          <ArrowLeft className="pb-1" />
        </div>
        <div className={Styles.userDetails}>
          <div className={Styles.username}>Sudharshan Karthik V</div>
          <div className={Styles.meetingName}>Meeting with RevenueHero</div>
        </div>
      </div>
      <div className={`${Styles.username} ${Styles.infoMargin}`}>
        <ClockFill className="me-2" /> 30 min
      </div>
      <div className={`${Styles.username} ${Styles.infoMargin} d-flex`}>
        <div>
          <CameraVideoFill className="me-3" />
        </div>
        <div>Web conferencing details provided upon confirmation.</div>
      </div>
      {time ? (
        <div className={`${Styles.username} ${Styles.infoMargin} d-flex`}>
          <div>
            <CalendarDate />
          </div>{" "}
          <div className="ms-3">{getTimeString()}</div>
        </div>
      ) : null}
    </div>
  );
};

export default Info;
