import React from 'react';
import Header from './components/HeaderFooter/Header';
import Footer from './components/HeaderFooter/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';

function App(){
    return(
        <>
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />} />
            <Route path="new" element={<Header />} /> 
        </Routes>
      </BrowserRouter>
        </>
    );
}

export default App;