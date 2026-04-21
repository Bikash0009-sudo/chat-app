import { socket } from "../socket/socket";
import { useState } from "react";
import { Send } from "lucide-react";



export default function ChatInput({ username, status }) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() === "" || status !== "Connected") return;

    const newMessage = {
      text: input,
      sender: username,
      id: Date.now(),
    };

    socket.emit("chatMessage", newMessage);
    setInput("");
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-900 p-3 flex items-center gap-2">
      
      <input
        type="text"
        placeholder={
          status === "Connected"
            ? "Type a message..."
            : "Waiting for user..."
        }
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={status !== "Connected"}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSend();
        }}
        className="flex-1 p-2 rounded-full bg-gray-800 text-white outline-none disabled:opacity-50"
      />

      {/* Send Button */}
      <button
        onClick={handleSend}
        disabled={status !== "Connected"}
        className="bg-blue-500 p-2 rounded-full hover:bg-blue-600 disabled:opacity-50"
      >
        <Send size={20} />
      </button>

      {/* Next Button */}
      <button
        onClick={() => socket.emit("nextUser")}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Next
      </button>
    </div>
  );
}