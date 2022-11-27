import React, { useEffect, useState } from "react";
import styles from "./DateTime.module.css";

const DateTime = ({ setDate }) => {
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
  const dayName = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const [firstDay, setFirstDay] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1).getDay()
  );
  const [lastDay, setLastDay] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate()
  );
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [pointer, setPointer] = useState(0);

  useEffect(() => {
    // setCurrentMonth(new Date(new Date().));
    setLastDay(
      new Date(
        new Date().getFullYear(),
        (new Date().getMonth() + 1 + pointer) % 12,
        0
      ).getDate()
    );
    setFirstDay(
      new Date(
        new Date().getFullYear() +
          Math.floor((new Date().getMonth() + pointer) / 12),
        (new Date().getMonth() + pointer) % 12,
        1
      ).getDay()
    );
    setCurrentMonth((new Date().getMonth() + pointer) % 12);
    setCurrentYear(
      new Date().getFullYear() +
        Math.floor((new Date().getMonth() + pointer) / 12)
    );
  }, [pointer]);

  const handlePrevButton = () => {
    if (pointer === 0) {
      return;
    }
    setPointer((prev) => prev - 1);
  };

  const handleNextButton = () => {
    if (pointer > 2) {
      return;
    }
    setPointer((prev) => prev + 1);
  };

  const getEmptyDays = (firstDay) => {
    const emptyDays = [];
    if (firstDay === 0) {
      firstDay = 7;
    }
    for (let i = 1; i < firstDay; i++) {
      emptyDays.push(<div></div>);
    }
    return emptyDays;
  };

  const getAllDays = (lastDay) => {
    const disableStyle = {
      color: "gray",
    };
    const enableStyle = {
      color: "blue",
      fontWeight: 700,
      borderRadius: "50%",
      backgroundColor: "#EEF5FF",
      cursor: "pointer",
    };
    const days = [];
    const currentDay = new Date().getDate();
    for (let i = 1; i <= lastDay; i++) {
      if (
        i <= currentDay &&
        currentMonth <= new Date().getMonth() &&
        currentYear <= new Date().getFullYear()
      ) {
        days.push(
          <div className="my-3 px-2 py-1" style={disableStyle}>
            {i}
          </div>
        );
      } else {
        days.push(
          <div
            className="my-3  px-2 py-1"
            style={enableStyle}
            onClick={() => getTimeSlot(i)}
          >
            {i}
          </div>
        );
      }
    }
    return days;
  };

  const getTimeSlot = (date) => {
    setDate(new Date(currentYear, currentMonth, date));
  };

  return (
    <div className={styles.container}>
      <div className={styles.dateHead}>Select a Date & Time</div>
      <div className={styles.monthNavigator}>
        <div>
          {monthName[currentMonth]} {currentYear}
        </div>
        <div className={styles.monthNavigatorButton}>
          <span
            className={styles.navigatorButton}
            style={pointer === 0 ? { color: "gray" } : { color: "blue" }}
            onClick={handlePrevButton}
          >
            {"<"}
          </span>
          <span
            className={styles.navigatorButton}
            style={
              pointer === 0 && pointer < 3
                ? { color: "blue" }
                : { color: "gray" }
            }
            onClick={handleNextButton}
          >
            {">"}
          </span>
        </div>
      </div>
      <div className={`${styles.gridContainer}`}>
        {dayName.map((day) => (
          <div className={`${styles.days}`}>{day}</div>
        ))}
        {getEmptyDays(firstDay)}
        {getAllDays(lastDay)}
      </div>
    </div>
  );
};

export default DateTime;
