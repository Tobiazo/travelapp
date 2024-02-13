import React from 'react'
import ParisImage from '../bilder/ParisBilde.jpg';
import { NavLink, useNavigate } from "react-router-dom";

export default function Destinasjonsboks({land, tittel, beskrivelse}) {
  return (
    <div class='destinasjonsBoks'>
        {tittel}
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
