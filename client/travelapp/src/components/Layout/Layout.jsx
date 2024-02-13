import React from 'react'
import Header from '../HeaderFooter/Header';
import Footer from '../HeaderFooter/Footer';
import '../../styles/Forside.css';


export default function Layout({content}) {
  return (
    <div>
      <Header />
      
        <main>
        {content}
        </main>
        <div>
      <Footer />
      </div>
    </div>
  )
}
