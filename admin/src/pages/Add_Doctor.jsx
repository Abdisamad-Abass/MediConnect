import React, { useState } from "react";
import axios from "axios";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";

function Add_Doctor() {
  const backendUrl = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    speciality: "",
    role: "",
    phone: "",
    fees: "",
    education: "",
    about: "",
  });

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(assets.profile); // default profile

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle file change
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("profile", file);
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("speciality", formData.speciality);
    data.append("role", formData.role);
    data.append("phone", formData.phone);
    data.append("fees", formData.fees);
    data.append("education", formData.education);
    data.append("about", formData.about);

    try {
      const res = await axios.post(
        `${backendUrl}/api/admin/add-doctor`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      if (res.status === 200 || res.status === 201) {
        toast.success(res.data.message || "Doctor added successfully ✅");
        setFormData({
          name: "",
          email: "",
          password: "",
          speciality: "",
          role: "",
          phone: "",
          fees: "",
          education: "",
          about: "",
        });
        setFile(null);
        setPreview(assets.profile);
      } else {
        toast.error(res.data.message || "Something went wrong ❌");
      }

      console.log(res.data);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Error uploading doctor ❌");
    }
  };

  return (
    <div className="relative w-full bg-blue-300 h-[100vh] py-2">
      <h1 className="text-2xl font-extrabold text-center text-blue-600 ">
        Admin Page
      </h1>
      <form
        onSubmit={handleSubmit}
        className="px-10 py-2 mx-32 border-2 border-white"
        encType="multipart/form-data"
      >
        {/* Upload Profile */}
        <div className="flex flex-col items-center">
          {/* Clickable Image */}
          <label htmlFor="profileUpload" className="cursor-pointer">
            <img
              src={preview}
              alt="profile preview"
              className="object-cover border-2 border-blue-500 rounded-full w-28 h-28"
            />
          </label>
          <p className="mt-2 text-lg font-semibold text-blue-700">
            Click image to upload profile picture
          </p>
          {/* Hidden Input */}
          <input
            type="file"
            id="profileUpload"
            name="profile"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-2 mt-5">
          <label className="flex flex-col mt-2 text-lg font-medium text-white">
            Doctor Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="px-5 py-2 mt-1 rounded-lg text-violet-700 w-[70%]"
              placeholder="Doctor name"
            />
          </label>

          <label className="flex flex-col mt-2 text-lg font-medium text-white">
            Doctor Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="px-5 py-2 mt-1 rounded-lg text-violet-700 w-[70%]"
              placeholder="Email"
            />
          </label>

          <label className="flex flex-col mt-2 text-lg font-medium text-white">
            Set Password
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="px-5 py-2 mt-1 rounded-lg text-violet-700 w-[70%]"
              placeholder="Set Password"
            />
          </label>

          <label className="flex flex-col mt-2 text-lg font-medium text-white">
            Speciality
            <input
              type="text"
              name="speciality"
              value={formData.speciality}
              onChange={handleChange}
              className="px-5 py-2 mt-1 rounded-lg text-violet-700 w-[70%]"
              placeholder="Speciality"
            />
          </label>

          <label className="flex flex-col mt-2 text-lg font-medium text-white">
            Role
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="px-5 py-2 mt-1 rounded-lg text-violet-700 w-[70%]"
              placeholder="Role"
            />
          </label>

          <label className="flex flex-col mt-2 text-lg font-medium text-white">
            phone
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="px-5 py-2 mt-1 rounded-lg text-violet-700 w-[70%]"
              placeholder="Phone"
            />
          </label>

          <label className="flex flex-col mt-2 text-lg font-medium text-white">
            Fees
            <input
              type="text"
              name="fees"
              value={formData.fees}
              onChange={handleChange}
              className="px-5 py-2 mt-1 rounded-lg text-violet-700 w-[70%]"
              placeholder="Fees"
            />
          </label>

          <label className="flex flex-col mt-2 text-lg font-medium text-white">
            Education
            <input
              type="text"
              name="education"
              value={formData.education}
              onChange={handleChange}
              className="px-5 py-2 mt-1 rounded-lg text-violet-700 w-[70%]"
              placeholder="Education"
            />
          </label>

          <label className="flex flex-col mt-2 text-lg font-medium text-white">
            About
            <textarea
              type="text"
              name="about"
              value={formData.about}
              onChange={handleChange}
              className="w-[100%] px-5 py-2 mt-1 rounded-lg text-violet-700"
              placeholder="About"
            ></textarea>
          </label>
        </div>
        <button
          type="submit"
          className="w-40 py-2 text-lg font-bold text-black rounded-full bg-zinc-100 mt-9 px-7"
        >
          Add doctor
        </button>
      </form>
    </div>
  );
}

export default Add_Doctor;
