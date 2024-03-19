import React, { useEffect, useState } from "react";
import "../styles/MineVurderinger.css";
import axios from "axios";

const DeleteDestinations = () => {
  const [destinations, setDestinations] = useState([]);
  const bruker = localStorage.getItem("loggedIn");
  const [userDestinations, setUserDestinations] = useState(null);


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

  DeleteFunction(async () => {
    await Promise.all(json.map(async (traveldestination) => {
        const averageResponse = await fetch(
            `http://localhost:4000/api/travelDestinations/delete/${traveldestination.id}`
        );
        const averageJson = await averageResponse.json();
        return averageJson;
    }));
});


  return (
    <div>
    <div>
      {!bruker.isAdmin && (
        <div className="slettDestinasjon">
          <button type="button" onClick={DeleteFunction}> Slett </button>
        </div>
      )}
 
      
    </div>
  </div>
);
      };
  export default DeleteDestinations;