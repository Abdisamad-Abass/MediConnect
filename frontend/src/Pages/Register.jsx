import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 

const Register = () => {
  const [isLogin, setIsLogin] = useState(false);
   const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLogin
        ? "http://localhost:4000/api/users/login"
        : "http://localhost:4000/api/users/register";

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);

      if (res.ok) {
        toast.success(data.message || "Success!");

        if (isLogin || (!isLogin && data.token)) {
          localStorage.setItem("token", data.token);
          navigate("/landing");
        }
        setFormData({ username: "", email: "", password: "" });
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error. Please try again later.");
    }
  };
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center bg-[#463e65] h-[100vh]">
      <div className="flex h-[80vh] mt-5">
        {/* 1st col */}
        <div
          className="w-[500px] bg-center bg-cover rounded-l-2xl"
          style={{ backgroundImage: `url(${assets.mypic2})` }}
        ></div>
      <form
        onSubmit={handleSubmit}
        className="px-14 py-10 w-[70%] bg-gradient-to-b from-[#05030b] via-[#06050c] to-[#4b2b53] rounded-r-2xl"
      >
        <h1 className="text-2xl font-bold text-white">
          {isLogin ? "Login" : "Create Account"}
        </h1>
        <h4 className="mt-3 text-lg text-white">
          {isLogin
            ? "Please enter your credentials to login"
            : "Please Create account to register"}
        </h4>

        {!isLogin && (
          <label className="flex flex-col mt-5 font-medium text-white">
            Full Name
            <input
              type="text"
              name="username"
              required
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter full name"
              className="px-5 py-2 mt-1 rounded-md bg-[#06050c] border border-gray-50 text-white"
            />
          </label>
        )}

        <label className="flex flex-col mt-5 font-medium text-white">
          Email
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            className="px-5 py-2 mt-1 rounded-md bg-[#06050c] border border-gray-50 text-white"
          />
        </label>
        <label className="relative flex flex-col mt-5 font-medium text-white">
          Password
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            className="px-5 py-2 mt-1 rounded-md bg-[#1b1122] border border-gray-50 text-white"
          />
          <span
              className="absolute right-3 top-[55%] cursor-pointer text-gray-300"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
        </label>
        <button
          type="submit"
          className="w-full px-20 py-2 mt-10 font-bold text-white bg-blue-600 rounded-xl"
        >
          {isLogin ? "Login" : "Create Account"}
        </button>

        <div className="mt-5">
          {isLogin ? (
            <p className="text-white">
              Dont have an account?
              <span
                onClick={() => setIsLogin(false)}
                className="ml-2 font-medium text-[#08CB00] cursor-pointer"
              >
                {" "}
                Create account
              </span>
            </p>
          ) : (
            <p className="text-white">
              Already have an account?{" "}
              <span
                onClick={() => setIsLogin(true)}
                className="ml-2 font-medium text-[#08CB00] cursor-pointer"
              >
                Login here
              </span>
            </p>
          )}
        </div>
      </form>
      </div>
    </div>
  );
};

export default Register;
