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
    whileHover={{ scale: 1.03 }}
    className="bg-white rounded-2xl shadow-md p-5 flex flex-col items-center justify-between hover:shadow-lg transition-shadow duration-200"
  >
    <img
      src={product.image}
      alt={product.name}
      className="w-24 h-24 object-contain mb-3"
    />
    <h2 className="font-semibold text-lg text-gray-800">{product.name}</h2>
    <p className="text-indigo-600 font-bold text-md mb-2">${product.price.toFixed(2)}</p>
    <button
      onClick={() => onAdd(product, 1)}
      className="bg-indigo-600 text-white font-medium px-4 py-2 rounded-full hover:bg-indigo-500 transition duration-200"
    >
      Add to Cart
    </button>
  </motion.div>
);

const ProductList = () => {
  const { addToCart } = useContext(CartContext);

  return (
    <section className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">🛍️ Browse Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAdd={addToCart} />
        ))}
      </div>
    </section>
  );
};

export { ProductList, products , categories};