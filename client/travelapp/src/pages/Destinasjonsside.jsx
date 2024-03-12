import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import PhotoCarousel from "../components/PhotoCarousel.jsx";
import "../styles/Destinasjonsside.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import Rating from "../components/Rating.jsx";

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
    <div id="destinasjonsside">
      <div id="content">
        <div className="bildediv">
          <img
            className="BildePaDestinasjonsside"
            src={`http://localhost:4000/images/${imgPath}`}
            alt="Her er et bilde av destinasjonen"
          />
        </div>
        <div id="body">
          <div id="left-side">
            <div id="tittel">
              <p id="overtittel">{traveldestination.destination_name}</p>
              <p id="undertittel"> {traveldestination.destination_contry} </p>
            </div>
            <div className="kategoridiv">
              {categoryList?.map((s) => (
                <div className="listitem">
                  <li>{s}</li>
                </div>
              ))}
            </div>
            <div id="description">
              <p id="contenttittel"> Om {traveldestination.destination_name}</p>
              <p>{traveldestination.longDescription}</p>
            </div>
          </div>
          <div id="right-side">
            <div id="ratings">
              <div className="rating">
                <p className="ratingtittel">Min Vurdering</p>
                <div id="ratingboks">
                  <Rating />
                  {/*<p className="stjerne">⭐</p>*/}
                </div>
              </div>
              <div className="rating">
                <p className="ratingtittel">Snitt Vurdering</p>
                <div id="ratingboks">
                  <p className="ratingp"> {traveldestination.rating}⭐</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Destinasjonsside;
