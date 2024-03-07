import React from 'react'
import Header from '../HeaderFooter/Header';
import Footer from '../HeaderFooter/Footer';
import Button from '../HeaderFooter/Button';
import Sidebar from '../HeaderFooter/Sidebar';
import '../../styles/Forside.css';
import { NavLink, useLocation } from 'react-router-dom';


export default function Layout({content, sidebarToggle = 2}) {

  //sidebarToggle:
  // 2 = sidebar på
  // 1 = sidebar sjult
  // 0 = sidebar vekke
  // let location = useLocation()
  let className = ""

  if (sidebarToggle < 2){
    className = 'loginMain';
  }
  else {
    className = 'defaultMain';
  }

  // if (location.pathname === '/Login') {
  //   className = 'loginMain';
  // } else if (location.pathname === '/Register') {
  //   className = 'loginMain';
  // } else if (location.pathname === '/Upload') {
  //   className = 'loginMain'

  // }else{
  //   className = 'defaultMain';
  // }
  return (
    <div>
       
      <Header />
      {sidebarToggle==2 && <Sidebar/>}
      {sidebarToggle==1 && <div class="links"><NavLink  id="sidebarOnButton" to="/"> &lt; </NavLink></div>}
       <main class={className}>
        {content}
        </main>
        <div>
          
      <Footer />
      </div>

    </div>
  )
}
