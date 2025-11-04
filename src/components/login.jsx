import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate()
  let newErrors = {};

  const validateForm = () => {

    if (!loginData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
      newErrors.email = 'Email address is invalid';
    }

    if (!loginData.password) {
      newErrors.password = 'Password is required';
    }
    //  else if (loginData.password.length < 8) {
    //   newErrors.password = 'Password must be at least 8 characters long';
    // }

    setErrors(newErrors);
    console.log(errors)
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = async () => {
    if (validateForm()) {
      const user = await axios.post('http://localhost:5000/api/v1/user/login', loginData)
      console.log(user.data)
      if (user.data.success) {
        localStorage.setItem("token", user.data.token);
        localStorage.setItem("user", JSON.stringify(user.data.userData))
        toast.success(user.data.message)

        navigate("/home/standup")

      } else {
        toast.error(user.data.message)
      }
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
          {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}

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
          {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}


          <button className="rounded-xl bg-blue-500 text-white px-7 py-2" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
