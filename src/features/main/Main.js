import React, { useEffect, useState } from "react";
import DateTime from "../datetime/DateTime";
import Info from "../info/Info";
import Timeslot from "../timeslot/Timeslot";
import Styles from "./Main.module.css";

const Main = () => {
  const [date, setDate] = useState(null);
  const [customContainer, setCustomContainer] = useState({
    border: "1px solid lightgray",
    maxWidth: "820px",
    height: "85vh",
    margin: "auto",
    marginTop: "10vh",
    borderRadius: "10px",
    display: "grid",
    gridTemplateColumns: "45% 55%",
  });

  useEffect(() => {
    if (date) {
      setCustomContainer((prev) => {
        return {
          ...prev,
          gridTemplateColumns: "35% 40% 25%",
          maxWidth: "1100px",
        };
      });
    }
  }, [date]);
  return (
    <div className={`shadow`} style={customContainer}>
      <div className={Styles.containerItem}>
        <Info />
      </div>
      <div>
        <DateTime setDate={setDate} />
      </div>
      {date ? (
        <div>
          <Timeslot date={date} />
        </div>
      ) : null}
    </div>
  );
};

export default Main;
