import React from "react";
import Destinasjonsboks from "../components/Destinasjonsboks";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useFilter } from "../components/FilterProvider";
import AnbefalteDestinasjoner from "../components/AnbefalteDestinasjoner";
import { AnbefalteDestContext } from "../components/AnbefalteDestProvider";

function Home( ) {
  const [traveldestinations, setTraveldestinations] = useState(null);
  const [user, setUser] = useState(null);
  const { filter } = useFilter();
  const bruker = localStorage.getItem("loggedIn");
  const [userDestinations, setUserDestinations] = useState(null);
  const {visAnbefalinger} = useContext(AnbefalteDestContext);


  useEffect(() => {
    const fetchTravelDestinations = async () => {
      const response = await fetch(
        "http://localhost:4000/api/travelDestinations"
      );
      const json = await response.json();
      console.log(json);

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
        console.log(destinationsWithAverage);
        setTraveldestinations(destinationsWithAverage.reverse());
      }
    };

    fetchTravelDestinations();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/users/find/${bruker}`
        );
        const userData = response.data;

        if (response.status === 200) {
          setUser(userData);
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
      <div className="Traveldestinations">
        {/* Formatet for filtering per nå:
          Filter ser slik ut [[ratingMin, RatingMax], [tags], [kontinenter], klima, showVisisted]
          dersom kontinenter er full skal den sortes som full
        */}
        {visAnbefalinger && <AnbefalteDestinasjoner
        userDestinations={userDestinations}
        setUserDestinations={setUserDestinations}
        />}

        {traveldestinations &&
          traveldestinations

            .filter((ele) => {
              //filtrering av Rating
              if (isNaN(ele.averageRating) && filter[0][0] <= 0) {
                return true;
              } else {
                return (
                  filter[0][0] <= ele.averageRating &&
                  ele.averageRating <= filter[0][1]
                );
              }
            })
            .filter((ele) => {
              //filtrering av Besøkt/ikke Besøkt
              if (user === null) {
                return true;
              } else if (filter[4] === "Vis Begge") {
                return true;
              } else if (user === null) {
                return true;
              } else if (filter[4] === "Kun Besøkte") {
                const visitedArray = user.destinations;
                for (let index = 0; index < visitedArray.length; index++) {
                  const element = visitedArray[index];
                  if (element.destinationId === ele._id) {
                    return element.hasVisited;
                  }
                }
                return false;
              } else if (filter[4] === "Kun Ubesøkte") {
                const visitedArray = user.destinations;

                for (let index = 0; index < visitedArray.length; index++) {
                  const element = visitedArray[index];
                  if (element.destinationId === ele._id) {
                    return !element.hasVisited;
                  }
                }
                return true;
              }
            })
            .filter((ele) => {
              //filtrering av kontinent
              if (filter[2].length === 0) {
                return true;
              } else {
                return filter[2].indexOf(ele.destination_continent) !== -1;
              }
            })
            .filter((ele) => {
              //filtrering av klima
              if (filter[3] === null || filter[3] === "alle") {
                return true;
              } else if (ele.destination_climate == filter[3]) {
                //Må ha == i stedet for === her
                return true;
              } else {
                return false;
              }
            })
            .filter((ele) => {
              //filtrering av tags
              if (filter[1].length == 0) {
                return true;
              } else {
                return filter[1].some((e) => {
                  return ele.category.indexOf(e) !== -1;
                });
              }
            })

            .map((traveldestination) => (
              <Destinasjonsboks
                key={traveldestination._id}
                id={traveldestination._id}
                rating={
                  isNaN(traveldestination.averageRating)
                    ? "-"
                    : traveldestination.averageRating
                }
                land={traveldestination.destination_country}
                tittel={traveldestination.destination_name}
                beskrivelse={traveldestination.ShortDescription}
                imgPath={traveldestination.imgPath}
                userDestinations={userDestinations}
                setUserDestinations={setUserDestinations}
              />
            ))}
      </div>
    </div>
  );
}

export default Home;
