import React from 'react'
import Header from '../HeaderFooter/Header';
import Footer from '../HeaderFooter/Footer';

export default function Layout({content}) {
  return (
    <div>
      <Header />

      <Footer />
    </div>
  )
}