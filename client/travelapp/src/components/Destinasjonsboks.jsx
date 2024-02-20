import React from 'react'
import ParisImage from '../bilder/ParisBilde.jpg';
import Paris2 from '../bilder/Paris2.jpg';

import { NavLink, useNavigate } from "react-router-dom";
import '../styles/Forside.css';

export default function Destinasjonsboks({land, tittel, beskrivelse, rating}) {
  return (
    <div class='destinasjonsBoks'>
      
      
      <div>
        <div id='destinasjonsBildeDiv'>
            <a href="/Paris">
          
              <img class='destinasjonsBilde' src={Paris2} alt='Her er ett bilde av pariestårnet'/>
            </a>
          
          
        </div>
      </div>
      <div id='underBilde'>
        <div>
        
          <div id="tittelDiv">
            <a href="/Paris">
              <p>{tittel}</p>
            </a>

          </div> 

          <div id="ratingDiv">
          ✰ {rating}{!rating && "-"}/10
          </div>
        </div>
        <div id='underTittel'>
          <div id='tekstBeskrivelseReisedestinasjonsBoksDiv'>
            <p id="tekstBeskrivelseReisedestinasjonsBoks">{beskrivelse}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
