import React from "react";
import Dashboard from "./pages/Dashboard";
import Add_Doctor from "./pages/Add_Doctor";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./components/sidebar";
import Doctors_List from "./pages/Doctors_List";
import Users_List from "./pages/Users_List";
import Appointments from "./pages/Appointments";
import Messages from "./pages/Messages";

function App() {
  return (
    <div className="flex items-start w-full h-[100vh]">
      <ToastContainer position="top-right" autoClose={3000} />
      <Sidebar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-doctor" element={<Add_Doctor />} />
        <Route path="/doctors-list" element={<Doctors_List />} />
        <Route path="/users-list" element={<Users_List />} />
        <Route path="/all-appointments" element={<Appointments />} />
        <Route path="/received-messages" element={<Messages />} />
      </Routes>
    </div>
  );
}

export default App;
