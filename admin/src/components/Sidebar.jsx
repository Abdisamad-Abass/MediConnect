import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const notifications = [
    {
      title: "Dashboard",
      href: "/",
    },
    {
      title: "Add Doctor",
      href: "/add-doctor",
    },
    {
      title: "Doctors List",
      href: "/doctors-list",
    },
    {
      title: "Users List",
      href: "/users-list",
    },
    {
      title: "Appointments",
      href: "/all-appointments",
    },
    {
      title: "Messages",
      href: "/received-messages",
    }
  ];
  return (
    <div className="bg-white w-[400px] mt-20 flex flex-col">
      {notifications.map((item, index) => {
        const isActive = location.pathname === item.href;
        return (
          <div key={index}>
            <p
              className={`w-full py-3 text-lg font-semibold cursor-pointer px-5 ${isActive ? "bg-blue-100" : "bg-white"}`}
              onClick={() => navigate(item.href)}
            >
              {item.title}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default Sidebar;
