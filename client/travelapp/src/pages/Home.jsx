import React from "react"
import { NavLink, useNavigate } from "react-router-dom";
import Login from "./Login";
import LoginButton from "./../components/LoginButton";

const Home = (props) => {
    const { loggedIn, email } = props
    const navigate = useNavigate();    

    return <div className="mainContainer">
        <div className={"titleContainer"}>
            <div>Welcome! HOME</div>
        </div>
        <div>
            This is the home page!.
        </div>
        <div className={"buttonContainer"}>
            <ul>
                <li>
                    <NavLink to ="/Login"> Login </NavLink>
                </li>
            </ul>
            {(loggedIn ? <div>
                Your email address is {email}
            </div> : <div/>)}
        </div>


    </div>
}

export default Home