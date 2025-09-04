import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/admin/doctors");
        setDoctors(res.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    fetchDoctors();
  }, []);

  return (
    <div className="w-full px-5 py-5">
      <h1 className="text-2xl font-bold text-center">Doctors Available</h1>
      <div className="grid grid-cols-5 gap-4 mt-5 gap-y-6">
        {doctors.map((doc) => (
          <div
            key={doc._id}
            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
          >
            {/* Profile image from Cloudinary (doc.profile) */}
            <img
              src={doc.profile || "https://via.placeholder.com/150"}
              alt={doc.name}
              onClick={() => navigate(`/booking/${doc._id}`)}
              className="object-cover bg-blue-50"
            />
            <div className="p-4">
              <div className="flex items-center w-2 h-2 bg-green-600 rounded-full">
                <p className="ml-5 text-lg font-semibold text-green-500">
                  Available
                </p>
              </div>
              <p className="mt-2 text-lg font-medium text-gray-900">
                Dr. {doc.name}
              </p>
              <p className="text-gray-600 ">{doc.speciality}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="px-5 py-3 mt-20 font-bold bg-red-100 rounded-lg" onClick={() => navigate("/send-message")}>Send Message to Admin</button>
    </div>
  );
};

export default Home;
