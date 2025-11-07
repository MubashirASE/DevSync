import { useContext, useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance.jsx";
import { toast } from "react-toastify";
import { MyContext } from "../contextData/contextData.jsx";

const CodeReviewer = () => {
    const [data, setData] = useState([]);
    const { globalData, fetchData } = useContext(MyContext);
    const [review, setReview] = useState({
        developerName: "",
        prLink: "",
        reviewer: [],
    });
    const [allData, setAllData] = useState([]);

    const handleChange = (e) => {
        setReview({ ...review, [e.target.name]: e.target.value });
    };

    const handleReviewerChange = (e) => {
        const value = e.target.value;
        if (review.reviewer.includes(value)) {
            setReview({
                ...review,
                reviewer: review.reviewer.filter((item) => item !== value),
            });
        } else {
            setReview({
                ...review,
                reviewer: [...review.reviewer, value],
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(review)
            const result = await axiosInstance.post("review/addReview", review);
            if (result.data.success) {
                toast.success(result.data.message);
                allfetchData();
            } else {
                toast.error(result.data.message);
            }
        } catch (err) {
            console.log(err);
            toast.error("Something went wrong");
        }
    };

    const allfetchingData = async () => {
        const user = await axiosInstance.get("user/allUserData");
        setData(user.data.data);
    };

    const allfetchData = async () => {
        const developerName = globalData.name;
        const userData = await axiosInstance.post(`review/allReview`, { developerName });
        setAllData(userData.data.data);
    };

    useEffect(() => {
        allfetchingData();
        if (globalData?.name) {
            setReview((prev) => ({ ...prev, developerName: globalData.name }));
            allfetchData();
        }
    }, [globalData]);

    return (
        <div className="h-full px-15 pt-5 bg-gray-50 ">
            <div className="text-2xl text-blue-600">Code Review Tracker</div>

            <div className="grid lg:grid-cols-5  sm:grid-cols-2 gap-4 mt-5 items-center">
                <input
                    type="text"
                    name="developerName"
                    value={globalData?.name}
                    className="p-1.5  rounded"
                    disabled
                />

                <input
                    name="prLink"
                    type="text"
                    placeholder="PR Link"
                    value={review.prLink}
                    onChange={handleChange}
                    className="p-1.5 border rounded w-40 max-h-12"
                />

                <div className="border p-2 rounded max-h-11 max-w-100 overflow-y-auto col-span-2">
                    <div className="font-semibold mb-1 pb-5">Select Reviewers:</div>
                    <div className="flex flex-col space-y-5">
                        {data.map((user) => (
                            <label key={user._id} className="flex items-center gap-2 text-sm">
                                <input
                                    type="checkbox"
                                    value={user.name}
                                    onChange={handleReviewerChange}
                                    checked={review.reviewer.includes(user.name)}
                                />
                                <span>{user.name} ({user.email})</span>
                            </label>
                        ))}
                    </div>
                </div>


                <div className="flex justify-end">
                    <button
                        className="rounded-xl bg-blue-500 text-white px-4 py-2 w-30"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-5 text-center bg-gray-100 shadow-sm border border-gray-100 rounded-lg p-3 hover:shadow-md transition-all items-center text-blue-800 mt-10">
                <div>Developer Name</div>
                <div>PR Link</div>
                <div>Reviewer(s)</div>
                <div>Status</div>
                <div>isDone</div>
            </div>

            {allData.map((a) => (
                <div
                    key={a._id}
                    className="grid grid-cols-5 text-center bg-white shadow-sm border border-gray-100 rounded-lg p-3 hover:shadow-md transition-all items-center hover:bg-gray-100"
                >
                    <div className="break-words">{a.developerName}</div>
                    <div className="break-words text-blue-700 underline cursor-pointer">
                        <a href={a.prLink} target="_blank" rel="noopener noreferrer">
                            {a.prLink}
                        </a>
                    </div>
                    <div>{a.reviewer.map((e) =>
                        <div className="ps-2">{e}</div>
                    )}</div>
                    <div>{a.status || "Pending"}</div>
                    <div>{a.isDone ? " Yes" : "No"}</div>
                </div>
            ))}
        </div>
    );
};

export default CodeReviewer;
