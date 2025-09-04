import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  //Booking appointment fetching
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/api/users/all-appointments",
        );
        setAppointments(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to load appointments.");
      }
    };
    fetchAppointments();
  }, []);

  //Deleting Appointment by id fetching
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this appointment?"))
      return;
    try {
      await axios.delete(
        `http://localhost:4000/api/users/all-appointments/${id}`,
      );
      setAppointments((prev) => prev.filter((appt) => appt._id !== id));
      toast.success("Appointment deleted successfully.");
    } catch (error) {
      console.error("Error deleting appointment:", error);
      toast.error("Failed to delete appointment.");
    }
  };

  return (
    <div className="relative w-full px-10 py-10 bg-red-100">
      <h1 className="text-xl font-bold">All Appointments</h1>
      <table className="w-full mt-5 border border-gray-500 rounded-lg bg-zinc-50">
        <thead>
          <tr className="text-left bg-gray-200">
            <th className="p-3 border-b border-gray-500">Doctor Booked</th>
            <th className="p-3 border-b border-gray-500">Date</th>
            <th className="p-3 border-b border-gray-500">Time</th>
            <th className="p-3 border-b border-gray-500">Status</th>
            <th className="p-3 border-b border-gray-500">Delete Appointment</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment._id}>
              <td className="p-3 border-b border-gray-300">
                {appointment.doctorName}
              </td>
              <td className="p-3 border-b border-gray-300">
                {appointment.date}
              </td>
              <td className="p-3 border-b border-gray-300">
                {appointment.time}
              </td>
              <td className="p-3 border-b border-gray-300">
                {appointment.status}
              </td>
              <td className="p-3 border-b border-gray-300">
                <img
                  src={assets.deleteIcon}
                  alt="deleteicon"
                  onClick={() => handleDelete(appointment._id)}
                  className="ml-8 cursor-pointer w-9 h-9"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
};

export default Appointments;
