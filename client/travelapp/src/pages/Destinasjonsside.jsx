import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ParisImage from "../bilder/ParisBilde.jpg";
import Paris2 from "../bilder/Paris2.jpg";
import PhotoCarousel from "../components/PhotoCarousel.jsx";
import "../styles/Destinasjonsside.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";

const Destinasjonsside = () => {
  /*
    const images = [
        {ParisImage},
        {Paris2},
      ];
    */
  //const navigate = useNavigate();

  const id = useLocation().pathname.split("/")[2];
  const [traveldestination, setDestination] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:4000/api/travelDestinations/${id}`)
      .then((response) => {
        setDestination(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const categoryList = traveldestination.category;
  const imgPath = traveldestination.imgPath;

  return (
    <div>
      {/*<PhotoCarousel images={images}/>*/}
      <img
        class="BildePaDestinasjonsside"
        src={`http://localhost:4000/images/${imgPath}`}
        alt="Her er et bilde av destinasjonen"
      />

      <div id="tekstligBeskrivelse">
        <div id="rating">
          <p>Rating: {traveldestination.rating}/10</p>
        </div>

        <p id="tittel">{traveldestination.destination_name}</p>
        <p id="Kategorier">
          {" "}
          Kategorier:
          {categoryList?.map((s) => (
            <li>{s}</li>
          ))}
        </p>

        <p>{traveldestination.longDescription}</p>
      </div>
    </div>
  );
};
export default Destinasjonsside;
