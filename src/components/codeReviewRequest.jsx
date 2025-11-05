import { useContext, useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance.jsx";
import { MyContext } from "../contextData/contextData.jsx";

const CodeReviewRequest = () => {
    const { globalData, fetchData } = useContext(MyContext);
    console.log("userDarara", globalData?.role)

    const [data, setData] = useState([]);
    const [value, setValue] = useState(["true"]);
    const [statusData, setStatusData] = useState(["Reviewer", "Merge"]);


    const handleStatusChange = async (id, status) => {
        setData(prev =>
            prev.map(item =>
                item._id === id ? { ...item, status: status } : item
            )
        );

        console.log("Selected status:", id, status);
        console.log(data)
        const userData = await axiosInstance.post(`/review/updateReview`, { id, status });
        console.log(userData)
    };
    const handleIsDone = async (id, isDone) => {
        setData(prev =>
            prev.map(item =>
                item._id === id ? { ...item, isDone: isDone } : item

            )
        );

        console.log("Selected status:", id, isDone);
        console.log("isDone", data)
        const userData = await axiosInstance.post(`/review/updateReview`, { id, isDone });
        console.log(userData)
    };
    const allfetchingData = async () => {
        if (globalData?.role == "employee") {

            const user = await axiosInstance.get(
                "review/allCodeReview"
            );
            setData(user.data.data)
            console.log(user.data.data)
            console.log(statusData)
        } else {

            const userData = await axiosInstance.get(`/review/allReviewer`);
            console.log(userData)
            setData(userData.data.data)
        }

    }


    useEffect(() => {
        fetchData()
        allfetchingData();

    }, []);
    useEffect(() => {
        console.log(data)
    }, []);


    return (
        <>
            <div className="space-y-10 p-15 bg-gray-100">
                <div className="text-2xl text-blue-600">PR Requrest</div>


                {
                    globalData?.role === "employee" ?
                        <div>
                            <div className="flex text-center px-7 py-3 bg-gray-200 rounded-xl grid grid-cols-5 gap-7">
                                <div>DeveloperName</div>
                                <div className="">PR Link</div>
                                <div>Reviewer</div>
                                <div>Status</div>
                                <div>isDone</div>
                            </div>

                            {
                                data?.map((a) => {
                                    return (
                                        <div className="flex text-center justify-center px-7 py-2 bg-gray-200 rounded-xl grid grid-cols-5 gap-7 mt-5">
                                            <div className=" break-words">{a.developerName}</div>
                                            <div className=" row-span-3 row-span-2 break-words">{a.prLink}</div>
                                            <div className=" break-words">{a.reviewer}</div>
                                            <div className="">
                                                <select
                                                    value={a.status || ""}
                                                    onChange={(e) => handleStatusChange(a._id, e.target.value)}
                                                >
                                                    <option value="">Pending</option>

                                                    {statusData.map((e, i) => (
                                                        <option key={i} value={e}>
                                                            {e}
                                                        </option>
                                                    ))}
                                                </select>


                                            </div>
                                            <div className="">
                                                <select
                                                    value={a.isDone}
                                                    onChange={(e) => handleIsDone(a._id, e.target.value)}
                                                >
                                                    <option value="">false</option>

                                                    {value.map((e, i) => (
                                                        <option key={i} value={e}>
                                                            {e}
                                                        </option>
                                                    ))}
                                                </select>

                                            </div>

                                        </div>
                                    )
                                })
                            }
                        </div> : <div>
                            <div className="flex text-center px-7 py-3 bg-gray-200 rounded-xl grid grid-cols-5 gap-7">
                                <div>DeveloperName</div>
                                <div className="">PR Link</div>
                                <div>Reviewer</div>
                                <div>Status</div>
                                <div>isDone</div>
                            </div>

                            {
                                data?.map((a, i) => {
                                    return (
                                        <div key={i} className="flex text-center px-7 py-2 bg-gray-200 rounded-xl grid grid-cols-5 mt-5">
                                            <div className=" break-words">{a.developerName}</div>
                                            <div className=" row-span-3 row-span-2 break-words">{a.prLink}</div>
                                            <div className=" break-words">{a.reviewer}</div>
                                            <div className="">
                                                {a.status}


                                            </div>
                                            <div className="">{a.isDone}
                                            </div>

                                        </div>
                                    )
                                })
                            }
                        </div>
                }
            </div>

        </>
    )
}

export default CodeReviewRequest