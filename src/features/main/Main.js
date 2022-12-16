import React, { useEffect, useState, Suspense } from "react";
import DateTime from "../datetime/DateTime";
import Info from "../info/Info";
import Styles from "./Main.module.css";

const Timeslot = React.lazy(() => import("../timeslot/Timeslot"));

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
          <Suspense fallback={<div>Loading...</div>}>
            <Timeslot date={date} />
          </Suspense>
        </div>
      ) : null}
    </div>
  );
};

export default Main;
