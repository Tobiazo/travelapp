import logo from './logo.svg';
import './App.css';
import './styles/DestinasjonsBoks.css'
import { BrowserRouter, Link, NavLink, Route, Routes, createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Layout from './components/Layout/Layout'
import Destinasjonsside from './pages/Destinasjonsside';
import Upload from './pages/Upload';
import MineVurderinger from './pages/MineVurderinger';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout content={<Home />}/>
    },
    {
      path: "/Login",
      element: <Layout content={<Login />} sidebarToggle={false}/>
    }, 
    {
      path: "/Register",
      element: <Layout content={<Register />} sidebarToggle={false}/>

  },
  {
    path: "/destinations/:id",
    element: <Layout content={<Destinasjonsside />} />
    }, 

    {
      path: "/upload",
      element: <Layout content={<Upload />}sidebarToggle={false}/>
  }, 

  {
    path: "/minevurderinger",
    element: <Layout content={<MineVurderinger />}sidebarToggle={false}/>
  }

  ])

  return (

      <RouterProvider router = {router} />
      
  );
}

export default App;
