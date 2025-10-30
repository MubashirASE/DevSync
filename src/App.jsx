import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import SignUp from "./components/signup";
import Login from "./components/login";
import MainLayout from "./layout/mainlayout";
import Home from "./components/home";

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout/>,
      children: [
        {
          path: "signup",
          element: <SignUp/>,
        },
        {
          path: "login",
          element: <Login/>,
        },
        {
          path:"home",
          element:<Home/>
        }
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;