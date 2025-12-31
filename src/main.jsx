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
import Myactivities from './Components/Myactivities.jsx';
import Allchallenges from './Components/Allchallenges.jsx';
import Challengedetails from './Components/Challengedetails.jsx';
import Errorpage from './Components/Errorpage.jsx';
import Footer from './Components/Footer.jsx';

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
    },
    {
      path: "/allchallenges",
      element: <Privateroute><Allchallenges></Allchallenges></Privateroute>
    },
    {
      path: '/challenges/:id',
      Component: Challengedetails,
      loader: ({ params }) => {
        return fetch(`https://ecotrack-server-side.vercel.app/challenges/${params.id}`)
      }
    },
    {
      path: 'allchallenges/challenges/:id',
      Component: Challengedetails,
      loader: ({ params }) => {
        return fetch(`https://ecotrack-server-side.vercel.app/challenges/${params.id}`)
      }
    },
    {
      path: '/myactivities/:email',
      element: <Privateroute><Myactivities></Myactivities></Privateroute>,
    }
    ]
  }, {
    path: "*",
    Component: Errorpage
  }, {
    path: "/footer",
    Component: Footer
  }
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>  <RouterProvider router={router} /></AuthProvider>
    <ToastContainer />
  </StrictMode>,
)
