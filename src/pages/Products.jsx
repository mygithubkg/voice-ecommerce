import React from "react";
import { categories } from "../components/ProductList";
import { icons } from "../assets/itemIcons";
import { useCart } from "../context/CartContext";

const Products = () => {
  const { addToCart, getItemQuantity } = useCart();
  return (
    <div className="min-h-screen bg-slate-900 py-10 px-4">
      <div className="w-4/5 max-w-[1600px] mx-auto text-lg">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-white mb-12 tracking-tight">
          All Products
        </h1>
        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {categories.map((cat) => (
            <a
              key={cat.name}
              href={`#${cat.name.toLowerCase()}`}
              className="bg-slate-800 border border-slate-700 rounded-full px-5 py-2 text-indigo-400 font-semibold shadow hover:bg-slate-700 hover:border-indigo-500 transition-all duration-200"
            >
              {cat.name}
            </a>
          ))}
        </div>
        {/* Products by Category */}
        <div className="space-y-16">
          {categories.map((cat) => (
            <section key={cat.name} id={cat.name.toLowerCase()} className="">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 border-l-4 border-indigo-500 pl-4">
                {cat.name}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {cat.products.map((product) => {
                  const quantity = getItemQuantity(product.id);
                  return (
                    <div
                      key={product.id}
                      className="bg-slate-800 rounded-3xl shadow-xl p-7 flex flex-col items-center border border-slate-700 hover:border-indigo-500 hover:shadow-indigo-500/20 hover:-translate-y-1 transition-all duration-200 group relative"
                    >
                      <div className="mb-4 scale-110 group-hover:scale-125 transition-transform duration-200">
                        {icons[product.name] || <span className="text-3xl">🛒</span>}
                      </div>
                      <h3 className="font-bold text-xl text-white mb-1 tracking-wide">
                        {product.name}
                      </h3>
                      <p className="text-indigo-400 font-semibold mb-3 text-base">
                        ${product.price.toFixed(2)}
                      </p>
                      <button
                        className="bg-gradient-to-r from-indigo-600 to-cyan-600 text-white px-6 py-2 rounded-full font-semibold shadow hover:shadow-indigo-500/30 hover:scale-105 transition-all duration-200 w-full text-base"
                        onClick={() => addToCart(product, 1)}
                      >
                        Add to Cart
                      </button>
                      {quantity > 0 && (
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs text-cyan-400 font-semibold">In Cart: {quantity}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products; 