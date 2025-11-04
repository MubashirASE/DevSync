import { useContext, useEffect } from "react";
import { MyContext } from "../contextData/contextData";
import StandupData from "./standupData";
import Login from "./login";
import FetchData from "./fetchData";
import { Link } from "react-router-dom";


const Home = () => {
    const { globalData, fetchData } = useContext(MyContext);
    console.log("userDarara", globalData?.role)
    useEffect(() => {
        fetchData()
    }, [])
    return (
        <div className="flex ">
            <div className="h-180 w-70 px-15 flex-col space-y-6 pt-6" >
                <div className="text-xl font-bold text-gray-400">Dashboard</div>
                <div className="text-sl font-bold text-gray-400"><Link to='/standup'>StandUp Form</Link></div>
                <div className="text-sl font-bold text-gray-400"><Link to='/codeReview'>CodeReview Form</Link></div>

                

            </div>
            <div className="h-180 w-full bg-gray-100 pt-5">

                {
                    globalData?.role === "employee" ?
                        <StandupData />
                        : <FetchData />
                }

            </div>
        </div>
    );
};

export default Home;
