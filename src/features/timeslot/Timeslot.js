import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Timeslot.module.css";
import { useNavigate } from "react-router-dom";

const Timeslot = ({ date }) => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thusday",
    "Friday",
    "Saturday",
  ];

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

  const navigate = useNavigate();

  const [timeslots, setTimeslots] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getTimeSlots();
  }, [date]);

  const getTimeSlots = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_URL}/timeslot`);
      if (response.status === 200) {
        const timeslot = [];
        const {
          data: { result },
        } = response;
        for (let i = 0; i < result.length; i++) {
          const hour = Number(result[i].slice(0, 2));
          const mins = Number(result[i].slice(2));
          const newDate = new Date(new Date(date).setHours(hour)).setMinutes(
            mins
          );
          timeslot.push(newDate);
        }
        setTimeslots(timeslot);
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const handleTimeSlotClick = (time) => {
    setSelectedTime(time);
  };

  const handleConfirmTimeSlot = () => {
    navigate(`/${selectedTime}`);
  };

  return (
    <div className={styles.container}>
      <div>
        {days[date.getDay()]}, {monthName[date.getMonth()]} {date.getDate()}
      </div>
      <div>{loading || !timeslots ? "loading..." : null}</div>
      <div className={styles.timeslotContainer}>
        {timeslots?.map((time) => {
          if (selectedTime === time) {
            return (
              <div className="row">
                <div className="col-6">
                  <div
                    key={time}
                    className={styles.timeslot}
                    //   onClick={() => handleTimeSlotClick(time)}
                  >
                    {new Date(time).getHours()}:
                    {new Date(time).getMinutes() === 0
                      ? `00`
                      : new Date(time).getMinutes()}
                  </div>
                </div>
                <div
                  className={`rounded col-6 ${styles.timeslot}`}
                  style={{ backgroundColor: "blue", color: "white" }}
                  onClick={handleConfirmTimeSlot}
                >
                  Confirm
                </div>
              </div>
            );
          }
          return (
            <div
              key={time}
              className={styles.timeslot}
              onClick={() => handleTimeSlotClick(time)}
            >
              {new Date(time).getHours()}:
              {new Date(time).getMinutes() === 0
                ? `00`
                : new Date(time).getMinutes()}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeslot;
