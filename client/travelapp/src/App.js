import React from 'react';
import Header from './components/HeaderFooter/Header';
import Footer from './components/HeaderFooter/Footer';
import { BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';

function App(){
    return(
        <>
        <Layout content={<p> my text</p>}/>
        
        </>
    );
}

export default App;