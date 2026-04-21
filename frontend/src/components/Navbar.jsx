import { useState } from "react";
import { Menu, X } from "lucide-react";
import {Link} from "react-router-dom"

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900  text-white p-4 relative z-50 w-full">
      
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Logo */}
        <h1 className="text-xl font-semibold">ChatOn</h1>

        {/* Desktop Menu */}
               <div className="hidden md:flex gap-6">
                 <Link to="/" className="hover:text-blue-400">Home</Link>
                <Link to="/blog" className="hover:text-blue-400">Blogs</Link>
                <Link to="/chat" className="hover:text-blue-400">JoinChat</Link>
  <             Link to="/roomlogin" className="hover:text-blue-400">JoinRoom</Link>
              </div>
       
        

        {/* Mobile Button */}
        <button 
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-3 bg-gray-800 p-4 rounded-xl shadow-lg">
                 <Link to="/" className="hover:text-blue-400">Home</Link>
                <Link to="/blog" className="hover:text-blue-400">Blogs</Link>
                <Link to="/login" className="hover:text-blue-400">joinChat</Link>
  <             Link to="/roomlogin" className="hover:text-blue-400">joinRoom</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;