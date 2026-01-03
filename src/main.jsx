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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Myevents from './Components/Myevents.jsx';
import BlogsCarousel from './Components/Blogs.jsx';
import DemoCertificate from './Components/Certificate.jsx';
import DashboardLayout from './Components/DashboardLayout.jsx';
import DashboardHomepage from './Components/DashboardHomepage.jsx';
import Allstats from './Components/Allstats.jsx';

const queryClient = new QueryClient()
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
    },
    {
      path: "/myevents",
      element: <Privateroute><Myevents></Myevents></Privateroute>
    }
      ,
    {
      path: "/blogs",
      element: <BlogsCarousel></BlogsCarousel>
    },
    {
      path: "/rewards",
      element: <DemoCertificate></DemoCertificate>
    },
    {
      path: "/allstats",
      element: <Allstats></Allstats>
    },
    {
      path: "/dashboard",
      element: <Privateroute><DashboardLayout></DashboardLayout></Privateroute>,
      children: [{
        index: true,
        element: <Privateroute><DashboardHomepage></DashboardHomepage></Privateroute>
      },
      {
        path: '/dashboard/myactivities/:email',
        element: <Privateroute><Myactivities></Myactivities></Privateroute>,
      },

      {
        path: "/dashboard/myevents",
        element: <Privateroute><Myevents></Myevents></Privateroute>
      }

      ]
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
    <QueryClientProvider client={queryClient}>
      <AuthProvider>  <RouterProvider router={router} /></AuthProvider>
      <ToastContainer />
    </QueryClientProvider>
  </StrictMode>,
)
