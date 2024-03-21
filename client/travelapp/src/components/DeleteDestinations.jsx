import React, { useState } from 'react';
import axios from 'axios';
import "../styles/DeleteButton.css";

export default function DeleteDestinations({ id, userDestinations, setUserDestinations }) {
  const [checked, setChecked] = useState(
    userDestinations?.some((dest) => dest.destinationId === id)
  );
  const bruker = localStorage.getItem("loggedIn");

  function updateDestinations(newDestinations) {
    axios
      .put(`http://localhost:4000/api/users/edit/${bruker}`, { destinations: newDestinations })
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
    setUserDestinations(newDestinations);
  }

  function deleteDestination() {
    axios
      .delete(`http://localhost:4000/api/destinations/${id}`)
      .then((result) => {
        console.log(result);
        // If successfully deleted, remove the destination from user's destinations
        const updatedDestinations = userDestinations.filter(dest => dest.destinationId !== id);
        updateDestinations(updatedDestinations);
      })
      .catch((err) => {
        console.error('Error deleting destination:', err);
      });
  }
  

  const handleClick = () => {
    deleteDestination(); // Call function to delete the destination from the database
    setChecked(true); // Assuming you want to set checked to true after clicking the button
  };

  return (
    <div className="checkbox-wrapper-12">
      <button
        id='btn'
        onClick={handleClick}
        className={`btn ${checked ? 'checked' : ''}`}
      >
        🗑️
      </button>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id="goo-12">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur"></feGaussianBlur>
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7"
              result="goo-12"
            ></feColorMatrix>
            <feBlend in="SourceGraphic" in2="goo-12"></feBlend>
          </filter>
        </defs>
      </svg>
    </div>
  );
}
