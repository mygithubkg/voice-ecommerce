import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Header = ({ onVoiceClick }) => {
  const navigate = useNavigate();
  const { items } = useCart();
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="w-full bg-gradient-to-r from-indigo-800 to-blue-700 shadow-xl sticky top-0 z-50">
      <div className="w-4/5 max-w-[1600px] mx-auto flex justify-between items-center px-6 py-3 text-lg">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-white font-bold text-2xl tracking-tight select-none hover:text-yellow-300 transition-colors duration-200 focus:outline-none"
          style={{ background: "none", border: "none" }}
        >
          <img src="/vite.svg" alt="Logo" className="w-8 h-8 mr-2 drop-shadow" />
          <span className="font-bold text-2xl tracking-tight">VoiceCart</span>
        </button>
        <nav className="flex items-center gap-2 md:gap-4">
          <button
            onClick={() => navigate("/")}
            className="text-white/90 hover:text-yellow-300 font-semibold px-3 py-2 rounded-full transition-colors duration-200 text-base"
          >
            Home
          </button>
          <button
            onClick={() => navigate("/products")}
            className="text-white/90 hover:text-yellow-300 font-semibold px-3 py-2 rounded-full transition-colors duration-200 text-base"
          >
            Products
          </button>
          <button
            onClick={onVoiceClick}
            className="flex items-center gap-2 bg-white/10 border border-white/20 text-white font-semibold px-4 py-2 rounded-full shadow hover:bg-white/20 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-200 text-base backdrop-blur"
            title="Voice Command"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 18.75v1.5m0 0a6.75 6.75 0 01-6.75-6.75h1.5A5.25 5.25 0 0012 19.5a5.25 5.25 0 005.25-5.25h1.5A6.75 6.75 0 0112 20.25zm0-15v6.75m0 0a2.25 2.25 0 002.25-2.25V5.25A2.25 2.25 0 0012 3a2.25 2.25 0 00-2.25 2.25v6.75A2.25 2.25 0 0012 12.75z"
              />
            </svg>
            <span className="hidden sm:inline">Voice</span>
          </button>
          <button
            onClick={() => navigate("/cart")}
            className="relative flex items-center gap-2 bg-yellow-400 text-blue-900 font-bold px-5 py-2 rounded-full shadow-lg hover:bg-yellow-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-200 text-base"
            title="Cart"
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
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25A3.75 3.75 0 0011.25 18h1.5a3.75 3.75 0 003.75-3.75m-9-7.5h11.19c.621 0 1.098.584.972 1.192l-1.5 7.5A1.125 1.125 0 0116.313 15H7.687a1.125 1.125 0 01-1.11-.908l-1.5-7.5A1.125 1.125 0 016.065 4.5z"
              />
            </svg>
            <span className="hidden sm:inline">Cart</span>
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5 shadow border-2 border-white">
              {cartCount}
            </span>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
