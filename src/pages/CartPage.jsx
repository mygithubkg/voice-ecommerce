import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import generateInvoice from "../components/InvoiceGenerator";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ArrowRight, ShoppingBag, Sparkles } from "lucide-react";
import { icons } from "../assets/itemIcons";

const CartPage = () => {
  const { items, removeFromCart, setQuantity, clearCart } = useContext(CartContext);
  const { user } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.05;
  const delivery = subtotal > 500 || subtotal === 0 ? 0 : 40;
  const total = subtotal + tax + delivery - discount;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.toUpperCase() === "VOICE20") {
      setDiscount(subtotal * 0.2);
      addToast("Promo code applied! 20% off.", "success");
    } else {
      setDiscount(0);
      addToast("Invalid promo code.", "error");
    }
  };

  const handleCheckout = () => {
    if (!user) {
      addToast("Please sign in to complete checkout", "info");
      navigate("/profile");
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      addToast("Order placed successfully!", "success");
      clearCart();
      navigate("/");
    }, 1500);
  };

  const handleDownloadInvoice = async () => {
    if (!user) {
      addToast("Please sign in to download invoice", "info");
      return;
    }
    try {
      const buyer = { name: user.displayName, email: user.email, phone: "", address: "" };
      await generateInvoice(items, total, buyer);
      addToast("Invoice downloaded successfully", "success");
    } catch (err) {
      addToast("Failed to generate invoice", "error");
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] pt-32 pb-24 px-6 lg:px-12 relative overflow-hidden font-sans">

      {/* Editorial Ambient Glow */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#00D4AA] opacity-[0.03] blur-[150px] rounded-full pointer-events-none -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#6C63FF] opacity-[0.03] blur-[150px] rounded-full pointer-events-none translate-y-1/2"></div>

      <div className="max-w-[1200px] mx-auto w-full relative z-10">

        {/* Editorial Header */}
        <div className="mb-16 flex items-baseline gap-4">
          <h1 className="text-5xl lg:text-7xl font-serif text-white tracking-tighter">
            your cart.
          </h1>
          <span className="text-white/30 font-light text-2xl lg:text-3xl">({items.length})</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">

          {/* Left Column: Cart Items (60%) */}
          <div className="w-full lg:w-[60%]">
            {items.length === 0 ? (
              <div className="bg-white/[0.02] border border-white/5 backdrop-blur-3xl rounded-[2rem] p-16 flex flex-col items-center justify-center text-center min-h-[50vh]">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="mb-8 relative"
                >
                  <div className="w-32 h-32 bg-white/[0.02] rounded-full flex items-center justify-center border border-white/10 shadow-[0_0_50px_rgba(255,255,255,0.02)]">
                    <ShoppingBag className="w-10 h-10 text-white/50 stroke-[1]" />
                  </div>
                </motion.div>
                <h2 className="text-3xl font-serif text-white mb-4 tracking-tight">Your bag is empty</h2>
                <p className="text-white/50 mb-10 max-w-sm font-light leading-relaxed">
                  Summon your assistant to add items instantly, or browse our curated aisles.
                </p>
                <button
                  onClick={() => navigate("/products")}
                  className="px-8 py-3.5 bg-white text-[#0A0A0F] font-medium rounded-full hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  Explore Aisles
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <AnimatePresence mode="popLayout">
                  {items.map((item) => (
                    <motion.div
                      layout
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -50, filter: "blur(10px)" }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      className="group relative flex items-center gap-6 p-4 pr-6 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors duration-500"
                    >
                      {/* Item Icon Box */}
                      <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white/[0.03] border border-white/5 rounded-[1.5rem] flex items-center justify-center text-4xl flex-shrink-0 shadow-inner group-hover:bg-white/[0.05] transition-colors">
                        {icons[item.name] || "🛒"}
                      </div>

                      {/* Item Details */}
                      <div className="flex-1 min-w-0 py-2">
                        <span className="text-[10px] font-medium text-[#00D4AA] uppercase tracking-[0.2em] mb-1.5 block">
                          {item.categoryName || "Premium"}
                        </span>
                        <h3 className="font-serif text-white text-xl sm:text-2xl truncate mb-1">
                          {item.name}
                        </h3>
                        <p className="text-white/40 text-sm font-light">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>

                      {/* Controls */}
                      <div className="flex items-center gap-6">
                        <div className="hidden sm:flex items-center gap-1 bg-white/[0.03] border border-white/10 rounded-full p-1 shadow-inner">
                          <button
                            onClick={() => {
                              if (item.quantity > 1) setQuantity(item, item.quantity - 1);
                              else removeFromCart(item, 1);
                            }}
                            className="w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:bg-white/10 hover:text-white transition-colors"
                          >
                            <Minus className="w-4 h-4 stroke-[1.5]" />
                          </button>
                          <div className="w-6 flex justify-center overflow-hidden">
                            <AnimatePresence mode="popLayout" initial={false}>
                              <motion.span
                                key={item.quantity}
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: 20, opacity: 0 }}
                                className="text-white font-medium"
                              >
                                {item.quantity}
                              </motion.span>
                            </AnimatePresence>
                          </div>
                          <button
                            onClick={() => setQuantity(item, item.quantity + 1)}
                            className="w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:bg-white/10 hover:text-white transition-colors"
                          >
                            <Plus className="w-4 h-4 stroke-[1.5]" />
                          </button>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                          <span className="font-medium text-white text-lg">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                          <button
                            onClick={() => removeFromCart(item, item.quantity)}
                            className="text-white/20 hover:text-red-400 transition-colors duration-300"
                          >
                            <X className="w-5 h-5 stroke-[1.5]" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Right Column: Order Summary (40%) */}
          <div className="w-full lg:w-[40%] lg:sticky lg:top-32">
            <div className="bg-white/[0.02] border border-white/10 backdrop-blur-3xl rounded-[2.5rem] p-8 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.5)] relative overflow-hidden">

              <h3 className="text-2xl font-serif text-white mb-8 tracking-tight">Summary</h3>

              {/* Promo Code Pill Form */}
              <form onSubmit={handleApplyPromo} className="mb-10 relative">
                <div className="flex items-center w-full bg-white/5 border border-white/10 rounded-full p-1.5 focus-within:border-white/30 focus-within:bg-white/10 transition-all duration-300">
                  <input
                    type="text"
                    placeholder="Promo code..."
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="bg-transparent pl-5 pr-4 w-full outline-none text-white placeholder:text-white/30 font-light uppercase tracking-wider"
                  />
                  <button
                    type="submit"
                    className="px-6 py-2.5 shrink-0 bg-white/10 hover:bg-white text-white hover:text-[#0A0A0F] rounded-full font-medium transition-colors duration-300 text-sm"
                  >
                    Apply
                  </button>
                </div>
              </form>

              {/* Ledger */}
              <div className="space-y-5 mb-8 font-light">
                <div className="flex justify-between text-white/60">
                  <span>Subtotal</span>
                  <span className="text-white font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Taxes (5%)</span>
                  <span className="text-white font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Shipping</span>
                  {delivery === 0 ? (
                    <span className="text-[#00D4AA] font-medium flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Complimentary
                    </span>
                  ) : (
                    <span className="text-white font-medium">${delivery.toFixed(2)}</span>
                  )}
                </div>

                <AnimatePresence>
                  {discount > 0 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="flex justify-between text-[#00D4AA] overflow-hidden"
                    >
                      <span>Discount applied</span>
                      <span className="font-medium">-${discount.toFixed(2)}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Total */}
              <div className="border-t border-white/10 pt-8 mb-10 flex justify-between items-end">
                <span className="text-white/60 font-light">Total</span>
                <span className="text-5xl font-serif text-white tracking-tighter leading-none">
                  ${total.toFixed(2)}
                </span>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-4 relative z-10">
                <button
                  onClick={handleCheckout}
                  disabled={items.length === 0 || isProcessing}
                  className="w-full bg-white text-[#0A0A0F] disabled:bg-white/10 disabled:text-white/30 py-4 rounded-full font-medium transition-all duration-300 flex items-center justify-center gap-2 group hover:scale-[1.02] active:scale-[0.98]"
                >
                  {isProcessing ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="w-5 h-5 border-2 border-black/20 border-t-[#0A0A0F] rounded-full"
                    />
                  ) : (
                    <>
                      Checkout Securely
                      <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </>
                  )}
                </button>

                <AnimatePresence>
                  {items.length > 0 && (
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={handleDownloadInvoice}
                      className="w-full bg-transparent text-white/50 hover:text-white py-3 rounded-full font-light text-sm transition-colors flex items-center justify-center gap-2"
                    >
                      Download Receipt
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;