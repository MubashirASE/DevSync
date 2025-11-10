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

    const handleDelete = async (id) => {
        const res = await axiosInstance.delete(`/link/delete/${id}`);
        console.log(res);
        fetchByDate();
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
            setFormData({ title: "", description: "", URL: "", category: "" });
            setEditId(null);
        } catch (err) {
            toast.error("Something went wrong");
            console.log(err);
        }
    };

    useEffect(() => {
        fetchByDate();
    }, []);

    return (
        <div className="p-10 space-y-10 bg-gray-50 min-h-screen">
            <div className="text-3xl font-semibold text-blue-600  pb-2">
                Quick Links
            </div>

            <div className="p-8 rounded-2xl bg-white shadow-md hover:shadow-sm transition-all border border-gray-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-1">URL</label>
                        <input
                            type="text"
                            name="URL"
                            value={formData.URL}
                            className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-1">Category</label>
                        <input
                            type="text"
                            name="category"
                            value={formData.category}
                            className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="flex justify-end mt-6">
                    <button
                        className="rounded-lg bg-blue-600 text-white px-6 py-2 font-medium hover:bg-blue-700 transition-all"
                        onClick={handleSubmit}
                    >
                        {editId ? "Update Link" : "Create Link"}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-5 text-center font-semibold bg-gray-200 text-blue-800 py-3 rounded-lg">
                <div>Title</div>
                <div>Description</div>
                <div>URL</div>
                <div>Category</div>
                <div>Actions</div>
            </div>

            <div className="space-y-2">
                {data.map((item) => (
                    <div
                        key={item._id}
                        className="grid grid-cols-5 text-center bg-white shadow-sm border border-gray-100 rounded-lg p-3 hover:shadow-md transition-all items-center"
                    >
                        <div className="font-medium text-gray-800">{item.title}</div>
                        <div className="text-gray-600 truncate">{item.description}</div>
                        <a
                            href={item.URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline break-words hover:text-blue-800"
                        >
                            {item.URL}
                        </a>
                        <div className="text-gray-700">{item.category}</div>
                        <div className="flex justify-center gap-3">
                            <button
                                className="text-blue-600 hover:text-blue-800 font-medium"
                                onClick={() => handleEdit(item._id)}
                            >
                                Edit
                            </button>
                            <button
                                className="text-red-600 hover:text-red-800 font-medium"
                                onClick={() => handleDelete(item._id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QuickLinks;
