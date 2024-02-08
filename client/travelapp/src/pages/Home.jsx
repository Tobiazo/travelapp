import React from "react"
import { NavLink, useNavigate } from "react-router-dom";
import Login from "./Login";
import LoginButton from "./../components/LoginButton";
import Destinasjonsboks from "../components/Destinasjonsboks";

const Home = (props) => {
    const { loggedIn, email } = props
    const navigate = useNavigate();    

    return <div className="mainContainer">
        <div className={"titleContainer"}>
            <div>Welcome! HOME</div>
        </div>
        <div>
            This is the home page.
        </div>
        <div id="innloggingsknapp" className={"buttonContainer"}>
            <ul>
                <li>
                    <NavLink to ="/Login"> Login </NavLink>
                </li>
            </ul>
            {(loggedIn ? <div>
                Your email address is {email}
            </div> : <div/>)}
        </div>
        
        <Destinasjonsboks land={"Canada"} tittel={"Amerika"}/>
        <Destinasjonsboks land={"norge"} tittel={"sa"}/>
        <Destinasjonsboks land={"Canaadfda"} tittel={"Ameadsfrika"}/>

    </div>
}

export default Home