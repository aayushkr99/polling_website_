import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import List from "./components/List"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import TestPoling from './components/TestPoling';



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/list",
    element : <List />
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
