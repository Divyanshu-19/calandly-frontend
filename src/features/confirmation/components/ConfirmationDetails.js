import React, { useState } from "react";
import axios from "axios";

const ConfirmationDetails = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [slotConfirmation, setSlotConfirmation] = useState(false);

  const handleSchedule = async () => {
    if (name.length === 0 || email.length === 0) {
      setError("*Name or email missing");
      setSlotConfirmation(false);
      return;
    }
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_URL}/slotconfirm`
      );
      if (response.status === 200) {
        setSlotConfirmation(true);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setError("");
    }
  };

  return (
    <div className="ms-5 ps-4" style={{ borderLeft: "1px solid lightgray" }}>
      <div className="fs-5 fw-bold mt-4">Enter Details</div>
      <div className="fw-bold mt-3 mb-2" style={{ fontSize: "13px" }}>
        Name *
      </div>
      <input
        type="text"
        className="rounded"
        style={{
          width: "20rem",
          height: "2.5rem",
          border: "1px solid #C9C9C9",
        }}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div className="fw-bold mt-3 mb-2" style={{ fontSize: "13px" }}>
        Email *
      </div>
      <input
        type="email"
        className="rounded"
        style={{
          width: "20rem",
          height: "2.5rem",
          border: "1px solid #C9C9C9",
        }}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="fw-bold mt-3 mb-2" style={{ fontSize: "13px" }}>
        Please share anything that will help prepare for our meeting.
      </div>
      <textarea
        className="rounded"
        style={{
          width: "20rem",
          height: "4rem",
          border: "1px solid #C9C9C9",
        }}
      />
      <button
        className="mt-4 rounded-pill px-3 py-2"
        style={{
          display: "block",
          color: "white",
          backgroundColor: "#005FE6",
          border: "none",
        }}
        onClick={handleSchedule}
      >
        Schedule Event
      </button>
      {error ? (
        <div className="bg-error text-error text-center py-2 my-3 mx-5">
          {error}
        </div>
      ) : null}
      {slotConfirmation ? (
        <div className="bg-success text-white text-center py-2 my-3 mx-5">
          *Slot Confirmed
        </div>
      ) : null}
    </div>
  );
};

export default ConfirmationDetails;
