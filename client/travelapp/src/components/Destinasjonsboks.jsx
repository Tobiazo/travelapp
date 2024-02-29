import React from "react";
import axios from "axios";
import { NavLink, useNavigate, } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/Forside.css";

export default function Destinasjonsboks({

  id,
  land,
  tittel,
  beskrivelse,
  rating,
  imgPath,
}) {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(
        "http://localhost:4000/api/users/find/"+localStorage.getItem("loggedIn")
      );
  
      const json = await response.json();
      if (response.ok) {
        setUser (json);
      }
    };
  
    fetchUser();
  })

  const setVisit = e => {

    //Når sjekkboksen blir aktivert.
    //legger til destinasjonen som blir aktivert til
    //listen med alle destinasjoner for den innloggede brukeren.
    //Oppdaterer databasen
    if (e.target.checked) {
      const userDestinations = [...user.destinations, { destinationId: id, reviewValue: null}];

      axios.put("http://localhost:4000/api/users/edit/" + user._id, {destinations: userDestinations})
      .then(result => console.log(result))
      .catch(err => console.log(err))

    //Når sjekkboksen blir deaktivert
    //fjerner destinasjonen som blir deaktivert fra
    //listen med alle destinasjoner
    //oppdaterer databasen 
    }else if (!e.target.checked) {
      const userDestinations = [...user.destinations].filter((dest) => dest.destinationId != id);

      axios.put("http://localhost:4000/api/users/edit/" + user._id, {destinations: userDestinations})
      .then(result => console.log(result))
      .catch(err => console.log(err))
    }
  }
  
  function checkbox () {
    return (
      <div class="checkbox-wrapper-12">
            <div class="cbx">
              <input id="cbx-12" type="checkbox" onChange={setVisit} defaultChecked={user && user.destinations && user.destinations.some((dest) => dest.destinationId == id)}/>
              <label for="cbx-12"></label>
              <svg width="15" height="14" viewbox="0 0 15 14" fill="none">
                <path d="M2 8.36364L6.23077 12L13 2"></path>
              </svg>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
              <defs>
                <filter id="goo-12">
                  <fegaussianblur in="SourceGraphic" stddeviation="4" result="blur"></fegaussianblur>
                  <fecolormatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7" result="goo-12"></fecolormatrix>
                  <feblend in="SourceGraphic" in2="goo-12"></feblend>
                </filter>
              </defs>
            </svg>
          </div>
    )
  }

  return (
    <div class="destinasjonsBoks">
      <div>
      {localStorage.getItem("loggedIn") && checkbox()}
        <div id="destinasjonsBildeDiv">
          <a href={"/destinations/" + id}>
            <img
              class="destinasjonsBilde"
              src={`http://localhost:4000/images/${imgPath}`}
              alt="Her er ett bilde av destinasjonen"
            />
          </a>
        </div>
      </div>
      <div id="underBilde">
        <div>
          <div id="tittelDiv">
            <a href={"/destinations/" + id}>
              <p>{tittel}</p>
            </a>
          </div>
          <div id="ratingDiv">
            ✰ {rating}
            {!rating && "-"}/10
          </div>
        </div>
        <div id="underTittel">
          <div id="tekstBeskrivelseReisedestinasjonsBoksDiv">
            <p id="tekstBeskrivelseReisedestinasjonsBoks">{beskrivelse}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
