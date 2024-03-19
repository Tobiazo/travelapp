import "../styles/Rating.css";
import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function Rating({ fireUpdate, setFireUpdate }) {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [totalStars] = useState(10);
  const [user, setUser] = useState(null);
  const id = useLocation().pathname.split("/")[2];

  try {
    useEffect(() => {
      const fetchUser = async () => {
        const response = await fetch("http://localhost:4000/api/users/find/" + localStorage.getItem("loggedIn"));

        const json = await response.json();
        if (response.ok) {
          setUser(json);
        }
      };

      fetchUser();
    }, []);
  } catch (error) {
    console.log("ratingJsx");
  }

  //Dersom brukeren har gitt nåværende destinasjon en rating vil denne vises i ratingkomponenten
  useEffect(() => {
    if (user && id) {
      const existingUserDest = user.destinations.find((dest) => dest.destinationId === id);
      if (existingUserDest) {
        setRating(existingUserDest.reviewValue);
      }
    }
  }, [user, id]);

  //Funksjon som sender endring til databasen
  function updateDestinations(newDestinations) {
    axios
      .put("http://localhost:4000/api/users/edit/" + user._id, { destinations: newDestinations })
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
    setFireUpdate((!fireUpdate));
  }

  const removeRating = () => {
    const userDestinations = [...user.destinations];
    if (userDestinations.some((dest) => dest.destinationId === id)) {
      userDestinations.map((dest) => {
        if (dest.destinationId === id) {
          dest.reviewValue = null;
          return dest;
        }
        return dest;
      });
    }
    const updatedUserDest = [...userDestinations];
    updateDestinations(updatedUserDest);
    setRating(null);
  };

  const handleRating = (currentRating) => {
    //Sjekker om det finnes en bruker eller om det eksisterer noe lagret data
    if (!user || !localStorage.getItem("loggedIn")) {
      console.error("User not logged in or user data unavailable.");
      return;
    }

    setRating(currentRating);

    const userDestinations = [...user.destinations];

    //Sjekker om det finnes noen destinasjoner i DB, og hvis ikke legger til med current rating
    if (userDestinations.some((dest) => dest.destinationId === id)) {
      userDestinations.map((dest) => {
        if (dest.destinationId === id) {
          dest.reviewValue = currentRating;
          return dest;
        } else {
          return dest;
        }
      });
      const newUserDestinations = [...userDestinations];
      updateDestinations(newUserDestinations);
    } else {
      const newUserDestinations = [
        ...userDestinations,
        { destinationId: id, reviewValue: currentRating, hasVisited: false },
      ];
      updateDestinations(newUserDestinations);
    }
  };

  if (localStorage.getItem("loggedIn")) {
    return (
      <div className="rat">
        <p className="ratingtittel" id="min-vurdering-tekst">
          Min Vurdering
        </p>
        {[...Array(totalStars)].map((star, index) => {
          const currentRating = index + 1;

          return (
            <label key={index}>
              <input
                class="ratingRadio"
                type="radio"
                name="rating"
                value={currentRating}
                onClick={() => handleRating(currentRating)}
              />
              <span
                className="star"
                style={{
                  color: currentRating <= (hover || rating) ? "#ffc107" : "#cccccc",
                }}
                onMouseEnter={() => setHover(currentRating)}
                onMouseLeave={() => setHover(null)}
              >
                &#9733;
              </span>
            </label>
          );
        })}
        <div>
          <button onClick={removeRating} id="remove-rating">
            Fjern rating
          </button>
        </div>
      </div>
    );
  }
}
