import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

function Button(){

    const bruker = localStorage.getItem("loggedIn")

    const [username, setUsername] = useState("");
    //const [user, setUser]  = useState({});
    const LogOut = (e) => {
        e.preventDefault()
        localStorage.setItem("loggedIn", "")
        window.location.reload(false)
    };
    

    useEffect(() => {
     const fetchUser = async () => {
        
            try {
                const response = await axios.get(`http://localhost:4000/api/users/find/${bruker}`);
                const userData = response.data;
                // Extract the username from userData and set it to the username state
                setUsername(userData.username); // Assuming the username property exists in userData
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        // Call fetchUser if bruker exists
       
            fetchUser();
         

        
    }, [username]);

    

    return(
        <div className={"buttonContainer"}>
            <div id="links">
                <NavLink className="float" id="navlinklogginn" to ="/Login">{!bruker && "🔑 Logg inn"}  </NavLink>
                
                <a className="float" id="navlinklogginn"> {username}  </a>
            </div>
        </div>
    ) }
     
    export default Button;
   