import React from "react";
import { categories } from "../components/ProductList";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
  <div className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-indigo-600 to-cyan-600 py-12 md:py-16 mb-10 shadow-lg rounded-b-3xl">
        <div className="w-[95%] md:w-[90%] lg:w-4/5 max-w-[1600px] mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 text-base sm:text-lg">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg">
              Welcome to <span className="text-cyan-200">VoiceCart</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-indigo-100 mb-6 max-w-lg mx-auto md:mx-0">
              Shop your favorite groceries and snacks with ease. Use voice commands for a futuristic shopping experience!
            </p>
            <button 
              className="bg-white hover:bg-slate-100 text-indigo-600 font-bold px-6 sm:px-8 py-3 rounded-full shadow-lg text-base sm:text-lg transition-all duration-200 hover:scale-105" 
              onClick={() => navigate("/products")}
            >
              Browse Products
            </button>
          </div>
          <div className="flex-1 flex justify-center mt-6 md:mt-0">
            <img src="/vite.svg" alt="VoiceCart Logo" className="w-32 h-32 sm:w-40 sm:h-40 md:w-56 md:h-56 drop-shadow-2xl" />
          </div>
        </div>
      </section>
      {/* Category Overview */}
      <div className="w-[95%] md:w-[90%] lg:w-4/5 max-w-[1600px] mx-auto py-6 md:py-8 px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center text-white mb-8 md:mb-10 tracking-tight">
          Shop by Category
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="bg-slate-800 rounded-2xl shadow-lg p-5 md:p-6 flex flex-col items-center border border-slate-700 hover:border-indigo-500 hover:shadow-indigo-500/20 hover:-translate-y-1 transition-all duration-200 group cursor-pointer"
              onClick={() => navigate(`/products#${cat.name.toLowerCase()}`)}
            >
              <div className="mb-3 text-indigo-400 text-3xl md:text-4xl">
                <span role="img" aria-label={cat.name}>{cat.emoji || "🛒"}</span>
              </div>
              <h3 className="font-bold text-xl md:text-2xl text-white mb-1 tracking-wide">
                {cat.name}
              </h3>
              <p className="text-slate-400 text-sm text-center mt-2">{cat.products.length} items</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
