import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import Destinasjonsboks from "./Destinasjonsboks";
import "../styles/MineVurderinger.css";

const AnbefalteDestinasjoner = ({
    setUserDestinations

}) => {
    //lagrer data om destinasjoner og bruker dra databasen:
  const [allDestinations, setAllDestinations] = useState([]);
  const [userDest, setUserDest] = useState([]);
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
            setUserDest(allUserDestinations.destinations || []);
        } catch (error) {
            console.error("Error fetching users destinations", error)
        }
    }

    fetchUserDestinations();
    fetchDestinations();
  },[]);

  //Finner to tilfeldige destinasjoner som kan anbefales
  useEffect(() => {
    if(allDestinations.length > 0 && userDest.length > 0) {
        const filteredDestinations = (allDestinations.filter(dest => 
            !userDest.some(userDestItem => (userDestItem.destinationId === dest._id))))

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
  }, [userDest, allDestinations]);

  if(localStorage.getItem("loggedIn")){

    if (recommendedDestinations.length === 0){
        return (
            <h2 id= "anbefalte-dest-tekst" >Ingen anbefalte destinasjoner</h2>
        )
    } else {
        return (
            <div id="anbef-dest-container">
                <div className="Traveldestinations">
                <h2 id= "anbefalte-dest-tekst" >Anbefalte destinasjoner</h2>
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
                            setUserDestinations={setUserDestinations}

                        />
                    ))}
                </div>
            </div>
        )};
    }
};
export default AnbefalteDestinasjoner;