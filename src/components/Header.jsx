import React from "react";
import { useNavigate } from "react-router-dom";

const Header = ({ onVoiceClick }) => {
  const navigate = useNavigate();

  return (
    <header className="w-full bg-gradient-to-r from-indigo-700 to-blue-500 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-5">
        <button
          onClick={() => navigate("/")}
          className="text-white font-extrabold text-2xl tracking-widest drop-shadow-lg select-none hover:text-yellow-300 transition-colors duration-200"
          style={{ background: "none", border: "none" }}
        >
          Voice E-commerce
        </button>
        <div className="flex items-center gap-4">
          <button
            onClick={onVoiceClick}
            className="flex items-center gap-2 bg-yellow-300 text-blue-900 font-bold px-4 py-2 rounded-full shadow-lg hover:bg-yellow-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-200 text-lg"
            title="Voice Command"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 18.75v1.5m0 0a6.75 6.75 0 01-6.75-6.75h1.5A5.25 5.25 0 0012 19.5a5.25 5.25 0 005.25-5.25h1.5A6.75 6.75 0 0112 20.25zm0-15v6.75m0 0a2.25 2.25 0 002.25-2.25V5.25A2.25 2.25 0 0012 3a2.25 2.25 0 00-2.25 2.25v6.75A2.25 2.25 0 0012 12.75z"
              />
            </svg>
            Voice
          </button>
          <button
            onClick={() => navigate("/cart")}
            className="relative flex items-center gap-2 bg-yellow-400 text-blue-900 font-bold px-6 py-2 rounded-full shadow-lg hover:bg-yellow-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-200 text-lg"
            title="Cart"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25A3.75 3.75 0 0011.25 18h1.5a3.75 3.75 0 003.75-3.75m-9-7.5h11.19c.621 0 1.098.584.972 1.192l-1.5 7.5A1.125 1.125 0 0116.313 15H7.687a1.125 1.125 0 01-1.11-.908l-1.5-7.5A1.125 1.125 0 016.065 4.5z"
              />
            </svg>
            Cart
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
