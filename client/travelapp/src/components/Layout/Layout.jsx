import React from 'react'
import Header from '../HeaderFooter/Header';
import DropdownProfile from '../HeaderFooter/DropdownProfile';
import Footer from '../HeaderFooter/Footer';
import Button from '../HeaderFooter/Button';
import Sidebar from '../HeaderFooter/Sidebar';
import '../../styles/Forside.css';
import { useLocation } from 'react-router-dom';

export default function Layout({content, sidebarToggle = true}) {

  let location = useLocation()
  let className = ""

  if (location.pathname === '/Login') {
    className = 'loginMain';
  } else if (location.pathname === '/Register') {
    className = 'loginMain';
  } else if (location.pathname === '/Upload') {
    className = 'loginMain'
  }else{
    className = 'defaultMain';
  }
  return (
    <div>
       
        <Header />

      {sidebarToggle && <Sidebar/>}
      
       <main class={className}>
        {content}
        </main>
        <div>
          <DropdownProfile />
      <Footer />
      </div>

    </div>
  )
}
