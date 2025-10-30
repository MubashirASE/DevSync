import {  useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

const SignUp = () => {
  const [signupData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
    role: ""
  })
  const handleChange = (e) => {
    setSignUpData({
      ...signupData,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit =async()=>{
        const userData=await axios.post('http://localhost:5000/api/v1/user/signup', signupData)
        console.log(userData.data)

  }

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className=" p-8 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-500">Sign Up</h2>

        <div className="space-y-4">

          <div>
            <label className="block mb-1 font-medium text-purple-">Name</label>
            <input
              type="text"
              name="name"
              value={signupData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring focus:ring-blue-300 outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={signupData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring focus:ring-blue-300 outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={signupData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring focus:ring-blue-300 outline-none"
            />
          </div>

          <div>

            <div className="flex items-center flex-row space-x-4">
              <label className="block mb-1 font-medium text-gray-700">Role</label>

              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={signupData.role === "admin"}
                  onChange={handleChange}
                  className="h-3 w-3"
                />
                <span>Admin</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="role"
                  value="employee"
                  checked={signupData.role === "employee"}
                  onChange={handleChange}
                  className="h-3 w-3"
                />
                <span>Employee</span>
              </label>

            </div>
          </div>

          <button className="rounded-xl bg-blue-500 text-white px-7 py-2" onClick={handleSubmit}><Link to="/login">Submit</Link>
</button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
