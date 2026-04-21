import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../socket/socket";
import Navbar from "../components/Navbar";

function RoomLogin() {
  const navigate = useNavigate();
  const [inputName, setInputName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!inputName.trim()) return;
           socket.connect();

    // ✅ navigate AFTER submit
    navigate("/room",{
      state: {inputName}  // sending the input name
    });
  }

  return (
        <div className="min-h-screen flex flex-col">

      {/* Navbar */}
      <Navbar />

    <div className="min-h-screen flex items-center justify-center bg-zinc-900 px-4">
      <div className="w-full max-w-md bg-zinc-800 p-6 sm:p-8 rounded-2xl shadow-lg">
        
        <h2 className="text-2xl sm:text-3xl font-semibold text-white text-center">
          Join Chat Room
        </h2>
        <p className="text-zinc-400 text-sm text-center mt-2">
          Enter your name to continue
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            autoFocus
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            placeholder="Your name"
            className="w-full bg-zinc-700 text-white border border-zinc-600 rounded-xl px-4 py-3 
                       focus:outline-none focus:ring-2 focus:ring-green-500 
                       placeholder:text-zinc-400 transition"
          />

          <button
            type="submit"
            disabled={!inputName.trim()}
            className="w-full bg-green-500 hover:bg-green-600 
                       disabled:bg-zinc-600 disabled:cursor-not-allowed
                       transition-all text-white py-3 rounded-xl font-medium"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
    </div>
  );
}

export default RoomLogin;