import React from "react"
import { NavLink, useNavigate } from "react-router-dom";
import Login from "./Login";
import LoginButton from "./../components/LoginButton";
import Destinasjonsboks from "../components/Destinasjonsboks";

const Home = (props) => {
    const { loggedIn, email } = props
    const navigate = useNavigate();    

    return (
        <div>
            <div className="mainContainer">
                <div className={"titleContainer"}>
                    <div>Welcome! HOME</div>
                </div>
                <div>
                    This is the home page.
                </div>
                <div className={"buttonContainer"}>
                    <ul>
                        <li>
                            <NavLink to ="/Login"> Log in / Become a new member </NavLink>
                        </li>
                    </ul>
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
            </div>
        </div>
    )
    
}

export default Home