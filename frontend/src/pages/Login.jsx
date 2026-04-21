import React, { useState } from "react";
import { useNavigate } from "react-router";
import ParticlesBg from "../components/ParticlesBg";
import { socket } from "../socket/socket";
import Navbar from "../components/Navbar";

export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    gender: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.username ||  !formData.gender) {
      alert("Please fill all fields");
      return;
    }

    localStorage.setItem("username", formData.username);
    localStorage.setItem("gender", formData.gender);

     if (!socket.connected) {
    socket.connect();
  }

    navigate("/chat");
  };

 return (
  <div className="min-h-screen flex flex-col">

    {/* Navbar */}
    <Navbar />

    {/* Main Content */}
    <div className="flex flex-1 items-center justify-center px-4 relative">

      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <ParticlesBg />
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="
          w-full 
          max-w-sm 
          sm:max-w-md 
          md:max-w-lg
          bg-white/10 
          backdrop-blur-lg
          border border-white/20
          p-6 sm:p-8 
          rounded-2xl 
          shadow-2xl
        "
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-white">
          Log In
        </h2>

        <input
          type="text"
          name="username"
          placeholder="Enter your username"
          className="w-full p-3 sm:p-4 bg-white/10 border border-white/20 rounded-lg mb-4 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.username}
          onChange={handleChange}
        />
        <div className="mb-5">
          <p className="mb-2 text-gray-200 font-medium">Gender</p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
            <label className="flex items-center gap-2 text-white">
              <input type="radio" name="gender" value="male" onChange={handleChange} className="accent-blue-500" />
              Male
            </label>

            <label className="flex items-center gap-2 text-white">
              <input type="radio" name="gender" value="female" onChange={handleChange} className="accent-pink-500" />
              Female
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:scale-[1.02] transition-all text-white py-3 sm:py-4 rounded-lg font-semibold"
        >
          Start Chat
        </button>
      </form>
    </div>
  </div>
)
}