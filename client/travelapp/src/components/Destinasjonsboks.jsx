import React from "react";
import "../styles/Forside.css";
import BesokSjekkboks from "./BesokSjekkboks";

export default function Destinasjonsboks({

  id,
  land,
  tittel,
  beskrivelse,
  rating,
  imgPath,
}) {

  return (
    <div class="destinasjonsBoks">
      <div>
      {localStorage.getItem("loggedIn") && <BesokSjekkboks id = {id} />}
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
            ✰ {rating}/10
            {/* {!rating && "-"}/10 */}
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
