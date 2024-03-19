import React, { useEffect, useState } from "react";
import Header from "../HeaderFooter/Header";
import Footer from "../HeaderFooter/Footer";
import Sidebar from "../HeaderFooter/Sidebar";
import "../../styles/Forside.css";
import { NavLink } from "react-router-dom";
import { FilterProvider } from "../FilterProvider";
import sidetabimg from "../../bilder/sidetab.png";
import axios from "axios";

export default function Layout({ content, sidebarToggle = 2 }) {

  const [user, setUser] = useState(null);
  const bruker = localStorage.getItem("loggedIn");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/users/find/${bruker}`);
        const userData = response.data;

        if (response.status === 200) {
          setUser(userData);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [bruker]);

  //sidebarToggle:
  // 2 = sidebar på
  // 1 = sidebar sjult
  // 0 = sidebar vekke
  // let location = useLocation()

  let className = "";

  if (sidebarToggle < 2) {
    className = "loginMain";
  } else {
    className = "defaultMain";
  }

  return (
    <div>
      <Header />
      <FilterProvider>
        {sidebarToggle === 2 && <Sidebar />}
        {sidebarToggle === 1 && (
          <div class="links">
            <NavLink id="sidebarOnButton" to="/">
              <div id="sidetab1">
                <img id="sidetabimg1" src={sidetabimg} alt="IMG goes here"></img>
              </div>
            </NavLink>
          </div>
        )}
        <main class={className}>{content}</main>
      </FilterProvider>
      <div>
        <Footer />
      </div>
    </div>
  );
}
