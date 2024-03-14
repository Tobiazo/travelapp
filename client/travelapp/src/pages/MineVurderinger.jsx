import React, { useEffect, useState } from "react";
import axios from "axios";
import Destinasjonsboks from "../components/Destinasjonsboks";
import "../styles/MineVurderinger.css";

const MineVurderinger = () => {
    //lagrer data om destinasjoner og bruker dra databasen:
  const [destinations, setDestinations] = useState([]);
  const bruker = localStorage.getItem("loggedIn");
  const [userDestinations, setUserDestinations] = useState(null);


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/users/find/${bruker}`);
        const userData = response.data;

        if (response.status === 200) {
          setUserDestinations(userData.destinations);
          //henter ut destinasjonsdataen
          const destinationIds = userData.destinations.map((destination) => destination.destinationId);
          const destinationsData = await Promise.all(
            destinationIds.map(async (destinationId) => {
              const destResponse = await axios.get(`http://localhost:4000/api/travelDestinations/${destinationId}`);
              //returnerer destinasjonen, men med reviewValue inkludert: 
              return { ...destResponse.data, reviewValue: getReviewValue(userData, destinationId) };
            })
          );
          //lagrer destinasjonene:) 
          setDestinations(destinationsData);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    //brukerdata hentes når brukeren endres. 
    if (bruker) {
      fetchUser();
    }
  }, [bruker]);


  const getReviewValue = (userData, destinationId) => {
    const destination = userData.destinations.find(dest => dest.destinationId === destinationId);
    return destination ? destination.reviewValue : null;
  };

  return (
    <div>
      <p id="overskriftVurderinger">Mine vurderinger</p>
      <div className="Traveldestinations">
        {destinations.map((destination) => (
          <Destinasjonsboks
          key={destination._id}
          id={destination._id}
          rating={destination.reviewValue}
          land={destination.destination_country}
          tittel={destination.destination_name}
          beskrivelse={destination.ShortDescription}
          imgPath={destination.imgPath}
          userDestinations={userDestinations}
          setUserDestinations={setUserDestinations}
          />
        ))}
      </div>
    </div>
  );
};

export default MineVurderinger;