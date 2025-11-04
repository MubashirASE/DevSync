import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance.jsx";
import { MyContext } from "../contextData/contextData.jsx";

const CodeReviewRequest = () => {

    const [data, setData] = useState([]);
    const [value, setValue] = useState(["true"]);
    const [statusData, setStatusData] = useState(["Merge", "Reviewer"]);


    const handleStatusChange = (id, newStatus) => {
        setData(prev =>
            prev.map(item =>
                item._id === id ? { ...item, status: newStatus } : item
            )
        );

        console.log("Selected status:", id, newStatus);
        console.log(data)
    };
    const handleIsDone= (id, newDone) => {
        setData(prev =>
            prev.map(item =>
                item._id === id ? { ...item, isDone: newDone } : item
            )
        );

        console.log("Selected status:", id, newDone);
        console.log(data)
    };
    const allfetchingData = async () => {
        const user = await axiosInstance.get(
            "review/allCodeReview"
        );
        setData(user.data.data)
        console.log(user.data.data)
        console.log(statusData)
    }

    useEffect(() => {
        allfetchingData();

    }, []);
    useEffect(() => {
                console.log(data)

    }, [statusData]);


    return (
        <>
            <div className="space-y-10 p-15 bg-gray-100">
                <div className="text-2xl text-blue-600">PR Requrest (Me)</div>


                <div className="flex text-center px-7 py-3 bg-gray-200 rounded-xl grid grid-cols-5 gap-7">
                    <div>DeveloperName</div>
                    <div className="">PR Link</div>
                    <div>Reviewer</div>
                    <div>Status</div>
                    <div>isDone</div>
                </div>

                {
                    data.map((a) => {
                        return (
                            <div className="flex text-center px-7 py-2 bg-gray-200 rounded-xl grid grid-cols-5 gap-7">
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
                                        value={a.status || ""}
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
            </div>

        </>
    )
}

export default CodeReviewRequest