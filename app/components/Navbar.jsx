import { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { motion } from "framer-motion";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-white bg-opacity-20 backdrop-blur-lg fixed top-0 left-0 shadow-md z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <motion.h1
          className="text-xl font-bold tracking-wide relative leading-[1.2] flex items-center"
          whileHover={{ scale: 1.1, rotate: 2, y: -2 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <span className="bg-gradient-to-r from-blue-600 to-gray-900 bg-clip-text text-transparent drop-shadow-md">
            <span className="text-black">मौ</span>
            <span className="text-transparent">सम</span>
          </span>
        </motion.h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <a
            href="#"
            className="text-black transition-transform duration-300 ease-in-out hover:scale-110 hover:-translate-y-1"
          >
            About
          </a>
          <a
            href="#"
            className="text-black transition-transform duration-300 ease-in-out hover:scale-110 hover:-translate-y-1"
          >
            Contact
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-black"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <AiOutlineClose size={24} />
          ) : (
            <AiOutlineMenu size={24} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white bg-opacity-20 backdrop-blur-lg text-black py-4 text-center space-y-4">
          <a
            href="#"
            className="block transition-transform duration-300 ease-in-out hover:scale-110 hover:-translate-y-1"
          >
            Home
          </a>
          <a
            href="#"
            className="block transition-transform duration-300 ease-in-out hover:scale-110 hover:-translate-y-1"
          >
            About
          </a>
          <a
            href="#"
            className="block transition-transform duration-300 ease-in-out hover:scale-110 hover:-translate-y-1"
          >
            Contact
          </a>
        </div>
      )}
    </nav>
  );
}
