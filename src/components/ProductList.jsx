import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { motion } from "framer-motion";

const products = [
  { id: 1, name: "Apple", price: 1.5 },
  { id: 2, name: "Mango", price: 2.0 },
  { id: 3, name: "Banana", price: 1.0 },
  { id: 4, name: "Orange", price: 1.3 },
  { id: 5, name: "Grapes", price: 1.8 },
  { id: 6, name: "Milk", price: 1.2 },
  { id: 7, name: "Cheese", price: 2.5 },
  { id: 8, name: "Butter", price: 2.0 },
  { id: 9, name: "Yogurt", price: 1.7 },
  { id: 10, name: "Sugar", price: 0.8 },
  { id: 11, name: "Salt", price: 0.5 },
  { id: 12, name: "Rice", price: 1.0 },
  { id: 13, name: "Wheat Flour", price: 1.1 },
  { id: 14, name: "Oil", price: 2.3 },
  { id: 15, name: "Tea", price: 1.4 },
  { id: 16, name: "Coffee", price: 2.0 },
  { id: 17, name: "Juice", price: 1.9 },
  { id: 18, name: "Biscuits", price: 1.0 },
  { id: 19, name: "Chips", price: 1.3 },
  { id: 20, name: "Popcorn", price: 1.5 },
];

const categories = [
  {
    name: "Fruits",
    products: [
      { id: 1, name: "Apple", price: 1.5 },
      { id: 2, name: "Mango", price: 2.0 },
      { id: 3, name: "Banana", price: 1.0 },
      { id: 4, name: "Orange", price: 1.3 },
      { id: 5, name: "Grapes", price: 1.8 },
    ],
  },
  {
    name: "Dairy",
    products: [
      { id: 6, name: "Milk", price: 1.2 },
      { id: 7, name: "Cheese", price: 2.5 },
      { id: 8, name: "Butter", price: 2.0 },
      { id: 9, name: "Yogurt", price: 1.7 },
    ],
  },
  {
    name: "Groceries",
    products: [
      { id: 10, name: "Sugar", price: 0.8 },
      { id: 11, name: "Salt", price: 0.5 },
      { id: 12, name: "Rice", price: 1.0 },
      { id: 13, name: "Wheat Flour", price: 1.1 },
      { id: 14, name: "Oil", price: 2.3 },
    ],
  },
  {
    name: "Beverages",
    products: [
      { id: 15, name: "Tea", price: 1.4 },
      { id: 16, name: "Coffee", price: 2.0 },
      { id: 17, name: "Juice", price: 1.9 },
    ],
  },
  {
    name: "Snacks",
    products: [
      { id: 18, name: "Biscuits", price: 1.0 },
      { id: 19, name: "Chips", price: 1.3 },
      { id: 20, name: "Popcorn", price: 1.5 },
    ],
  },
];

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
      className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-full font-semibold shadow hover:from-blue-700 hover:to-indigo-700 transition-colors duration-200 w-full text-base"
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