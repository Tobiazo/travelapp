import React, { useState, useEffect } from "react"
import { NavLink } from "react-router-dom";
import '../styles/Login.css';

const Login = (props) => {
    const [username, setName] = useState();
    const [password, setPassword] = useState();
    const [users, setUsers] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('hhtp:///localhost:4000/api/users');

            const json = await response.json();

            if(response.ok) {
                setUsers(json);
            }
        }
        fetchUsers();
    }, [])

    const handleLogin = (e) => {
        for(let user in users) {
            if (user.username === username)
                if(user.password !== password) {
                    console.log('Wrong password')
                }
            else {
                console.log('Username does not exist')
            }
        }
    }
    

    return <div class="main-container">
        <div class="container">
            <div class="signup-content">
                <div class="signup-form">
                    <h2 class="form-title">Log in</h2>
                        <div class="form-group">
                            <label class="loginLabel" for="Username"></label>
                            <input type="text" name="Username" id="name" placeholder="Your Name" 
                            onChange={(e) => setName(e.target.value)}/>
                        </div>
                        <div class="form-group">
                            <label class="loginLabel" for="Password"></label>
                            <input type="text" name="Password" id="name" placeholder="Your Password" 
                            onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        
                    <div class="form-group form-button">
                            <button >Log In</button>
                    </div>
                    <div class="form-group form-button">
                        <NavLink to="/Register" style={{textDecoration: 'none'}}>
                            <button type = "submit" onClick={handleLogin} >New? Register here</button>
                        </NavLink>
                        
                    </div>
                </div>
            </div>
        </div>


</div>
        
};

export default Login