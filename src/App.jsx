import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './Pages/Main';
import Details from './pages/Details';
import CartInfo from './pages/Cartinfo';
export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>
    },
    {
      path: "/Details/:id",
      element: <Details />
    },
    {
      path:"/Cartinfo",
      element:<CartInfo/>
    },
    {
      path: "Main",
      element: <Main/>
    }
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}