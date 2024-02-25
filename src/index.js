import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import TestPoling from './components/TestPoling';
import ManageListComponent from './components/ManageListComponent';



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/list",
    element : <ManageListComponent />
  },
  {
    path: "/list/poll",
    element: <TestPoling />
  }
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>
);
