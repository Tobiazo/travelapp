import React from "react";
import "../styles/Forside.css";
import BesokSjekkboks from "./BesokSjekkboks";
import DeleteDestinations from "./DeleteDestinations";

export default function Destinasjonsboks({
  id,
  land,
  tittel,
  beskrivelse,
  rating,
  imgPath,
  userDestinations,
  setUserDestinations,
  update,
  setupdate,
  user,
  author,
}) {
  return (
    <div class="destinasjonsBoks">
      <div>
        {localStorage.getItem("loggedIn") && (
          <BesokSjekkboks id={id} userDestinations={userDestinations} setUserDestinations={setUserDestinations} />
        )}
        {user && (user.isAdmin || user._id === author) && (
          <DeleteDestinations
            id={id}
            userDestinations={userDestinations}
            setUserDestinations={setUserDestinations}
            update={update}
            setupdate={setupdate}
          />
        )}
        <div id="destinasjonsBildeDiv">
          <a href={"/destinations/" + id}>
            <img
              class="destinasjonsBilde"
              src={`http://localhost:4000/images/${imgPath}`}
              alt="Her er ett bilde av destinasjonen"
            />
          </a>
        </div>
      </div>
      <div id="underBilde">
        <div>
          <div id="tittelDiv">
            <a href={"/destinations/" + id}>
              <p>{tittel}</p>
            </a>
          </div>
          <div id="ratingDiv">
            <span id="stjerne" style={{ color: "#ffc107" }}>
              &#9733;{" "}
            </span>{" "}
            {rating}/10
          </div>
        </div>
        <div id="underTittel">
          <div id="tekstBeskrivelseReisedestinasjonsBoksDiv">
            <p id="tekstBeskrivelseReisedestinasjonsBoks">{beskrivelse}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
