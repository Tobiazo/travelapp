import React from 'react'
import Header from '../HeaderFooter/Header';
import Footer from '../HeaderFooter/Footer';
import Button from '../HeaderFooter/Button';
import Sidebar from '../HeaderFooter/Sidebar';

export default function Layout({content}) {
  return (
    <div>
       
      <Header />
       <Sidebar/>
      
     
        {content}
      <Footer />
    </div>
  )
}
