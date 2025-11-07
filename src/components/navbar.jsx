import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../contextData/contextData";
import { useState } from "react";
import { io } from "socket.io-client";

let socket; 

const Navbar = () => {
  const { globalData, fetchData } = useContext(MyContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (globalData) {
      socket = io("http://localhost:5000");
      socket.emit("user:connected", globalData?.id);
    }
  }, [globalData]);

  const removeData = async () => {
    if (socket) {
      socket.emit("user:logout", globalData?.id);
      socket.disconnect(); 
      console.log("Socket disconnected manually on logout");
    }

    localStorage.clear();
    fetchData();
    navigate("/login");
  };

  return (
    <div className="flex flex-row justify-between m-6">
      <div className="text-2xl font-bold text-blue-600 ms-9">
        <Link to="/">DevSync</Link>
      </div>
      {!globalData ? (
        <div className="space-x-6">
          <Link to="/signup">
            <button className="rounded-xl bg-blue-500 text-white px-7 py-2">
              SignUp
            </button>
          </Link>
          <Link to="/login">
            <button className="rounded-xl bg-blue-500 text-white px-7 py-2">
              Login
            </button>
          </Link>
        </div>
      ) : (
        <button
          className="rounded-xl bg-blue-500 text-white px-7 py-2"
          onClick={removeData}
        >
          Logout
        </button>
      )}
    </div>
  );
};
export default Navbar;
