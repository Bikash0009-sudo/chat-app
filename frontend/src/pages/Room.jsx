import { useState, useEffect, useRef } from "react";
import { socket } from "../socket/socket";
import { useLocation, useNavigate } from "react-router-dom";

export default function Room() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [typingUser, setTypingUser] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Username (safe)
  const username =
    location.state?.inputName || localStorage.getItem("username");

  const roomId = "global";

  const hasJoined = useRef(false);
  const bottomRef = useRef(null);
  const typingTimeout = useRef(null);

  // ❌ Redirect if no username
  useEffect(() => {
    if (!username) {
      navigate("/");
    } else {
      localStorage.setItem("username", username);
    }
  }, [username, navigate]);

  // 🔽 Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ✅ Listen for messages
  useEffect(() => {
    const handleMessage = (data) => {
      setMessages((prev) => [...prev, data]);
    };

    socket.on("roomMessage", handleMessage);

    return () => socket.off("roomMessage", handleMessage);
  }, []);

  // ✅ Listen for typing events
  useEffect(() => {
    socket.on("typing", (user) => {
      setTypingUser(user);
    });

    socket.on("stopTyping", () => {
      setTypingUser(null);
    });

    return () => {
      socket.off("typing");
      socket.off("stopTyping");
    };
  }, []);

  // ✅ Join room (safe)
  useEffect(() => {
    if (!username) return;
    if (hasJoined.current) return;

    const joinRoom = () => {
      socket.emit("joinRoom", roomId, username);
      hasJoined.current = true;
    };

    if (!socket.connected) {
      socket.connect();
    }

    socket.on("connect", joinRoom);

    if (socket.connected) {
      joinRoom();
    }

    return () => socket.off("connect", joinRoom);
  }, [username]);

  // ✅ Send message
  const sendMessage = () => {
    if (!message.trim()) return;

    socket.emit("roomMessage", {
      roomId,
      username,
      message,
    });

    // stop typing when message sent
    socket.emit("stopTyping", { roomId });

    setMessage("");
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      
      {/* Header */}
      <div className="p-4 border-b border-white/10 flex justify-between items-center">
        <h2 className="text-lg font-semibold">🌐 Room Chat</h2>
        <span className="text-sm text-gray-400">{username}</span>
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
                <div className="flex justify-center my-2">
                  <div className="bg-white/10 text-gray-300 text-xs px-3 py-1 rounded-full">
                    {msg.text}
                  </div>
                </div>
              )}

              {/* Chat Message */}
              {!isSystem && (
                <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
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

      {/* ✅ Typing Indicator */}
      {typingUser && typingUser !== username && (
        <div className="px-4 pb-2 text-sm text-gray-400 italic">
          {typingUser} is typing...
        </div>
      )}

      {/* Input */}
      <div className="p-3 border-t border-white/10 flex gap-2">
        <input
          className="flex-1 bg-white/10 border border-white/20 rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => {
            const value = e.target.value;
            setMessage(value);

            // emit typing
            socket.emit("typing", { roomId, username });

            // debounce stop typing
            if (typingTimeout.current) {
              clearTimeout(typingTimeout.current);
            }

            typingTimeout.current = setTimeout(() => {
              socket.emit("stopTyping", { roomId });
            }, 1000);
          }}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />

        <button
          onClick={sendMessage}
          className="bg-blue-500 hover:bg-blue-600 px-5 rounded-full font-medium transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}