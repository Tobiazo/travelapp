import React from "react"
import { NavLink, useNavigate } from "react-router-dom";
import Login from "./Login";
import LoginButton from "./../components/LoginButton";
import Destinasjonsboks from "../components/Destinasjonsboks";
import { useEffect, useState } from "react";
import axios from "axios";
import Paris from '../bilder/ParisBilde.jpg';
import Lillehammer from '../bilder/Lillehammer.jpeg';


const Home = (props) => {
    const [traveldestiantions, setTraveldestinations] = useState(null); 
    const { loggedIn, email } = props
    //const navigate = useNavigate();

    useEffect(() => {
        const fetchTraveldestinations = async () => {
            //feches data from server: 
            const response = await fetch('http://localhost:4000/api/travelDestinations');
            //makes an array of userobjects:  
            const json = await response.json(); 

            if (response.ok) {
                setTraveldestinations(json);   
            }

        }

         fetchTraveldestinations(); 
    }, [])


    return (
        <div>
            <div className="mainContainer">
                <div className={"titleContainer"}>
                    <div>Welcome! HOME
                    
                    </div>
                </div>
                <div>
                    This is the home page.
                </div>
                <div className={"buttonContainer"}>
                    {(loggedIn ? <div>
                        Your email address is {email}
                    </div> : <div/>)}
                </div>
                <div id="destinasjonsBokserDiv">
                <Destinasjonsboks rating ={4} land={"Canada"} tittel={"Paris"} beskrivelse={"Kjærlighetens by. Kjent for god mat og romantisk stemning."}/>
                <Destinasjonsboks rating ={4} land={"norge"} tittel={"Alicante"} beskrivelse={"Varm ferieby. Kjent for gode strender, med mange norske tursiter"}/>
                <Destinasjonsboks land={"Toronto"} tittel={"Toronto"} beskrivelse={"Beverenes hjemby. Og mest folkerike byen i canada. Kjent for deres hyggelige tilnærming"} />
                <Destinasjonsboks rating ={4} land={"Canada"} tittel={"Paris"} beskrivelse={"Kjærlighetens by. Kjent for god mat og romantisk stemning."}/>
                <Destinasjonsboks rating ={4} land={"norge"} tittel={"Alicante"} beskrivelse={"Varm ferieby. Kjent for gode strender, med mange norske tursiter"}/>
                <Destinasjonsboks land={"Toronto"} tittel={"Toronto"} beskrivelse={"Beverenes hjemby. Og mest folkerike byen i canada. Kjent for deres hyggelige tilnærming"} />
                <Destinasjonsboks rating ={4} land={"Canada"} tittel={"Paris"} beskrivelse={"Kjærlighetens by. Kjent for god mat og romantisk stemning."}/>
                <Destinasjonsboks rating ={4} land={"norge"} tittel={"Alicante"} beskrivelse={"Varm ferieby. Kjent for gode strender, med mange norske tursiter"}/>
                <Destinasjonsboks land={"Toronto"} tittel={"Toronto"} beskrivelse={"Beverenes hjemby. Og mest folkerike byen i canada. Kjent for deres hyggelige tilnærming"} />
                <Destinasjonsboks rating ={4} land={"Canada"} tittel={"Paris"} beskrivelse={"Kjærlighetens by. Kjent for god mat og romantisk stemning."}/>
                <Destinasjonsboks rating ={4} land={"norge"} tittel={"Alicante"} beskrivelse={"Varm ferieby. Kjent for gode strender, med mange norske tursiter"}/>
                <Destinasjonsboks land={"Toronto"} tittel={"Toronto"} beskrivelse={"Beverenes hjemby. Og mest folkerike byen i canada. Kjent for deres hyggelige tilnærming"} />    
                </div>
            {(loggedIn ? <div>
                Your email address is {email}
            </div> : <div/>)}
        </div>
        <div className="Traveldestinations">
                    {traveldestiantions && traveldestiantions.map((traveldestiantion) => (
                    <Destinasjonsboks key = {traveldestiantion._id} id = {traveldestiantion._id} rating ={traveldestiantion.rating} land={traveldestiantion.destination_country} tittel={traveldestiantion.destination_name
                    } beskrivelse={traveldestiantion.ShortDescription}/>) )} 
                </div> 
        </div>
        </div>

    )
    
}

export default Home