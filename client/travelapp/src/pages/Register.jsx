import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import '../styles/Login.css';
import axios from "axios";


const Register = (props) => {
    const [username, setName] = useState();
    const [password1, setPassword1] = useState();
    const [password2, setPassword2] = useState();
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

    const sendRequest = (e) => {
        e.preventDefault()
        axios.post('hhtp:///localhost:4000/api/users', {username, password1})
        .then(result => console.log(result))
        .catch(err => console.log(err))
    }

    const handleSubmit = (e) => {
        if (password1 !== password2) {
            alert('Passwords does not match!')
        }
        {users && users.map((user) => {
            (user.username).array.forEach(element => {
                if(element === username) {
                    console.log('Username is already taken')
                    return;
                }
            });
            sendRequest();
        })}

    }
    
    const onButtonClick = () => {
        // You'll update this function later
    }



    return <div class="main-container">
        <div class="container">
            <div class="signup-content">
                <div class="signup-form">
                    <h2 class="form-title">Register</h2>
                        <div class="form-group">
                            <label for="Username"></label>
                            <input type="text" name="name" id="name" placeholder="Your Name" 
                            onChange={(e) => setName(e.target.value)}  />
                        </div>
                        <div class="form-group">
                            <label for="Password"></label>
                            <input type="text" name="name" id="name" placeholder="Your Password"
                            onChange={(e) => setPassword1(e.target.value)}/>
                        </div>
                        <div class="form-group">
                            <label for="Confirm password"></label>
                            <input type="text" name="name" id="name" placeholder="Confirm Password" 
                            onChange={(e) => setPassword2(e.target.value)}/>
                        </div>
                        
                    <div class="form-group form-button">
                        <button onClick = {handleSubmit} >Register</button>
                    </div>
                </div>
            </div>
        </div>


</div>
        
};

export default Register