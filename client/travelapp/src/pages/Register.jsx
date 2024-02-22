import React, { useState, useEffect } from "react"
import { useNavigate , Navigate} from "react-router-dom";
import '../styles/Login.css';
import axios from "axios";

const Register = (props) => {
    const [username, setName] = useState();
    const [password, setPassword] = useState();
    const [password1, setPassword1] = useState();
    const [users, setUsers] = useState(null);
    const [registered, setregistered] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('http:///localhost:4000/api/users');

            const json = await response.json();

            if(response.ok) {
                setUsers(json);
            }
        }
        fetchUsers()
    }, [users])

    function submit(e) {
        if (verify()) {
            sendRequest(e);
            setregistered(true);
        }
    }

    function sendRequest(e) {
        e.preventDefault()
        axios.post('http://localhost:4000/api/users', {username, password, isAdmin})
        .then(result => console.log(result))
        .catch(err => console.log(err));
    }

    function verify() {
        for (let index = 0; index < users.length; index++) {
            if (JSON.stringify(username) === undefined) {
                alert("please fill the fields")
                return false

            }
            if (JSON.stringify(users[index].username).toLowerCase() === JSON.stringify(username).toLowerCase()) {
                alert("username taken")
                return false
            }
        }
        if (password !== password1) {
            alert('Passwords do not match!')
            return false
        }
        return true
    }

    const handleSubmit = (e) => {
        submit(e)
    }

    if (registered) {
            return<Navigate to="/Login"> </Navigate>;
    } else {

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
                        <input type="password" name="name" id="name" placeholder="Your Password"
                        onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div class="form-group">
                        <label for="Confirm password"></label>
                        <input type="password" name="name" id="name" placeholder="Confirm Password" 
                        onChange={(e) => setPassword1(e.target.value)}/>
                    </div>
                    <div class="form-group form-button">
                        <button onClick = {handleSubmit} >Register</button>
                    </div>
                </div>
            </div>
        </div>
</div>
    }
};

export default Register