import React, { useState } from "react";
import axios from "axios";
import "../styles/DeleteButton.css";

export default function DeleteDestinations({ id, userDestinations, setUserDestinations, update, setupdate }) {
  const [checked, setChecked] = useState(userDestinations?.some((dest) => dest.destinationId === id));
  const bruker = localStorage.getItem("loggedIn");

  function updateDestinations(newDestinations) {
    axios
      .put(`http://localhost:4000/api/users/edit/${bruker}`, { destinations: newDestinations })
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
    setUserDestinations(newDestinations);
  }

  function deleteDestination() {
    const updatedDestinations = [...userDestinations].filter((dest) => dest.destinationId !== id);
    setUserDestinations(updatedDestinations);
    setupdate(!update);

    axios
      .delete(`http://localhost:4000/api/travelDestinations/delete/${id}`)
      .then((result) => {
        console.log("Deleted post");
      })
      .catch((err) => {
        console.error("Error deleting destination:", err);
      });
  }

  const handleClick = () => {
    deleteDestination(); // Call function to delete the destination from the database
    setChecked(true); // Assuming you want to set checked to true after clicking the button
  };

  return (
    <div className="delete-btn">
      <button id="btn" onClick={handleClick} className={`btn ${checked ? "checked" : ""}`}>
        🗑️
      </button>
    </div>
  );
}
