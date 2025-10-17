import React from "react";
import { categories } from "../components/ProductList";
import { icons } from "../assets/itemIcons";
import { useCart } from "../context/CartContext";

const Products = () => {
  const { addToCart, getItemQuantity } = useCart();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10 px-4">
      <div className="w-4/5 max-w-[1600px] mx-auto text-lg">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-blue-900 mb-12 drop-shadow-lg tracking-tight">
          All Products
        </h1>
        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {categories.map((cat) => (
            <a
              key={cat.name}
              href={`#${cat.name.toLowerCase()}`}
              className="bg-white border border-indigo-200 rounded-full px-5 py-2 text-indigo-700 font-semibold shadow hover:bg-indigo-50 transition-colors duration-200"
            >
              {cat.name}
            </a>
          ))}
        </div>
        {/* Products by Category */}
        <div className="space-y-16">
          {categories.map((cat) => (
            <section key={cat.name} id={cat.name.toLowerCase()} className="">
              <h2 className="text-2xl md:text-3xl font-bold text-indigo-800 mb-6 border-l-4 border-yellow-400 pl-4">
                {cat.name}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {cat.products.map((product) => {
                  const quantity = getItemQuantity(product.id);
                  return (
                    <div
                      key={product.id}
                      className="bg-white rounded-3xl shadow-xl p-7 flex flex-col items-center border border-indigo-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-200 group relative"
                    >
                      <div className="mb-4 scale-110 group-hover:scale-125 transition-transform duration-200">
                        {icons[product.name] || <span className="text-3xl">🛒</span>}
                      </div>
                      <h3 className="font-bold text-xl text-blue-800 mb-1 tracking-wide">
                        {product.name}
                      </h3>
                      <p className="text-indigo-600 font-semibold mb-3 text-base">
                        ${product.price.toFixed(2)}
                      </p>
                      <button
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-full font-semibold shadow hover:from-blue-700 hover:to-indigo-700 transition-colors duration-200 w-full text-base"
                        onClick={() => addToCart(product, 1)}
                      >
                        Add to Cart
                      </button>
                      {quantity > 0 && (
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs text-green-600 font-semibold">In Cart: {quantity}</span>
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