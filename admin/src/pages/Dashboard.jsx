import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const Dashboard = () => {
  const [doctors, setDoctors] = useState([]);
  const [users, setUsers] = useState([]);
  const [appointments, setAppointments] = useState([])
  const backendUrl = import.meta.env.VITE_API_URL;

  const cards = [
    { title: "Total Doctors", count: doctors.length },
    { title: "Users", count: users.length },
    { title: "Appointments", count: appointments.length },
  ];
  //fetching all doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/admin/doctors`);
        setDoctors(res.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    fetchDoctors();
  }, []);

  //fetching all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          `${backendUrl}/api/users/all-users`,
        );
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  //fetching all appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/users/all-appointments`)
        setAppointments(res.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchAppointments()
  }, [])
  return (
    <div className="w-full bg-amber-200 h-[100vh] px-10 pt-20">
      <div className="grid grid-cols-2 gap-6 w-[60%]">
        {cards.map((card, index) => (
          <div key={index} className="h-20 p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-lg font-medium text-center">{card.title}</h2>
            <p className="text-lg font-medium text-center text-gray-500">
              {card.count}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
