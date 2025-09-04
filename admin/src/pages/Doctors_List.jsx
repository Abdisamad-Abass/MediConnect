import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const Doctors_List = () => {
  const [doctors, setDoctors] = useState([]);
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
    <div className="w-full px-10 py-10 bg-emerald-100">
      <h1 className="text-xl font-bold">All Doctors</h1>
      <div className="grid w-full grid-cols-5 gap-4 pt-5 gap-y-6">
        {doctors.map((doc) => (
          <div
            key={doc._id}
            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
          >
            {/* Profile image from Cloudinary (doc.profile) */}
            <img
              src={doc.profile || "https://via.placeholder.com/150"}
              alt={doc.name}
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
    </div>
  );
};

export default Doctors_List;
