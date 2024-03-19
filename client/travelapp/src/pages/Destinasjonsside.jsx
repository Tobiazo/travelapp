import React from "react";
import "../styles/Destinasjonsside.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Rating from "../components/Rating.jsx";

const Destinasjonsside = () => {
  const id = useLocation().pathname.split("/")[2];
  const [traveldestination, setDestination] = useState({});
  const [avgRating, setAvgRating] = useState(null);
  const [fireUpdate, setFireUpdate] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/travelDestinations/${id}`)
      .then((response) => {
        setDestination(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  useEffect(() => {
    const getAvgRating = async () => {
      const averageResponse = await fetch(`http://localhost:4000/api/travelDestinations/average/${id}`);
      const averageJson = await averageResponse.json();
      console.log(JSON.stringify(averageJson));
      setAvgRating(averageJson);
    };

    getAvgRating();
  }, [fireUpdate, id]);

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
                <div id="ratingboks">
                  <Rating fireUpdate={fireUpdate} setFireUpdate={setFireUpdate} />
                </div>
              </div>
              <div className="rating">
                <p className="ratingtittel">Snittvurdering</p>
                <div id="ratingboks">
                  <p className="rating-star">&#9733;</p>
                  <p id="snittvurdering-tall">
                    {avgRating && isNaN(JSON.stringify(avgRating).split(":")[1].replace('"', "").replace('"}', ""))
                      ? "-"
                      : avgRating && JSON.stringify(avgRating).split(":")[1].replace('"', "").replace('"}', "")}
                  </p>
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
