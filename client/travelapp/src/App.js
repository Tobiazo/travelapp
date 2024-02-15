import logo from './logo.svg';
import './App.css';
import './styles/DestinasjonsBoks.css'
import { BrowserRouter, Link, NavLink, Route, Routes, createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Layout from './components/Layout/Layout'
import Destinasjonsside from './pages/Destinasjonsside';



function App() {


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout content={<Home />}/>
    },
    {
      path: "/Login",
      element: <Layout content={<Login />}/>
  },
  {
    path: "/destinations/:id",
    element: <Layout content={<Destinasjonsside />}/>
    }

  ])

  return (

      <RouterProvider router = {router} />
      
  );
}

export default App;
