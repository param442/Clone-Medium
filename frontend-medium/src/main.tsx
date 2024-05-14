import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import Signin from "./Routes/Signin.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Singnup from "./Routes/Singnup.tsx";
import Home from "./componenet/Home.tsx";
import WriteArticle from "./componenet/WriteArticle.tsx";
import ArticlePage from "./componenet/ArticlePage.tsx";

const routes = [
  {
    path: "/",
    element: <App />,
    loader: async () => {
      return (
        <>
          <h1>loading..</h1>
        </>
      );
    },
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/post",
        element: <WriteArticle />,
      },
      {
        path: "blog/:id",
        element: <ArticlePage />,
      },
    ],
  },
  {
    path: "/signup",
    element: <Singnup />,
    loader: async () => {
      return (
        <>
          <h1>loading..</h1>
        </>
      );
    },
  },
  {
    path: "/signin",
    element: <Signin />,
    loader: async () => {
      return (
        <>
          <h1>loading..</h1>
        </>
      );
    },
  },
];
const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
