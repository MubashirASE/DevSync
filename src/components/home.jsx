import { useState } from "react";
import { Link, Outlet } from "react-router-dom";


const Home = () => {
    const [textColor, setTextColor] = useState('')
    const handleChange = () => {
        setTextColor(textColor === 'text-gray-400 text-sm font-bold' ? 'text-blue-500 text-lg font-bold' : 'text-gray-400 text-lg font-bold')

    }
    return (
        <div className="flex ">
            <div className="h-180 w-60 px-10 flex-col space-y-10 pt-6" >
                <div className="text-xl text-blue-700 font-bold text-gray-400">Dashboard</div>

                <Link to='/standup'><div className="text-gray-400 text-lg font-bold hover:text-blue-700 " onClick={handleChange}>StandUp Form</div></Link>
                <Link to='/codeReview'><div className="text-gray-400 text-lg font-bold hover:text-blue-700 pt-3" onClick={handleChange}>Code Reviewer</div></Link>
                <Link to='/codeReviewRequest'><div className="text-gray-400 text-lg font-bold hover:text-blue-700 pt-3" onClick={handleChange}>PR Request</div></Link>
                <Link to='/quickLinks'><div className="text-gray-400 text-lg font-bold hover:text-blue-700 pt-3" onClick={handleChange}>Quick Link</div></Link>



            </div>
            <div className="h-180 w-full bg-gray-100 pt-5">
                <Outlet />
            </div>

        </div>
    );
};

export default Home;
