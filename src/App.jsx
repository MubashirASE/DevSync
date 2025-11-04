import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import SignUp from "./components/signup";
import Login from "./components/login";
import MainLayout from "./layout/mainlayout";
import Home from "./components/home";
import { ToastContainer } from 'react-toastify';
import StandupData from "./components/standupData";
import CodeReviewer from "./components/codeReview";
import CodeReviewRequest from "./components/codeReviewRequest";
function App() {

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [

        {
          path: "home",
          element: <Home />,
          children: [

            {
              path: 'standup',
              element: <StandupData />
            },
            {
              path: 'codeReview',
              element: <CodeReviewer />
            }, 
            {
              path: 'codeReviewRequest',
              element: <CodeReviewRequest />

            }
          ]
        },
        {
          path: "signup",
          element: <SignUp />,
        },
        {
          path: "login",
          element: <Login />,
        }
      ],
    },
  ]);
  return (
    <>




      <RouterProvider router={appRouter} />
      <ToastContainer />
    </>
  );
}

export default App;