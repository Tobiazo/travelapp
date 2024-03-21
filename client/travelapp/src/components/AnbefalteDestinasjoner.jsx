import React, { useEffect, useState } from "react";
import axios from "axios";
import Destinasjonsboks from "./Destinasjonsboks";
import "../styles/MineVurderinger.css";

const AnbefalteDestinasjoner = (
  {userDestinations, setUserDestinations}
) => {
  const [allDestinations, setAllDestinations] = useState([]);
  //const [userDestinations, setUserDestinations] = useState([]);
  const [recommendedDestinations, setRecommendedDestinations] = useState([]);
  
  

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/travelDestinations/`);
        if (response.status === 200) {
          const destinationsWithAverage = await Promise.all(
            response.data.map(async (traveldestination) => {
              const averageResponse = await axios.get(`http://localhost:4000/api/travelDestinations/average/${traveldestination._id}`);
              const averageJson = averageResponse.data;
              return {
                ...traveldestination,
                averageRating: Math.round(averageJson.averageRating * 100) / 100,
              };
            })
          );
          setAllDestinations(destinationsWithAverage);
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

  //   const fetchUserDestinations = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:4000/api/users/find/${localStorage.getItem("loggedIn")}`);
  //       const allUserDestinations = response.data;
  //       setUserDestinations(allUserDestinations.destinations || []);
  //     } catch (error) {
  //       console.error("Error fetching users destinations", error);
  //     }
  //   };

  //   fetchUserDestinations();
      fetchDestinations();
  }, []);

  useEffect(() => {
    if (allDestinations.length > 0 && userDestinations.length > 0) {
      const filteredDestinations = [...allDestinations].filter(dest => ![...userDestinations].some(userDest => userDest.destinationId === dest._id));
      if (filteredDestinations.length > 3) {
        const shuffledDestinations = filteredDestinations.sort(() => 0.5 - Math.random());
        const selectedDestinations = shuffledDestinations.slice(0, 3);
        setRecommendedDestinations(selectedDestinations);
      } else {
        setRecommendedDestinations(filteredDestinations);
      }
    } else {
      const shuffledDestinations = allDestinations.sort(() => 0.5 - Math.random());
      const selectedDestinations = shuffledDestinations.slice(0, 3);
      setRecommendedDestinations(selectedDestinations);
    }
  }, [allDestinations, userDestinations]);

  if(localStorage.getItem("loggedIn") && recommendedDestinations.length > 0) {
    return (
      <div id="anbef-dest-container">
        <h2 id="anbefalte-dest-tekst">Anbefalte destinasjoner</h2>
        <div className="recommended-traveldestinations">
          {recommendedDestinations.length === 0 ? (
            <h2 id="anbefalte-dest-tekst">Ingen anbefalte destinasjoner</h2>
          ) : (
            recommendedDestinations.map((traveldestination) => (
              <Destinasjonsboks
                key={traveldestination._id}
                id={traveldestination._id}
                rating={isNaN(traveldestination.averageRating) ? "-" : traveldestination.averageRating}
                land={traveldestination.destination_country}
                tittel={traveldestination.destination_name}
                beskrivelse={traveldestination.ShortDescription}
                imgPath={traveldestination.imgPath}
                userDestinations={userDestinations}
                setUserDestinations={setUserDestinations}
              />
            ))
          )}
        </div>
      </div>
    );  
  };
};

export default AnbefalteDestinasjoner;
