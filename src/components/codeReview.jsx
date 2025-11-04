import { useContext, useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance.jsx";
import { toast } from "react-toastify";
import { MyContext } from "../contextData/contextData.jsx";

const CodeReviewer = () => {

    const [data, setData] = useState([])
    const { globalData, fetchData } = useContext(MyContext);
    const [review, setReview] = useState({
        developerName: "",
        prLink: "",
        reviewer: ""
    });
    const [allData, setAllData] = useState([])

    const handleChange = (e) => {
        setReview({ ...review, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
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
        const user = await axiosInstance.get(
            "user/allUserData"
        );
        setData(user.data.data)
        console.log(user.data.data)
    }
    const allfetchData = async () => {
        const developerName = globalData.name
        const userData = await axiosInstance.post(`review/allReview`, { developerName });
        console.log(userData.data)
        console.log("userData=>>>>>>", userData.data.data)
        setAllData(userData.data.data)
        console.log(allData)

    }
    useEffect(() => {
        allfetchingData();
        if (globalData?.name) {
            setReview(prev => ({ ...prev, developerName: globalData.name }));
            allfetchData();
        }
    }, [globalData]);


    return (
        <>
            <div className="space-y-10 p-15 bg-gray-100">
                <div className="text-2xl text-blue-600">Code Review Tracker</div>

                <div className="flex flex-row justify-between">
                    <input
                        type="text"
                        name="developerName"
                        value={globalData?.name}
                        className="p-1.5"
                        disabled
                    />

                    <input
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
                                {user.name} ({user.email})
                            </option>
                        ))}
                    </select>




                    <button className="rounded-xl bg-blue-500 text-white px-7 py-2" onClick={handleSubmit}>Submit
                    </button>

                </div>
                <div className="flex text-center px-7 py-3 bg-gray-200 rounded-xl grid grid-cols-5 gap-7">
                    <div>developerName</div>

                    <div className="">PR Link</div>
                    <div>Reviewer</div>
                    <div>Status</div>
                    <div>isDone</div>
                </div>

                {
                    allData.map((a) => {
                        return (
                            <div className="flex text-center px-7 py-2 bg-gray-200 rounded-xl grid grid-cols-5 gap-7">
                                <div className=" break-words">{a.developerName}</div>
                                <div className=" row-span-3 row-span-2 break-words">{a.prLink}</div>
                                <div className=" break-words">{a.reviewer}</div>
                                <div className="">{a.status}</div>
                                <div className="">{a.isDone}</div>

                            </div>
                        )
                    })
                }
            </div>

        </>
    )
}

export default CodeReviewer