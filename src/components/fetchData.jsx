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
   const allfetchData=async()=>{
         const userData=await axiosInstance.get(`/standup/allData`);
         console.log(userData)
         setData(userData.data.data)
      }
   useEffect(() => {
      allfetchData()
   }, [selectDate])
   return (
      <div className="space-y-10 p-15">
         <div className="flex justify-between">
            <div className="text-2xl text-blue-600 font-medium">All Employee StandUP Details </div>

            <div className="flex justify-between w-80">
               <input type="date" value={selectDate} className="border px-8 py-2 rounded-xl" onChange={(e) => { setSelectDate(e.target.value) }} />
               <button className="rounded-xl bg-blue-500 text-white px-7 py-2" onClick={fetchByDate}>Submit
               </button>
            </div>
         </div>
         <div className="flex justify-between px-3 py-3 bg-gray-200 rounded-xl">
            <div>Name</div>

            <div className="">Today</div>
            <div>Yesterday</div>
            <div>Blockers</div>
         </div>

         {
            Data.map((a) => {
               return (
                  <div className="flex justify-between ">
                     <div className="w-42">{a.userId.name}</div>

                     <div className="w-42">{a.today}</div>
                     <div className="w-42">{a.yesterday}</div>
                     <div className="w-42">{a.blockers}</div>
                  </div>
               )
            })
         }



      </div>
   )
}

export default FetchData