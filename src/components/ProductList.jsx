import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { motion } from "framer-motion";
import { getAllProducts, getAllCategories } from "../data/productlist";

// Use centralized product catalog
const products = getAllProducts();
const categories = getAllCategories();

const ProductCard = ({ product, onAdd }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    whileHover={{ scale: 1.04 }}
    className="bg-white rounded-3xl shadow-xl p-7 flex flex-col items-center border border-indigo-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-200 group relative"
  >
    <div className="mb-4 scale-110 group-hover:scale-125 transition-transform duration-200">
      <img
        src={product.image || "/vite.svg"}
        alt={product.name}
        className="w-20 h-20 object-contain mb-2 drop-shadow"
      />
    </div>
    <h2 className="font-bold text-xl text-blue-800 mb-1 tracking-wide">{product.name}</h2>
    <p className="text-indigo-600 font-semibold mb-3 text-base">${product.price.toFixed(2)}</p>
    <button
      onClick={() => onAdd(product, 1)}
  className="bg-linear-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-full font-semibold shadow hover:from-blue-700 hover:to-indigo-700 transition-colors duration-200 w-full text-base"
    >
      Add to Cart
    </button>
  </motion.div>
);

const ProductList = () => {
  const { addToCart } = useContext(CartContext);

  return (
    <section className="p-8 w-4/5 max-w-[1600px] mx-auto text-lg">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-10 text-center tracking-tight drop-shadow-lg">
        🛍️ Browse Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAdd={addToCart} />
        ))}
      </div>
    </section>
  );
};

export { ProductList, products , categories };