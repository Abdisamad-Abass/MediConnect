import React, { useState, useEffect } from "react";
import axios from "axios";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";

const Users_List = () => {
  const [users, setUsers] = useState([]);
  const backendUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          `${backendUrl}/api/users/all-users`,
        );
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to fetch users");
      }
    };
    fetchUsers();
  }, []);

  const handleEdit = async (id, currentData) => {
    const newUsername = prompt("Enter new username:", currentData.username);
    const newEmail = prompt("Enter new email:", currentData.email);
    const newPassword = prompt("Enter new password:", currentData.password);

    if (newUsername || newEmail || newPassword) {
      try {
        const res = await axios.put(
          `${backendUrl}/api/users/all-users/${id}`,
          {
            username: newUsername,
            email: newEmail,
            password: newPassword,
          },
        );

        toast.success(res.data.message);

        // Update the UI instantly (without refetch)
      } catch (error) {
        console.error("Error updating user:", error);
        toast.error("Failed to update user");
      }
    }
  };

  return (
    <div className="w-full px-10 py-10 bg-red-100">
      <h1 className="text-xl font-bold">All Users</h1>

      <table className="w-full mt-5 border border-gray-500 rounded-lg bg-zinc-50">
        <thead>
          <tr className="text-left bg-gray-200">
            <th className="p-3 border-b border-gray-500">User Name</th>
            <th className="p-3 border-b border-gray-500">User Email</th>
            <th className="p-3 border-b border-gray-500">User Password</th>
            <th className="p-3 border-b border-gray-500">Edit</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="p-3 border-b border-gray-300">{user.username}</td>
              <td className="p-3 border-b border-gray-300">{user.email}</td>
              <td className="p-3 border-b border-gray-300">{user.password}</td>
              <td className="p-3 border-b border-gray-300">
                <img
                  src={assets.editIcon}
                  alt="editIcon"
                  onClick={() => handleEdit(user._id, user)}
                  className="cursor-pointer w-9 h-9"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users_List;
