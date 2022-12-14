import React, { Suspense } from "react";
import { useParams } from "react-router-dom";
import Info from "../info/Info";

const ConfirmationDetails = React.lazy(() =>
  import("./components/ConfirmationDetails")
);

const Confirmation = () => {
  const { time } = useParams();

  const customContainer = {
    border: "1px solid lightgray",
    maxWidth: "1000px",
    height: "85vh",
    margin: "auto",
    marginTop: "10vh",
    borderRadius: "10px",
    display: "grid",
    gridTemplateColumns: "35% 65%",
  };

  const containerItem = {
    alignSelf: "flex-start",
    paddingRight: "1rem",
    paddingLeft: "1.5rem",
  };

  return (
    <div className={`shadow`} style={customContainer}>
      <div className={`${containerItem} ms-5`}>
        <Info time={time} />
      </div>
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <ConfirmationDetails />
        </Suspense>
      </div>
    </div>
  );
};

export default Confirmation;
