import './App.css';
import './styles/DestinasjonsBoks.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Layout from './components/Layout/Layout'
import Destinasjonsside from './pages/Destinasjonsside';
import NewDestination from './pages/NewDestination';
import MineVurderinger from './pages/MineVurderinger';
import MineDestinasjoner from './pages/MineDestinasjoner';
import AnbefalteDestProvider  from './components/AnbefalteDestProvider';
import { useState } from 'react';

function App() {

  const [visAnbefalinger, setVisAnbefalinger] = useState("Vis Anbefalinger");

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout content={<Home />} />
    },
    {
      path: "/noSidebar",
      element: <Layout content={<Home />} sidebarToggle={1}/>
    },
    {
      path: "/Login",
      element: <Layout content={<Login />} sidebarToggle={0}/>
    }, 
    {
      path: "/Register",
      element: <Layout content={<Register />} sidebarToggle={0}/>

  },
  {
    path: "/destinations/:id",
    element: <Layout content={<Destinasjonsside />} sidebarToggle={0} />
    }, 

    {
      path: "/newDestination",
      element: <Layout content={<NewDestination />}sidebarToggle={false}/>
  }, 

  {
    path: "/minevurderinger",
    element: <Layout content={<MineVurderinger />}sidebarToggle={false}/>
  },

  {
    path: "/minedestinasjoner",
    element: <Layout content={<MineDestinasjoner />}sidebarToggle={false}/>
  }

  ])

  return (
    
      <AnbefalteDestProvider value={{visAnbefalinger, setVisAnbefalinger}}>
        <RouterProvider router = {router} />
      </AnbefalteDestProvider> 
      
  );
}

export default App;
