import React, { useEffect, useState } from "react";
import Destinasjonsboks from "../components/Destinasjonsboks";
import "../styles/MineVurderinger.css";
import axios from "axios";

const MineDestinasjoner = () => {
  const [destinations, setDestinations] = useState([]);
  const bruker = localStorage.getItem("loggedIn");
  const [userDestinations, setUserDestinations] = useState(null);


  useEffect(() => {
    const fetchTravelDestinations = async () => {
      const response = await fetch(
        "http://localhost:4000/api/travelDestinations"
      );
      const json = await response.json();

      if (response.ok) {
        // finner gjennomsnitt for hver destinasjon ved å mappe over alle destinasjonene.
        const destinationsWithAverage = await Promise.all(
          json.map(async (traveldestination) => {
            const averageResponse = await fetch(
              `http://localhost:4000/api/travelDestinations/average/${traveldestination._id}`
            );
            const averageJson = await averageResponse.json();
            return {
              ...traveldestination,
              averageRating: Math.round(averageJson.averageRating * 100) / 100,
            };
          })
        );

        setDestinations(destinationsWithAverage);
      }
    };

    fetchTravelDestinations();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/users/find/${bruker}`);
        const userData = response.data;

        if (response.status === 200) {
          setUserDestinations(userData.destinations);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [bruker]);

  return (
    <div>
      <p id="overskriftVurderinger">Mine destinasjoner</p>
      <div className="MineDestinasjonerTraveldestinations">
        {destinations.map((destination) => {
          if (destination.author === localStorage.getItem("loggedIn") && userDestinations) {
            return (
              <Destinasjonsboks
                key={destination._id}
                id={destination._id}
                rating={
                  isNaN(destination.averageRating)
                    ? "-"
                    : destination.averageRating
                }
                land={destination.destination_country}
                tittel={destination.destination_name}
                beskrivelse={destination.ShortDescription}
                imgPath={destination.imgPath}
                userDestinations={userDestinations}
                setUserDestinations={setUserDestinations}
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
