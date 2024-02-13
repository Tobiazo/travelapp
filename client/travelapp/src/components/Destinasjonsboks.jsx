import React from 'react'
import ParisImage from '../bilder/ParisBilde.jpg';
import { NavLink, useNavigate } from "react-router-dom";
import '../styles/Forside.css';

export default function Destinasjonsboks({land, tittel, beskrivelse, rating}) {
  return (
    <div class='destinasjonsBoks'>
      <div id="tittelDiv">
        {tittel}
      </div> 
      <div id="stylingDiv">
        {rating}/10
      </div>
      <div>
        <a href="/Paris">
          <img class='destinasjonsBilde' src={ParisImage} alt='Her er ett bilde av pariestårnet'/>
        </a>
      </div>
      <div on>
        {beskrivelse}
      </div>
    </div>
  )
}
