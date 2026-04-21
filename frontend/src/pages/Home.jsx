import Navbar from "../components/Navbar";
import ParticlesBg from "../components/ParticlesBg";
import chat2 from "../assets/chat2.png";
import Footer from "../components/Footer";
import {useNavigate} from "react-router-dom"
import { socket } from "../socket/socket";

function Home() {

  function handelClick() {
     navigate("/roomlogin");
  };

  const navigate = useNavigate();
  return (
    <div className="relative min-h-screen w-full flex flex-col">

      
      
      {/* Navbar */}
      <Navbar className="relative z-50" />

      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <ParticlesBg />
      </div>

      {/* Content */}
      <div className="flex flex-col md:flex-row items-center justify-between 
      max-w-7xl mx-auto w-full px-6 md:px-12 py-10 flex-1">

        {/* LEFT SIDE (TEXT) */}
        <div className="text-center md:text-left space-y-6 max-w-xl">

          <h1 className="text-2xl font-serif font-semibold text-white 
          drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
            Start Chatting in Seconds
          </h1>

          <h1 className="text-5xl md:text-6xl font-serif font-semibold text-white 
          drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
            ChatOn
          </h1>

          <p className="text-sm md:text-base text-gray-300">
            No complicated setup. Chat one-on-one or create a room and begin instantly.
          </p>

          {/* Buttons */}
          <div className="flex flex-row justify-center md:justify-start gap-4">

            {/* Join Chat */}
            <button onClick={()=>{ navigate("/login")}} className="font-bold font-serif border border-gray-700 bg-white text-black h-12 px-5 rounded-full hover:scale-105 transition duration-300">
              Join Chat
            </button>

            {/* Create Room */}
            <button onClick={handelClick} className="relative inline-flex h-12 rounded-full p-[1px] overflow-hidden">

              <span className="absolute inset-[-200%] animate-spin 
                bg-[conic-gradient(from_0deg,#ff0000,#ff7300,#fffb00,#48ff00,#00ffd5,#002bff,#7a00ff,#ff00c8,#ff0000)]" />

              <span className="relative inline-flex items-center justify-center h-full w-full 
                rounded-full bg-slate-900 px-8 text-white font-bold font-serif">
                Join Room
              </span>

            </button>
          </div>

          {/* Tagline */}
          <p className="text-gray-400 text-sm">
            Connect instantly. Chat freely. Build real conversations.
          </p>
        </div>

        {/* RIGHT SIDE (IMAGE) */}
        <div className="mt-10 md:mt-0 flex justify-center md:justify-end w-full md:w-1/2">

          <img
            src={chat2}
            alt="Chat Preview"
            className="w-full max-w-lg 
            drop-shadow-[0_0_60px_rgba(59,130,246,0.4)] 
            hover:scale-105 transition duration-500"
          />

        </div>

      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;