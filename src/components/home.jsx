import { useContext, useEffect } from "react";
import { MyContext } from "../contextData/contextData";
import StandupData from "./standupData";
import Login from "./login";
import FetchData from "./fetchData";


const Home = () => {
    const { globalData ,fetchData} = useContext(MyContext);
    console.log(globalData?.role)
    useEffect(()=>{
fetchData()
    },[])
    return (
        <div className="flex ">
            <div className="h-180 w-70  flex justify-center pt-5" >
                <div className="text-xl font-bold text-gray-400">Dashboard</div>

            </div>
             <div className="h-180 w-full bg-gray-100 pt-5">

            {
                globalData?.role === "employee" ? 
                <StandupData />
                : <FetchData/>
            }
             
            </div>
        </div>
    );
};

export default Home;
