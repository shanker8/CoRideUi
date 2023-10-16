import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Login } from "./components/Login.jsx";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Register from './components/Register';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/Register',
    element: <Register />,
  },
  ]);
      const root = ReactDOM.createRoot(document.getElementById('root'));
      root.render(<RouterProvider router={router} />);
