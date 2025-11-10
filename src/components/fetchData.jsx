import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { toast } from "react-toastify";



export const FetchData = () => {
   const [selectDate, setSelectDate] = useState()
   const [Data, setData] = useState([])
   const fetchByDate = async () => {
      const result = await axiosInstance.get(`/standup/date?date=${selectDate}`);
      if (result) {
         console.log(result.data);

         setData(result.data.data)
         if (result.data.success == "true") {
            toast.success("fetch the data")

         } else {
            toast.error(result.data.message)

         }
      }



   }
   const allfetchData = async () => {
      const userData = await axiosInstance.get(`/standup/allData`);
      console.log(userData)
      setData(userData.data.data)
   }
   useEffect(() => {
      allfetchData()
   }, [])
   return (
      <div className="space-y-10 p-10">
         <div className="flex justify-between">
            <div className="text-2xl text-blue-600 font-medium">All Employee StandUP Details </div>

            <div className="flex justify-between gap-3">
               <input type="date" value={selectDate} className="border px-8 py-2 rounded-xl" onChange={(e) => { setSelectDate(e.target.value) }} />
               <button className="rounded-xl bg-blue-500 text-white px-7 py-2" onClick={fetchByDate}>Submit
               </button>
               <button className="rounded-xl bg-blue-500 text-white px-7 py-2" onClick={allfetchData}>All Data
               </button>
            </div>
         </div>
         <div className="flex justify-between px-7 py-3 bg-gray-200 rounded-xl gird grid-cols-5 text-center">
            <div>Name</div>

            <div>Today</div>
            <div>Yesterday</div>
            <div>Blockers</div>
            <div>Date</div>
         </div>

         {
            Data?.map((a) => {
               const date = a.date.split('T')[0]
               console.log(date)
               return (
                  <div className="flex justify-between grid grid-cols-5 gap-3">
                     <div className="text-center">{a.userId.name}</div>

                     <div className="">{a.today}</div>
                     <div className="">{a.yesterday}</div>
                     <div className="text-center">{a.blockers}</div>
                     <div className="text-center">{date}</div>

                  </div>
               )
            })
         }



      </div>
   )
}

export default FetchData