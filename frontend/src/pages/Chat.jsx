import { socket } from "../socket/socket";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ChatInput from "../components/ChatInput";
import Navbar from "../components/Navbar";
import ParticlesBg from "../components/ParticlesBg";




export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState("Searching...");
  const navigate = useNavigate();

  const username = localStorage.getItem("username");

  // ✅ Redirect if not logged in
  useEffect(() => {
    if (!username) {
      navigate("/login");
    }
  }, [username, navigate]);

  useEffect(() => {
  return () => {
    socket.emit("leaveChat"); // 🔥 custom event
    socket.disconnect();      // optional but recommended
  };
}, []);

  // ✅ Socket events
  useEffect(() => {
  socket.on("connected", (data) => {
    setStatus("Connected");
  });

  socket.on("userDisconnected", () => {
    setStatus("Disconnected");
  });

  // AFTER listeners → THEN emit
  socket.emit("joinChat");

  return () => {
    socket.off("connected");
    socket.off("userDisconnected");
  };
}, []);


useEffect(() => {
  if (!socket.connected) {
    socket.connect(); // 🔥 safety connect
  }

  socket.on("connected", () => {
    setMessages([]);
    setStatus("Connected");
  });

  socket.on("chatMessage", (data) => {
    setMessages((prev) => [...prev, data]);
  });

  socket.on("userDisconnected", () => {
    setStatus("Disconnected");
  });

  return () => {
    socket.off("connected");
    socket.off("chatMessage");
    socket.off("userDisconnected");
  };
}, []);

  return (
    <div className="relative h-screen bg-gradient-to-tl from-gray-700 to-gray-800 flex flex-col">
      

     <Navbar className="bg-gray-900 md:bg-slate-900 text-white p-4 relative z-50 w-full" />

      {/* Status */}
      <p className="text-center text-gray-300 mt-2">{status}</p>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto px-4 mt-4">
{messages.map((msg, index) => {
  if (!msg) return null;

  const isMe = msg.sender === username;

  return (
    <div
      key={msg.id || index}
      className={`flex ${isMe ? "justify-end" : "justify-start"} mb-2`}
    >
      <div
        className={`px-4 py-2 rounded-lg max-w-[60%] break-words break-all ${
          isMe
            ? "bg-blue-500 text-white rounded-br-none"
            : "bg-gray-300 text-black rounded-bl-none"
        }`}
      >
        <p className="text-xs font-semibold opacity-70">
        
        </p>

        <p>{msg.text}</p>
      </div>
    </div>
  );
})}
      </div>

      {/* Input */}
      <ChatInput username={username} status={status} />
    </div>
  );
}