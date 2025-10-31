import { useState } from "react";
import axiosInstance from "../api/axiosInstance.jsx";
import { toast } from "react-toastify";

const StandupData = () => {

    const [standup, setStandup] = useState({
        yesterday: "",
        today: "",
        blockers: ""
    });

    const handleChange = (e) => {
        setStandup({ ...standup, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log()
        try {
            const result = await axiosInstance.post(
                "http://localhost:5000/api/v1/standup/addStandup",
                standup
            );

            console.log(result.data);
            if (result.data.success == true) {
                toast.success(result.data.message)

            } else {
                toast.error(result.data.message)

            }
        } catch (err) {
            console.log(err);

        }
    };

    return (
        <div className="space-y-10 p-15">
            <div className="text-2xl text-blue-600">Daily Standup</div>

            <div className="flex flex-col space-y-10 ">
             <textarea
                type="text"
                name="yesterday"
                placeholder="Yesterday work"
                value={standup.yesterday}
                onChange={handleChange}
                className="p-1.5"
            />

            <textarea
                name="today"
                placeholder="Today's plan"
                value={standup.today}
                onChange={handleChange}
                className="p-1.5"

            />

            <textarea
                name="blockers"
                placeholder="Blockers?"
                value={standup.blockers}
                onChange={handleChange}
                className="p-1.5"

            />

            <button className="rounded-xl bg-blue-500 text-white px-7 py-2" onClick={handleSubmit}>Submit
            </button>

            </div>

        </div>
    );
};

export default StandupData;
