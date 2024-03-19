import React, { useEffect, useState } from "react";
import axios from "axios";
import Destinasjonsboks from "./Destinasjonsboks";
import "../styles/MineVurderinger.css";

const AnbefalteDestinasjoner = () => {
    //lagrer data om destinasjoner og bruker dra databasen:
  const [allDestinations, setAllDestinations] = useState([]);
  const [userDestinations, setUserDestinations] = useState([]);
  const [recommendedDestinations, setRecommendedDestinations] = useState([]);

  useEffect(() => {
    //Henter ut alle destinasjoner i databasen
    const fetchDestinations = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/travelDestinations/`)
            const allDestinations = response.data;
            
            setAllDestinations(allDestinations || []);
        } catch (error) {
            console.error("Error fetching data", error);
        }
    }
    //Henter ut alle destinasjoner for nåværende bruker
    const fetchUserDestinations = async () => {
        try {
            const response = await axios.get(
                "http://localhost:4000/api/users/find/" + localStorage.getItem("loggedIn"));

            const allUserDestinations = response.data;
            setUserDestinations(allUserDestinations.destinations || []);
        } catch (error) {
            console.error("Error fetching users destinations", error)
        }
    }

    fetchUserDestinations();
    fetchDestinations();

  },[]);

  //Finner to tilfeldige destinasjoner som kan anbefales
  useEffect(() => {
    // if(allDestinations.length > 0 && userDestinations.length > 0) {
    //     const filteredDestinations = (allDestinations.filter(dest => 
    //         !userDestinations.some(userDest => userDest.destinationId === dest._id )) || allDestinations.filter(desti => 
    //             userDestinations.some(userDesti => userDesti.destinationId === desti._id && userDesti.hasVisited === false)))
    if(allDestinations.length > 0 && userDestinations.length > 0) {
        const filteredDestinations = allDestinations.filter(dest => 
            !userDestinations.some(userDest => userDest.destinationId === dest._id ))
    
        

        if (filteredDestinations.length > 3) {
            const shuffledDestinations = filteredDestinations.sort(() => 0.5 - Math.random());
            const selectedDestinations = shuffledDestinations.slice(0,3);
            setRecommendedDestinations(selectedDestinations)}
        else {
            const selectedDestinations = filteredDestinations
            setRecommendedDestinations(selectedDestinations)
            }
        } else {
            const shuffledDestinations = allDestinations.sort(() => 0.5 - Math.random());
            const selectedDestinations = shuffledDestinations.slice(0,3);
            setRecommendedDestinations(selectedDestinations)
        }

  }, [allDestinations, userDestinations]);

  if (recommendedDestinations.length === 0){
    return (
        <h2 id= "anbefalte-dest-tekst" >Ingen anbefalte destinasjoner</h2>
    )
  } else {
    return (
        <div id="anbef-dest-container">
            <h2 id= "anbefalte-dest-tekst" >Anbefalte destinasjoner</h2>
            <div className="Traveldestinations">
                {recommendedDestinations.map((traveldestination) => (
                    <Destinasjonsboks
                        key={traveldestination._id}
                        id={traveldestination._id}
                        rating={isNaN(traveldestination.averageRating) ? "-" : traveldestination.averageRating}
                        land={traveldestination.destination_country}
                        tittel={traveldestination.destination_name}
                        beskrivelse={traveldestination.ShortDescription}
                        imgPath={traveldestination.imgPath}
                        userDestinations={recommendedDestinations}
                    />
                ))}
            </div>
        </div>
    )};
};
export default AnbefalteDestinasjoner;