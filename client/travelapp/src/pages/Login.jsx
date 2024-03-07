import React, { useState, useEffect } from "react";
import { NavLink, json, Navigate } from "react-router-dom";
import "../styles/Login.css";

const Login = (props) => {
  const [username, setName] = useState();
  const [password, setPassword] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("http:///localhost:4000/api/users");
      const json = await response.json();

      if (response.ok) {
        setUsers(json);
      }
    };
    fetchUsers();
  }, []);

  const handleLogin = (e) => {
    for (let index = 0; index < users.length; index++) {
      if (JSON.stringify(users[index].username) === JSON.stringify(username)) {
        if (
          JSON.stringify(users[index].password) === JSON.stringify(password)
        ) {
          for (let index = 0; index < users.length; index++) {
            if (
              JSON.stringify(users[index].username).toLowerCase() ===
              JSON.stringify(username).toLowerCase()
            ) {
              localStorage.setItem("loggedIn", users[index]._id);
              setLoggedIn(true);
              return;
            }
          }
          return;
        }
        alert("Feil passord");
        return;
      }
    }
    alert("Brukernavnet eksisterer ikke");
  };

  if (!loggedIn) {
    return (
      <div class="main-container">
        <div class="container">
          <div class="signup-content">
            <div class="signup-form">
              <h2 class="form-title">Log in</h2>
              <div class="form-group">
                <label class="loginLabel" for="Username"></label>
                <input
                  type="text"
                  name="Username"
                  id="name"
                  placeholder="Your Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div class="form-group">
                <label class="loginLabel" for="Password"></label>
                <input
                  type="password"
                  name="Password"
                  id="name"
                  placeholder="Your Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div class="form-group form-button">
                <button onClick={handleLogin}>Log In</button>
              </div>
              <div class="form-group form-button">
                <NavLink to="/Register" style={{ textDecoration: "none" }}>
                  <button>New? Register here</button>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <Navigate to="/"> </Navigate>;
  }
};

export default Login;
