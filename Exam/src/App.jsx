import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout/layout";
import Home from "./home/home";
import Homebyid from "./home/homebyid/homebyid";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children: [
        {
         path:"/home",
          element: <Home />,
        },
        {
          path: "/home/:id",
          element: <Homebyid />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>
};

export default App;
