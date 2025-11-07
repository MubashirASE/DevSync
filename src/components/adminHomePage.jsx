import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

export const AdminHomePage = () => {
  const [Data, setData] = useState();
  const [allReview, setAllReview] = useState({});
  const [member,setMember]=useState()
  const allfetchData = async () => {
    let count = 0;
    const nowDate = new Date();
    const year = nowDate.getFullYear();
    const month = nowDate.getMonth() + 1;
    const day = nowDate.getDate();

    const userData = await axiosInstance.get(`/standup/allData`);
    const result = userData.data.data;

    result.map((e) => {
      const date = e.date.split("T")[0];
      const newData = `${year}-${month}-0${day}`;
      console.log("newData",newData)
      console.log(date)
      if (date === newData) {
        count = count + 1;
      }
    });
    setData(count);
  };
  const allActiveTeam=async()=>{
      let activeTeam=0

    const userData = await axiosInstance.get(`/user/allUserData`);
    const data = userData.data.data;
    data.map((e)=>{
      if(e.isActive===true){
        activeTeam=activeTeam+1
      }
    })
    setMember(activeTeam)
  }
  const allCodeReview = async () => {
    let reviewData = {
      inReview: 0,
      Merge: 0,
      Pending: 0,
    };
    const userData = await axiosInstance.get(`/review/allReviewer`);
    const data = userData.data.data;

    data.map((e) => {
      if (e.status === "Pending") {
        reviewData.Pending++;
      } else if (e.status === "Merge") {
        reviewData.Merge++;
      } else if (e.status === "in Review") {
        reviewData.inReview++;
      }
    });
    setAllReview(reviewData);
  };

  useEffect(() => {
    allfetchData();
    allCodeReview();
    allActiveTeam()
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-8 bg-gray-50">
      <div className="flex flex-col justify-between items-center p-6 bg-white shadow-md rounded-2xl border border-blue-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
        <div className="text-lg font-semibold text-blue-600">Active Team Members</div>
        <div className="text-4xl font-bold text-gray-800 mt-2">{member}</div>
      </div>

      <div className="flex flex-col justify-between items-center p-6 bg-white shadow-md rounded-2xl border border-blue-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
        <div className="text-lg font-semibold text-blue-600">Today's StandUp</div>
        <div className="text-4xl font-bold text-gray-800 mt-2">{Data}</div>
      </div>

      <div className="flex flex-col justify-between p-6 bg-white shadow-md rounded-2xl border border-blue-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
        <div className="text-lg font-semibold text-blue-600 mb-3">Total PR</div>
        <div className="space-y-2">
          <div className="flex justify-between text-gray-700">
            <span>In Review</span>
            <span className="font-semibold text-blue-500">{allReview.inReview}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Merge</span>
            <span className="font-semibold text-green-500">{allReview.Merge}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Pending</span>
            <span className="font-semibold text-red-500">{allReview.Pending}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center p-6 bg-white shadow-md rounded-2xl border border-blue-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
        <div className="text-lg font-semibold text-blue-600">All User Data</div>
        <div className="text-gray-500 text-sm mt-1">(Details coming soon)</div>
      </div>
    </div>
  );
};

export default AdminHomePage;
