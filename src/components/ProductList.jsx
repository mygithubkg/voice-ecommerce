import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Plus, Minus, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
import { getAllProducts, getAllCategories } from "../data/productlist";
import { icons } from "../assets/itemIcons";

const products = getAllProducts();
const categories = getAllCategories();

export const ProductCard = ({ product, viewMode = "grid" }) => {
  const { addToCart, removeFromCart, getItemQuantity } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const quantity = getItemQuantity(product.id);
  const inCart = quantity > 0;

  const handleAdd = () => {
    addToCart(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const handleDecrease = () => {
    removeFromCart(product.id);
  };

  if (viewMode === "list") {
    return (
      <motion.div
        layout
        layoutId={`product-${product.id}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-[#18181F] border border-[rgba(255,255,255,0.08)] rounded-2xl p-4 flex items-center gap-6 group hover:border-[rgba(255,255,255,0.15)] transition-colors"
      >
        <div className="w-20 h-20 bg-[#1E1E28] rounded-xl flex flex-shrink-0 items-center justify-center text-4xl group-hover:scale-105 transition-transform">
          {icons[product.name] || "🛒"}
        </div>
        
        <div className="flex-1">
          <span className="text-xs font-semibold text-[#9898A8] border border-[rgba(255,255,255,0.06)] px-2 py-1 rounded-md mb-2 inline-block">
            {product.categoryName || "Category"}
          </span>
          <h3 className="font-semibold text-white text-lg">{product.name}</h3>
          
          <div className="flex text-[#F59E0B] mt-1">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-end gap-3 min-w-[120px]">
          <span className="font-bold text-xl text-white">${product.price.toFixed(2)}</span>
          {inCart ? (
            <div className="flex items-center gap-3 bg-[#1E1E28] border border-[rgba(255,255,255,0.1)] rounded-full px-3 py-1.5">
              <button onClick={handleDecrease} className="text-[#9898A8] hover:text-white p-1"><Minus className="w-4 h-4" /></button>
              <span className="text-white font-semibold w-4 text-center">{quantity}</span>
              <button onClick={handleAdd} className="text-[#9898A8] hover:text-white p-1"><Plus className="w-4 h-4" /></button>
            </div>
          ) : (
            <button 
              onClick={handleAdd}
              className="px-6 py-2 rounded-full font-semibold border border-[#6C63FF] text-[#6C63FF] hover:bg-[#6C63FF] hover:text-white transition-colors"
            >
              Add
            </button>
          )}
        </div>
      </motion.div>
    );
  }

  // GRID VIEW
  return (
    <motion.div
      layout
      layoutId={`product-${product.id}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -4 }}
      className="bg-[#18181F] border border-[rgba(255,255,255,0.08)] rounded-2xl overflow-hidden flex flex-col group relative"
      style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }}
    >
      <div className="w-full aspect-square bg-[#1E1E28] relative overflow-hidden flex items-center justify-center p-6">
        {/* Hover overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.4)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none"></div>
        <motion.div 
          className="text-7xl lg:text-8xl relative z-0 drop-shadow-2xl"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.25 }}
        >
          {icons[product.name] || "🛒"}
        </motion.div>
      </div>
      
      <div className="p-5 flex flex-col flex-1">
        <span className="text-[11px] font-semibold text-[#9898A8] uppercase tracking-wider mb-2">
          {product.categoryName || "Category"}
        </span>
        <h3 className="font-semibold text-white text-[15px] mb-1 truncate">{product.name}</h3>
        
        <div className="flex text-[#F59E0B] mb-3">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="w-3 h-3 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
          ))}
        </div>

        <div className="mt-auto">
          <div className="flex items-center justify-between mb-4">
            <span className="font-bold text-[18px] text-white">${product.price.toFixed(2)}</span>
          </div>

          <div className="relative h-10 w-full overflow-hidden rounded-full">
            <AnimatePresence initial={false}>
              {!inCart ? (
                <motion.button
                  key="add-btn"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-100%" }}
                  transition={{ duration: 0.2 }}
                  onClick={handleAdd}
                  className="absolute inset-0 w-full h-full bg-transparent border border-[rgba(255,255,255,0.15)] text-[#F4F4F8] font-semibold hover:bg-[#6C63FF] hover:border-[#6C63FF] transition-colors"
                >
                  {justAdded ? (
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: [1.2, 1] }}
                      className="flex items-center justify-center gap-2"
                    >
                      <Check className="w-5 h-5" /> Added
                    </motion.div>
                  ) : (
                    "Add to Cart"
                  )}
                </motion.button>
              ) : (
                <motion.div
                  key="stepper"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-100%" }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 w-full h-full bg-[#6C63FF] flex items-center justify-between px-2"
                >
                  <button onClick={handleDecrease} className="w-8 h-8 rounded-full bg-[rgba(0,0,0,0.2)] hover:bg-[rgba(0,0,0,0.3)] flex items-center justify-center text-white transition-colors">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-white font-bold">{quantity}</span>
                  <button onClick={handleAdd} className="w-8 h-8 rounded-full bg-[rgba(0,0,0,0.2)] hover:bg-[rgba(0,0,0,0.3)] flex items-center justify-center text-white transition-colors">
                    <Plus className="w-4 h-4" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export { products, categories };