import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import generateInvoice from "../components/InvoiceGenerator";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { items, removeFromCart, setQuantity, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const [buyer, setBuyer] = useState({ name: "", email: "", phone: "", address: "" });
  const [step, setStep] = useState(0);
  const [touched, setTouched] = useState({});

  const handleGenerate = async () => {
    try {
      await generateInvoice(items, total, buyer);
      clearCart();
      navigate("/");
    } catch (err) {
      console.error("Invoice generation failed:", err);
    }
  };

  // Validation helpers
  const errors = {
    name: buyer.name && !/^[a-zA-Z ]{3,40}$/.test(buyer.name),
    email: buyer.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(buyer.email),
    phone: buyer.phone && !/^\d{10}$/.test(buyer.phone),
    address: buyer.address && (buyer.address.length < 10 || buyer.address.length > 100),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10 px-2 md:px-8 font-['Inter','Roboto','Avenir',Helvetica,Arial,sans-serif]">
      <div className="w-4/5 max-w-[1600px] mx-auto text-lg">
        {/* Stepper */}
        <div className="flex items-center justify-center mb-10">
          <div className="flex items-center gap-4">
            <div className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-lg border-2 ${step === 0 ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-indigo-600 border-indigo-300'}`}>1</div>
            <span className={`font-semibold ${step === 0 ? 'text-indigo-700' : 'text-gray-400'}`}>Cart</span>
            <div className="w-10 h-1 bg-indigo-200 rounded"></div>
            <div className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-lg border-2 ${step === 1 ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-indigo-600 border-indigo-300'}`}>2</div>
            <span className={`font-semibold ${step === 1 ? 'text-indigo-700' : 'text-gray-400'}`}>Billing</span>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* CART SECTION */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-2xl p-10 border border-indigo-100">
            <h2 className="text-4xl font-extrabold text-blue-900 mb-8 tracking-wide flex items-center gap-3">
              <svg className="w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A2 2 0 007.48 19h8.04a2 2 0 001.83-1.3L17 13M7 13V6h13" />
              </svg>
              Your Cart
            </h2>
            {items.length === 0 ? (
              <p className="text-gray-500 text-lg">Your cart is empty.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-left border-separate border-spacing-y-2">
                  <thead>
                    <tr className="bg-gradient-to-r from-blue-100 to-indigo-100">
                      <th className="px-4 py-2 text-lg font-bold text-indigo-700 rounded-l-xl">SNo</th>
                      <th className="px-4 py-2 text-lg font-bold text-indigo-700">Item</th>
                      <th className="px-4 py-2 text-lg font-bold text-indigo-700">Quantity</th>
                      <th className="px-4 py-2 text-lg font-bold text-indigo-700">Total Price</th>
                      <th className="px-4 py-2 rounded-r-xl"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, idx) => (
                      <tr key={item.id} className="bg-white shadow rounded-xl align-top">
                        <td className="px-4 py-3 font-semibold text-blue-800 text-center">{idx + 1}</td>
                        <td className="px-4 py-3">
                          <div className="font-semibold text-blue-900 text-base">{item.name}</div>
                          <div className="text-xs text-gray-500 mt-1">Price: <span className="font-bold text-indigo-700">${item.price.toFixed(2)}</span> / qty</div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <button
                              className="rounded-full bg-indigo-100 hover:bg-indigo-200 p-2 text-indigo-600 transition"
                              onClick={() => removeFromCart(item, 1)}
                              title="Decrease"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/><path d="M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                            </button>
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={e => setQuantity(item, Number(e.target.value))}
                              className="w-14 text-center border rounded px-1 py-0.5 font-semibold text-indigo-700"
                            />
                            <button
                              className="rounded-full bg-indigo-100 hover:bg-indigo-200 p-2 text-indigo-600 transition"
                              onClick={() => setQuantity(item, item.quantity + 1)}
                              title="Increase"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/><path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                            </button>
                          </div>
                        </td>
                        <td className="px-4 py-3 font-bold text-indigo-700 align-top">${(item.price * item.quantity).toFixed(2)}</td>
                        <td className="px-4 py-3 align-top">
                          <button
                            className="bg-red-100 hover:bg-red-200 p-2 rounded-full text-red-600 transition"
                            onClick={() => setQuantity(item, 0)}
                            title="Delete"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 7h12M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3m-7 0v10a2 2 0 002 2h2a2 2 0 002-2V7" /></svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <div className="mt-10 text-right font-extrabold text-2xl text-indigo-800 border-t pt-6">
              Grand Total: ${total.toFixed(2)}
            </div>
            {items.length > 0 && step === 0 && (
              <button
                onClick={() => setStep(1)}
                className="mt-10 w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-colors duration-200 text-xl"
              >
                Proceed to Billing
              </button>
            )}
          </div>
          {/* INVOICE & BILLING */}
          <div className="flex flex-col gap-8 w-full">
            {/* Invoice Summary */}
            {step === 0 && (
              <div className="w-full bg-white rounded-2xl shadow-xl border border-indigo-100 overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-600 to-blue-500 px-6 py-4 flex items-center gap-3">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 14l2-2 4 4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-2xl font-bold text-indigo-800 mb-6">Invoice Summary</h3>
                </div>
                <div className="p-6">
                  <table className="w-full text-base mb-4">
                    <thead>
                      <tr className="text-indigo-700 border-b">
                        <th className="py-2 text-left font-semibold text-lg">Item</th>
                        <th className="py-2 text-center font-semibold">Qty</th>
                        <th className="py-2 text-right font-semibold">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => (
                        <tr key={item.id} className="border-b last:border-b-0">
                          <td className="py-2 text-blue-900 text-lg">{item.name}</td>
                          <td className="py-2 text-center">{item.quantity}</td>
                          <td className="py-2 text-right">${(item.price * item.quantity).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="flex items-center justify-between border-t pt-4 mt-2">
                    <span className="text-lg font-semibold text-indigo-700 flex items-center gap-2">
                      <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3z" /></svg>
                      Total
                    </span>
                    <span className="text-3xl font-bold text-indigo-900">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}
            {/* Billing Details */}
            {step === 1 && (
              <div className="w-full bg-white rounded-2xl shadow-xl border border-indigo-100 overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-600 to-blue-500 px-6 py-4 flex items-center gap-3">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 01-8 0" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14v7m-4-4h8" />
                  </svg>
                  <h3 className="text-xl font-bold text-white tracking-wide">Billing Details</h3>
                </div>
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    const isValid =
                      /^[a-zA-Z ]{3,40}$/.test(buyer.name) &&
                      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(buyer.email) &&
                      /^\d{10}$/.test(buyer.phone) &&
                      buyer.address.length >= 10 &&
                      buyer.address.length <= 100;
                    if (isValid) {
                      handleGenerate();
                    } else {
                      setTouched({ name: true, email: true, phone: true, address: true });
                    }
                  }}
                  className="p-6 space-y-6"
                >
                  <div className="relative">
                    <input
                      className={`peer w-full border-b-2 bg-transparent px-2 pt-6 pb-2 text-base focus:outline-none focus:border-indigo-500 transition ${errors.name && touched.name ? "border-red-500" : "border-indigo-200"}`}
                      type="text"
                      placeholder=" "
                      value={buyer.name}
                      onChange={e => setBuyer({ ...buyer, name: e.target.value })}
                      onBlur={() => setTouched(t => ({ ...t, name: true }))}
                      required
                    />
                    <label className="absolute left-2 top-2 text-gray-500 text-sm transition-all peer-focus:text-indigo-600 peer-focus:top-0 peer-focus:text-xs peer-placeholder-shown:top-6 peer-placeholder-shown:text-base pointer-events-none">Name (Only letters, 3–40 chars)</label>
                    {errors.name && touched.name && <div className="text-xs text-red-500 mt-1">Enter a valid name.</div>}
                  </div>
                  <div className="relative">
                    <input
                      className={`peer w-full border-b-2 bg-transparent px-2 pt-6 pb-2 text-base focus:outline-none focus:border-indigo-500 transition ${errors.email && touched.email ? "border-red-500" : "border-indigo-200"}`}
                      type="email"
                      placeholder=" "
                      value={buyer.email}
                      onChange={e => setBuyer({ ...buyer, email: e.target.value })}
                      onBlur={() => setTouched(t => ({ ...t, email: true }))}
                      required
                    />
                    <label className="absolute left-2 top-2 text-gray-500 text-sm transition-all peer-focus:text-indigo-600 peer-focus:top-0 peer-focus:text-xs peer-placeholder-shown:top-6 peer-placeholder-shown:text-base pointer-events-none">Email</label>
                    {errors.email && touched.email && <div className="text-xs text-red-500 mt-1">Enter a valid email.</div>}
                  </div>
                  <div className="relative">
                    <input
                      className={`peer w-full border-b-2 bg-transparent px-2 pt-6 pb-2 text-base focus:outline-none focus:border-indigo-500 transition ${errors.phone && touched.phone ? "border-red-500" : "border-indigo-200"}`}
                      type="text"
                      placeholder=" "
                      value={buyer.phone}
                      onChange={e => setBuyer({ ...buyer, phone: e.target.value })}
                      onBlur={() => setTouched(t => ({ ...t, phone: true }))}
                      required
                    />
                    <label className="absolute left-2 top-2 text-gray-500 text-sm transition-all peer-focus:text-indigo-600 peer-focus:top-0 peer-focus:text-xs peer-placeholder-shown:top-6 peer-placeholder-shown:text-base pointer-events-none">Phone (10 digits)</label>
                    {errors.phone && touched.phone && <div className="text-xs text-red-500 mt-1">Enter a valid phone number.</div>}
                  </div>
                  <div className="relative">
                    <textarea
                      className={`peer w-full border-b-2 bg-transparent px-2 pt-6 pb-2 text-base focus:outline-none focus:border-indigo-500 transition ${errors.address && touched.address ? "border-red-500" : "border-indigo-200"}`}
                      rows={3}
                      placeholder=" "
                      value={buyer.address}
                      onChange={e => setBuyer({ ...buyer, address: e.target.value })}
                      onBlur={() => setTouched(t => ({ ...t, address: true }))}
                      required
                    ></textarea>
                    <label className="absolute left-2 top-2 text-gray-500 text-sm transition-all peer-focus:text-indigo-600 peer-focus:top-0 peer-focus:text-xs peer-placeholder-shown:top-6 peer-placeholder-shown:text-base pointer-events-none">Address (10–100 characters)</label>
                    {errors.address && touched.address && <div className="text-xs text-red-500 mt-1">Enter a valid address.</div>}
                  </div>
                  <div className="flex items-center justify-between border-t pt-4 mt-2">
                    <span className="text-lg font-semibold text-indigo-700 flex items-center gap-2">
                      <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3z" /></svg>
                      Total
                    </span>
                    <span className="text-2xl font-bold text-indigo-900">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between gap-3 mt-8">
                    <button
                      type="button"
                      onClick={() => setStep(0)}
                      className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 font-semibold"
                    >
                      Back to Cart
                    </button>
                    <button
                      type="submit"
                      className="px-8 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded font-bold hover:from-indigo-700 hover:to-blue-700 shadow text-lg"
                    >
                      Download Invoice
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
