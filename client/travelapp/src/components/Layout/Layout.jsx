import React from "react";
import Header from "../HeaderFooter/Header";
import Footer from "../HeaderFooter/Footer";
import Sidebar from "../HeaderFooter/Sidebar";
import "../../styles/Forside.css";
import { NavLink } from "react-router-dom";
import { FilterProvider } from "../FilterProvider";
import sidetabimg from "../../bilder/sidetab.png";

export default function Layout({ content, sidebarToggle = 2 }) {
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
