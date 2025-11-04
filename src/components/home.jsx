import { useState } from "react";
import { Link, Outlet } from "react-router-dom";


const Home = () => {
    const [textColor,setTextColor]=useState('')
    const handleChange=()=>{
    setTextColor(textColor === 'text-gray-400 text-sl font-bold' ? 'text-blue-500 text-sl font-bold' : 'text-gray-400 text-sl font-bold')
    
    }
    return (
        <div className="flex ">
            <div className="h-180 w-60 px-15 flex-col space-y-6 pt-6" >
                <div className="text-xl text-blue-700 font-bold text-gray-400">Dashboard</div>
                
                <div className={textColor} onClick={handleChange}><Link to='/home/standup'>StandUp Form</Link></div>
                <div className={textColor} onClick={handleChange}><Link to='/home/codeReview'>Code Reviewer</Link></div>
                <div className={textColor} onClick={handleChange}><Link to='/home/codeReviewRequest'>PR Request (Me)</Link></div>

                

            </div>
            <div className="h-180 w-full bg-gray-100 pt-5">
                <Outlet/>
            </div>
            
        </div>
    );
};

export default Home;
