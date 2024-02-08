import React from 'react'
import Header from '../HeaderFooter/Header';
import Footer from '../HeaderFooter/Footer';
import Sidebar from '../HeaderFooter/Sidebar';

export default function Layout({content}) {
  return (
    <div>
      <Header />  
      <content/>
      <Footer />
    </div>
  )
}