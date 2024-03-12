import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/Forside.css";

export default function BesokSjekkboks({ id }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch("http://localhost:4000/api/users/find/" + localStorage.getItem("loggedIn"));

      const json = await response.json();
      if (response.ok) {
        setUser(json);
      }
    };

    fetchUser();
  });

  function updateDestinations(newDestinations) {
    axios
      .put("http://localhost:4000/api/users/edit/" + user._id, { destinations: newDestinations })
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  }

  const setVisit = (e) => {
    //Når sjekkboksen blir aktivert.
    //legger til destinasjonen som blir aktivert til
    //listen med alle destinasjoner for den innloggede brukeren.
    //Oppdaterer databasen
    if (e.target.checked) {
      const userDestinations = [...user.destinations];

      if (userDestinations.some((dest) => dest.destinationId === id)) {
        userDestinations.map((dest) => {
          if (dest.destinationId == id) {
            dest.hasVisited = true;
            return dest;
          } else {
            return dest;
          }
        });
        const newUserDestinations = [...userDestinations];
        updateDestinations(newUserDestinations);
      } else {
        const newUserDestinations = [...userDestinations, { destinationId: id, reviewValue: null, hasVisited: true }];
        updateDestinations(newUserDestinations);
      }

      //Når sjekkboksen blir deaktivert
      //fjerner destinasjonen som blir deaktivert fra
      //listen med alle destinasjoner
      //oppdaterer databasen
    } else if (!e.target.checked) {
      const userDestinations = [...user.destinations].map((dest) => {
        if (dest.destinationId == id) {
          dest.hasVisited = false;
          return dest;
        } else {
          return dest;
        }
      });

      updateDestinations(userDestinations);
    }
  };

  return (
    <div class="checkbox-wrapper-12">
      <div class="cbx">
        <input
          id="cbx-12"
          type="checkbox"
          onChange={setVisit}
          defaultChecked={
            user &&
            user.destinations &&
            user.destinations.some((dest) => dest.destinationId == id && dest.hasVisited === true)
          }
        />
        <label for="cbx-12"></label>
        <svg width="15" height="14" viewbox="0 0 15 14" fill="none">
          <path d="M2 8.36364L6.23077 12L13 2"></path>
        </svg>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id="goo-12">
            <fegaussianblur in="SourceGraphic" stddeviation="4" result="blur"></fegaussianblur>
            <fecolormatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7"
              result="goo-12"
            ></fecolormatrix>
            <feblend in="SourceGraphic" in2="goo-12"></feblend>
          </filter>
        </defs>
      </svg>
    </div>
  );
}
