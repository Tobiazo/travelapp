import logo from './logo.svg';
import './App.css';
import './styles/DestinasjonsBoks.css'
import { BrowserRouter, Link, NavLink, Route, Routes, createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Layout from './components/Layout/Layout'



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
    path: "/Paris",
    element: <Layout content={"Dette er parissiden"}/>
    }

  ])

  return (

      <RouterProvider router = {router} />
      
  );
}

export default App;
