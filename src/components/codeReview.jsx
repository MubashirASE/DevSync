import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance.jsx";
import { toast } from "react-toastify";

const CodeReviewer = () => {
    const [review, setReview] = useState({
        developerName: "",
        prLink: "",
        reviewer: ""
    });
    const [data, setData] = useState([])
    const handleChange = (e) => {
        setReview({ ...review, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(review)
        try {
            const result = await axiosInstance.post(
                "review/addReview",
                review
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
    const fetchData = async () => {
        const user = await axiosInstance.get(
            "user/allUserData"
        );
        setData(user.data.data)
        console.log(user.data.data)
    }
    useEffect(() => {
        fetchData()

    }, [])
    return (
        <>
            <div className="space-y-10 p-15">
                <div className="text-2xl text-blue-600">Daily Standup</div>

                <div className="flex flex-col space-y-10 ">
                    <textarea
                        type="text"
                        name="developerName"
                        placeholder="DeveloperName"
                        value={review.developerName}
                        onChange={handleChange}
                        className="p-1.5"
                    />

                    <textarea
                        name="prLink"
                        type="text"

                        placeholder="PR Link"
                        value={review.prLink}
                        onChange={handleChange}
                        className="p-1.5"

                    />
                    <select
                        name="reviewer"
                        value={review.reviewer}
                        onChange={(e) => {
                            setReview({ ...review, reviewer: e.target.value });
                        }}
                    >
                        <option value="">Select Reviewer</option>
                        {data.map((user) => (
                            <option key={user._id} value={user.name}>
                                {user.name}
                            </option>
                        ))}
                    </select>




                    <button className="rounded-xl bg-blue-500 text-white px-7 py-2" onClick={handleSubmit}>Submit
                    </button>

                </div>

            </div>    </>
    )
}

export default CodeReviewer