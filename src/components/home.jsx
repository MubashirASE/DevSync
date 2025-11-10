import { useContext, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { MyContext } from "../contextData/contextData";
import { useState } from "react";

const Home = () => {
  const { globalData, fetchData } = useContext(MyContext);
  const [textColor, setTextColor] = useState("");


  useEffect(() => {
    fetchData();
  }, []);


  const handleChange = () => {
    setTextColor((prev) =>
      prev === "text-gray-400 text-sm font-bold"
        ? "text-blue-500 text-lg font-bold"
        : "text-gray-400 text-lg font-bold"
    );
  };

  return (
    <div className="flex">
      <div className="h-full w-60 px-10 flex-col space-y-10 pt-8">
        <Link to={globalData?.role === "admin" ? "/admin" : ""}>
          <div className="text-xl text-blue-700 font-bold text-gray-400">
            Dashboard
          </div>
        </Link>

        <Link to={globalData?.role === "employee" ? "" : "/allStandUps"}>
          <div
            className="text-gray-400 text-lg font-bold hover:text-blue-700 pt-5"
            onClick={handleChange}
          >
            StandUp
          </div>
        </Link>
        <Link to="/codeReview">
          <div
            className="text-gray-400 text-lg font-bold hover:text-blue-700 pt-3"
            onClick={handleChange}
          >
            Code Reviewer
          </div>
        </Link>
        <Link to="/codeReviewRequest">
          <div
            className="text-gray-400 text-lg font-bold hover:text-blue-700 pt-3"
            onClick={handleChange}
          >
            PR Request
          </div>
        </Link>
        <Link to="/quickLinks">
          <div
            className="text-gray-400 text-lg font-bold hover:text-blue-700 pt-3"
            onClick={handleChange}
          >
            Quick Link
          </div>
        </Link>

      </div>

      <div className="h-full w-full bg-gray-100 pt-5">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
