import React, { useState, useEffect, useRef } from "react";
import { IoSend } from "react-icons/io5";
import axios from "axios";

const Message = () => {
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");
  const messagesEndRef = useRef(null);

  // Send message
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) {
      setError("Message is required");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:4000/api/admin/send-message-to-user",
        {
          content: inputMessage,
          messageType: "text",
        }
      );

      // Optimistically add new message
      setMessages((prev) => [
        ...prev,
        { ...res.data.data, direction: "admin-to-user" },
      ]);

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
          "http://localhost:4000/api/users/receive-message-from-user"
        );

        // Merge messages without overwriting
        setMessages((prev) => {
          const existingIds = new Set(prev.map((m) => m._id));
          const newMessages = res.data.data.filter(
            (m) => !existingIds.has(m._id)
          );
          return [...prev, ...newMessages];
        });
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();

    // Poll for new messages every 3s
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-br from-blue-100 to-purple-100 w-full h-[100vh] flex flex-col">
      {/* Header */}
      <h1 className="py-6 text-2xl font-bold text-center text-gray-800">
        Messenger (Admin)
      </h1>

      {/* Chat Box */}
      <div className="flex flex-col justify-between border border-gray-200 rounded-2xl h-[70vh] mx-auto w-[60%] p-5 bg-white shadow-lg">
        {/* Messages Section */}
        <div className="flex flex-col gap-3 overflow-y-auto">
          {messages.map((msg, index) => (
            <div
              key={msg._id || index}
              className={`flex ${
                msg.direction === "admin-to-user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <p
                className={`px-4 py-2 rounded-2xl max-w-xs text-sm shadow ${
                  msg.direction === "admin-to-user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-gray-800"
                }`}
              >
                {msg.content}
              </p>
            </div>
          ))}
          <div ref={messagesEndRef} />
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
