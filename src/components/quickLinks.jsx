import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { toast } from "react-toastify";

export const QuickLinks = () => {
    const [data, setData] = useState([]);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        URL: "",
        category: ""
    });
    const [editId, setEditId] = useState(null);

    const fetchByDate = async () => {
        try {
            const res = await axiosInstance.get(`/link/getData`);
            if (res.data.success) {
                setData(res.data.result);
            } else {
                toast.error(res.data.message);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleEdit = async (id) => {
        setEditId(id);
        const res = await axiosInstance.get(`/link/get/${id}`);
        
        setFormData(res.data.result);
    };
const handleDelete= async (id) => {
        
        const res = await axiosInstance.delete(`/link/delete/${id}`);
        console.log(res)
        fetchByDate()
    };
    const handleSubmit = async () => {
        try {
            if (editId) {
                await axiosInstance.patch(`/link/update/${editId}`, formData);
                toast.success("Link Updated Successfully");
            } else {
                await axiosInstance.post(`/link/create`, formData);
                toast.success("Link Created Successfully");
            }

            fetchByDate();
        } catch (err) {
            toast.error("Something went wrong");
            console.log(err);
        }
    };

    useEffect(() => {
        fetchByDate();
    }, []);

    return (
        <div className="space-y-10 p-15">
            <div className="text-2xl text-blue-600 font-medium">Quick Link</div>

            <div className="p-8 rounded-xl shadow-sm bg-gray-50 px-20">
                <div className="grid grid-cols-2 gap-6">
                   
                    <div className="flex flex-col">
                        <label>Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            className="border px-4 py-2 rounded-lg"
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label>Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            className="border px-4 rounded-lg"
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label>URL</label>
                        <input
                            type="text"
                            name="URL"
                            value={formData.URL}
                            className="border px-4 py-2 rounded-lg"
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label>Category</label>
                        <input
                            type="text"
                            name="category"
                            value={formData.category}
                            className="border px-4 py-2 rounded-lg"
                            onChange={handleInputChange}
                        />
                    </div>

                </div>

                <div className="flex justify-end mt-5">
                    <button
                        className="rounded-xl bg-blue-500 text-white px-4 py-2"
                        onClick={handleSubmit}
                    >
                        {editId ? "Update" : "Create"}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-5 text-center px-7 py-3 bg-gray-200 rounded-xl">
                <div>Title</div>
                <div>Description</div>
                <div>URL</div>
                <div>Category</div>
            </div>

            {data.map((item) => (
                <div
                    key={item._id}
                    className="grid grid-cols-5 text-center px-7 py-2 bg-gray-200 rounded-xl mt-2 items-center flex"
                >
                    <div>{item.title}</div>
                    <div>{item.description}</div>
                    <div className="truncate">{item.URL}</div>
                    <div>{item.category}</div>
                    <div className="gap-5">
                        <button
                        className="text-blue-600 underline col-span-4 text-left"
                        onClick={() => handleEdit(item._id)}
                    >
                        Edit
                    </button>
                        <button
                        className="text-red-600 underline col-span-4 text-left ps-5"
                        onClick={() => handleDelete(item._id)}
                    >
                        Delete
                    </button></div>
                    
                </div>
            ))}
        </div>
    );
};

export default QuickLinks;
