import React, { useState, useEffect } from "react";
import { IoSend } from "react-icons/io5";
import axios from "axios";

const Message = () => {
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");
  const backendUrl = import.meta.env.VITE_API_URL;

  // Send message
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) {
      setError("Message is required");
      return;
    }

    try {
      const res = await axios.post(
        `${backendUrl}/api/users/send-message-to-admin`,
        {
          content: inputMessage,
          messageType: "text",
        }
      );

      // Add new message immediately to state (optimistic UI)
      setMessages((prev) => [...prev, { ...res.data.data, direction: "user-to-admin" }]);

      setInputMessage("");
      setError("");
    } catch (error) {
      console.error("Error sending message:", error);
      setError("Failed to send message. Try again.");
    }
  };

  // Fetch conversation
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `${backendUrl}/api/admin/receive-message-from-admin`
        );

        // Merge messages instead of replacing
        setMessages((prev) => {
          const existingIds = new Set(prev.map((m) => m._id));
          const newMessages = res.data.data.filter((m) => !existingIds.has(m._id));
          return [...prev, ...newMessages];
        });
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();

    // Optionally: refresh messages every 3s
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-br from-blue-100 to-purple-100 w-full h-[100vh] flex flex-col">
      {/* Header */}
      <h1 className="py-6 text-2xl font-bold text-center text-gray-800">
        Messenger
      </h1>

      {/* Chat Box */}
      <div className="flex flex-col justify-between border border-gray-200 rounded-2xl h-[70vh] mx-auto w-[60%] p-5 bg-white shadow-lg">
        {/* Messages Section */}
        <div className="flex flex-col gap-3 overflow-y-auto">
          {messages.map((msg, index) => (
            <div
              key={msg._id || index}
              className={`flex ${
                msg.direction === "user-to-admin"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <p
                className={`px-4 py-2 rounded-2xl max-w-xs text-sm shadow ${
                  msg.direction === "user-to-admin"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-gray-800"
                }`}
              >
                {msg.content}
              </p>
            </div>
          ))}
        </div>

        {/* Input Section */}
        <div className="flex flex-col mt-4">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Write a message..."
              className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSendMessage}
              className="p-3 text-white transition-colors bg-blue-600 rounded-full shadow-md hover:bg-blue-700"
            >
              <IoSend className="w-5 h-5" />
            </button>
          </div>
          {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Message;
