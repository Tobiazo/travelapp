import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Link, NavLink, Route, Routes, createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';



function App() {


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/Login",
      element: <Login />
  }

  ])

  return (

      <RouterProvider router = {router} />
      
  );
}

export default App;
