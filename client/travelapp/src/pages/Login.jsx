import React from "react"
import { useNavigate } from "react-router-dom";

const  Login = (props) => {
    const { loggedIn, email } = props
    const navigate = useNavigate();
    
    const onButtonClick = () => {
        // You'll update this function later
    }

    return <div className="mainContainer">
        <div>
            This is the login page.
        </div>
        <div className="input-box">
            <input name = "Myinput"  placeholder="username"/>
            <input name = "Myinput"  placeholder="password"/>
            <button name="Log in" style={{Height: 1}} > </button>
        </div>
    </div>
};

export default Login