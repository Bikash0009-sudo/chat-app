import { useState, useEffect, useRef } from "react";
import { socket } from "../socket/socket";

export default function Room() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const username = localStorage.getItem("username");
  const roomId = "global";

  const hasJoined = useRef(false);
  const bottomRef = useRef(null);

  // 🔽 Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ✅ Listener
  useEffect(() => {
    socket.on("roomMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => socket.off("roomMessage");
  }, []);

  // ✅ Join logic
  useEffect(() => {
    if (hasJoined.current) return;

    const join = () => {
      socket.emit("joinRoom", roomId, username);
      hasJoined.current = true;
    };

    if (socket.connected) join();
    else socket.on("connect", join);

    return () => socket.off("connect", join);
  }, []);

  const sendMessage = () => {
    if (!message.trim()) return;

    socket.emit("roomMessage", {
      roomId,
      username,
      message,
    });

    setMessage("");
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-900 to-slate-800 text-white">

      {/* Header */}
      <div className="p-4 border-b border-white/10 flex justify-between items-center">
        <h2 className="text-lg font-semibold">
          🌐 Room Chat
        </h2>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {messages.map((msg, index) => {
          const isMe = msg.user === username;
          const isSystem = msg.user === "System";

          return (
            <div key={index} className="flex flex-col">

              {/* System Message */}
              {isSystem && (
                <div className="text-center text-xs text-gray-400">
                  {msg.text}
                </div>
              )}

              {/* Chat Message */}
              {!isSystem && (
                <div
                  className={`flex ${
                    isMe ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`px-4 py-2 rounded-2xl max-w-[70%] break-words shadow ${
                      isMe
                        ? "bg-blue-500 text-white"
                        : "bg-white/10 backdrop-blur-md"
                    }`}
                  >
                    {!isMe && (
                      <div className="text-xs text-gray-300 mb-1">
                        {msg.user}
                      </div>
                    )}
                    {msg.text}
                  </div>
                </div>
              )}
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t border-white/10 flex gap-2">
        <input
          className="
            flex-1 
            bg-white/10 
            border border-white/20 
            rounded-full 
            px-4 py-2 
            outline-none 
            focus:ring-2 focus:ring-blue-500
          "
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />

        <button
          onClick={sendMessage}
          className="
            bg-blue-500 
            hover:bg-blue-600 
            px-5 
            rounded-full 
            font-medium 
            transition
          "
        >
          Send
        </button>
      </div>
    </div>
  );
}