import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Root from './Components/Root.jsx';
import Home from './Components/Home.jsx';
import AuthProvider from './Components/AuthProvider.jsx';
import Login from './Components/Login.jsx';
import Register from './Components/Register.jsx';
import Challenges from './Components/Challenges.jsx';
import { ToastContainer } from 'react-toastify';
import Privateroute from './Components/Privateroute.jsx';
import Profile from './Components/Profile.jsx';
import Myactivities from './Components/Myactivities.jsx';
import Allchallenges from './Components/Allchallenges.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [{
      index: true,
      Component: Home
    }, {
      path: "/register",
      Component: Register
    }, {
      path: '/login',
      Component: Login
    }, {
      path: '/allchallenges',
      Component: Allchallenges
    }, {
      path: "/profile",
      element: <Privateroute><Profile></Profile></Privateroute>
    }, {
      path: "/myactivities",
      element: <Privateroute><Myactivities></Myactivities></Privateroute>
    }
      , {
      path: "/allchallenges",
      element: <Privateroute><Allchallenges></Allchallenges></Privateroute>
    }]
  },
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>  <RouterProvider router={router} /></AuthProvider>
    <ToastContainer />
  </StrictMode>,
)
