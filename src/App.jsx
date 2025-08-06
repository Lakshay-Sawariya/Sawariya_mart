import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './Pages/Main';
import Details from './pages/Details';
import Cart from './Feature/Cart/Cart'
import Account from './pages/Account';
import Wishlist from './pages/Wishlist';
export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />
    },
    {
      path: "/Details/:id",
      element: <Details />
    },
    {
      path: "/Cart",
      element: <Cart />
    },
    {
      path: "/Main",
      element: <Main />
    },
    {
      path: "/Wishlist",
      element: <Wishlist />
    },
    {
      path: "/Account",
      element: <Account />
    }

  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
