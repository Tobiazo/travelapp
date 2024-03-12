import React, { useEffect, useState } from "react";
import Destinasjonsboks from "../components/Destinasjonsboks";
import "../styles/MineVurderinger.css";

const MineDestinasjoner = () => {
  const [destinations, setDestinations] = useState([]);
  const bruker = localStorage.getItem("loggedIn");

  useEffect(() => {
    const fetchDestinations = async () => {
      const response = await fetch("http://localhost:4000/api/travelDestinations/");

      const json = await response.json();
      if (response.ok) {
        setDestinations(json);
      }
    };

    fetchDestinations();
  });



  return (
    <div>
      <p id="overskriftVurderinger">Mine destinasjoner</p>
      <div className="Traveldestinations">
        {destinations.map(destination => {
          if (destination.author === localStorage.getItem("loggedIn")) {
            return (
              <Destinasjonsboks
                key={destination._id}
                id={destination._id}
                land={destination.destination_country}
                tittel={destination.destination_name}
                beskrivelse={destination.ShortDescription}
                imgPath={destination.imgPath}
              />
            );
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
};

export default MineDestinasjoner;
