import React from "react";
import { categories } from "../components/ProductList";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-indigo-900 to-blue-700 py-16 mb-10 shadow-lg rounded-b-3xl">
        <div className="w-4/5 max-w-[1600px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8 text-lg">
          <div className="flex-1">
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg">
              Welcome to <span className="text-yellow-300">VoiceCart</span>
            </h1>
            <p className="text-lg md:text-xl text-indigo-100 mb-6 max-w-lg">
              Shop your favorite groceries and snacks with ease. Use voice commands for a futuristic shopping experience!
            </p>
            <button className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold px-8 py-3 rounded-full shadow-lg text-lg transition-colors duration-200" onClick={() => navigate("/products")}>Browse Products</button>
          </div>
          <div className="flex-1 flex justify-center">
            <img src="/vite.svg" alt="VoiceCart Logo" className="w-40 h-40 md:w-56 md:h-56 drop-shadow-2xl" />
          </div>
        </div>
      </section>
      {/* Category Overview */}
      <div className="w-4/5 max-w-[1600px] mx-auto py-8 px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-blue-900 mb-10 drop-shadow-lg tracking-tight">
          Shop by Category
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center border border-indigo-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 group cursor-pointer"
              onClick={() => navigate(`/products#${cat.name.toLowerCase()}`)}
            >
              <div className="mb-3 text-indigo-700 text-4xl">
                <span role="img" aria-label={cat.name}>{cat.emoji || "🛒"}</span>
              </div>
              <h3 className="font-bold text-2xl text-blue-800 mb-1 tracking-wide">
                {cat.name}
              </h3>
              <p className="text-gray-500 text-sm text-center mt-2">{cat.products.length} items</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
