import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import generateInvoice from "../components/InvoiceGenerator";
import { useNavigate } from "react-router-dom"; // ✅ Add this

const CartPage = () => {
  const { items, removeFromCart, setQuantity, clearCart } = useContext(CartContext); // ✅ Add clearCart
  const navigate = useNavigate(); // ✅ Initialize navigate

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const [showForm, setShowForm] = useState(false);
  const [buyer, setBuyer] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  // ✅ Async handler to generate invoice, clear cart, and navigate
  const handleGenerate = async () => {
    try {
      await generateInvoice(items, total, buyer);
      setShowForm(false);                           
      clearCart();
      navigate("/");
    } catch (err) {
      console.error("Invoice generation failed:", err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 grid grid-cols-1 md:grid-cols-3 gap-10">
      {/* CART SECTION */}
      <div className="md:col-span-2 bg-white rounded-3xl shadow-2xl p-8 border border-indigo-100">
        <h2 className="text-3xl font-extrabold text-blue-900 mb-8 tracking-wide flex items-center gap-3">
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
                  <th className="px-4 py-2 text-lg font-bold text-indigo-700 rounded-l-xl">Item</th>
                  <th className="px-4 py-2 text-lg font-bold text-indigo-700">Quantity</th>
                  <th className="px-4 py-2 text-lg font-bold text-indigo-700">Total Price</th>
                  <th className="px-4 py-2 rounded-r-xl"></th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="bg-white shadow rounded-xl">
                    <td className="px-4 py-3 font-semibold text-blue-800">{item.name}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          className="bg-red-100 text-red-600 rounded-full px-2 py-1 font-bold hover:bg-red-200"
                          onClick={() => removeFromCart(item, 1)}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={e => setQuantity(item, Number(e.target.value))}
                          className="w-14 text-center border rounded px-1 py-0.5"
                        />
                        <button
                          className="bg-green-100 text-green-700 rounded-full px-2 py-1 font-bold hover:bg-green-200"
                          onClick={() => setQuantity(item, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-bold text-indigo-700">${(item.price * item.quantity).toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <button
                        className="bg-red-500 text-white px-4 py-1 rounded-full hover:bg-red-600 shadow"
                        onClick={() => setQuantity(item, 0)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="mt-8 text-right font-extrabold text-2xl text-indigo-800 border-t pt-6">
          Grand Total: ${total.toFixed(2)}
        </div>
      </div>

      {/* PAY BUTTON */}
      <div className="bg-gradient-to-br from-indigo-100 to-blue-50 rounded-3xl shadow-xl p-8 flex flex-col items-center border border-indigo-100">
        <h3 className="text-2xl font-bold text-indigo-800 mb-6">Invoice</h3>
        <div className="w-full bg-white rounded-xl shadow p-6 mb-6">
          <ul className="text-gray-700 text-base">
            {items.map((item) => (
              <li key={item.id} className="flex justify-between mb-2">
                <span>{item.name} x{item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="border-t mt-3 pt-3 font-bold flex justify-between text-lg">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:from-blue-600 hover:to-indigo-600 transition-colors duration-200 text-xl"
        >
          Proceed to Pay
        </button>
      </div>

      {/* BILLING FORM MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md space-y-4">
            <h2 className="text-xl font-bold text-indigo-700">Enter Billing Details</h2>

            <input
              className={`w-full border px-3 py-2 rounded ${buyer.name && !/^[a-zA-Z ]{3,40}$/.test(buyer.name) ? "border-red-500" : ""}`}
              type="text"
              placeholder="Name (Only letters, 3–40 chars)"
              value={buyer.name}
              onChange={(e) => setBuyer({ ...buyer, name: e.target.value })}
              required
            />

            <input
              className={`w-full border px-3 py-2 rounded ${buyer.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(buyer.email) ? "border-red-500" : ""}`}
              type="email"
              placeholder="Email"
              value={buyer.email}
              onChange={(e) => setBuyer({ ...buyer, email: e.target.value })}
              required
            />

            <input
              className={`w-full border px-3 py-2 rounded ${buyer.phone && !/^\d{10}$/.test(buyer.phone) ? "border-red-500" : ""}`}
              type="text"
              placeholder="Phone (10 digits)"
              value={buyer.phone}
              onChange={(e) => setBuyer({ ...buyer, phone: e.target.value })}
              required
            />

            <textarea
              className={`w-full border px-3 py-2 rounded ${buyer.address && (buyer.address.length < 10 || buyer.address.length > 100) ? "border-red-500" : ""}`}
              rows={3}
              placeholder="Address (10–100 characters)"
              value={buyer.address}
              onChange={(e) => setBuyer({ ...buyer, address: e.target.value })}
              required
            ></textarea>

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  const isValid =
                    /^[a-zA-Z ]{3,40}$/.test(buyer.name) &&
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(buyer.email) &&
                    /^\d{10}$/.test(buyer.phone) &&
                    buyer.address.length >= 10 &&
                    buyer.address.length <= 100;

                  if (isValid) {
                    handleGenerate();
                  } else {
                    alert("Please fill all fields correctly.");
                  }
                }}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Download Invoice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
