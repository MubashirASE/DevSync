import { useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";


const Login= () => {
     const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });
const navigate=useNavigate()
  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit =async()=>{
        const userData=await axios.post('http://localhost:5000/api/v1/user/login', loginData)
        console.log(userData.data)
         if (userData.data.success) {
        localStorage.setItem("token", userData.data.token);
        localStorage.setItem("user",JSON.stringify(userData.data.user))
        navigate("/home")
         }
  }
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className=" p-8 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-500">Login</h2>

        <div className="space-y-10">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring focus:ring-blue-300 outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Password</label>
            <input
              type="password"
              name='password'
              value={loginData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring focus:ring-blue-300 outline-none"
            />
          </div>

          
          <button className="rounded-xl bg-blue-500 text-white px-7 py-2" onClick={handleSubmit}><Link to="/home">Submit</Link></button>
        </div>
      </div>
    </div>
  );
};

export default Login;
