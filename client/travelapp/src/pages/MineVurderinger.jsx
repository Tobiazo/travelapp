import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import PhotoCarousel from "../components/PhotoCarousel.jsx";
import "../styles/MineVurderinger.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";

const MineVurderinger = () => {
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
      .get(`http://localhost:4000/api/users/${id}`)
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
  );
};
export default MineVurderinger;
