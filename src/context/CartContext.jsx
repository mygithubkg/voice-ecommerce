import React, { createContext, useReducer, useMemo, useContext, useEffect } from "react";

// Initial cart state
const initialState = {
  items: [], // Each item: { id, name, price, quantity }
};

// Create context
const CartContext = createContext();

// Reducer function to handle actions
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD": {
      const exists = state.items.find(item => item.id === action.product.id);
      const updatedItems = exists
        ? state.items.map(item =>
            item.id === action.product.id
              ? { ...item, quantity: item.quantity + action.quantity }
              : item
          )
        : [...state.items, { ...action.product, quantity: action.quantity }];
      return { ...state, items: updatedItems };
    }

    case "REMOVE": {
      const updatedItems = state.items
        .map(item =>
          item.id === action.product.id
            ? { ...item, quantity: item.quantity - action.quantity }
            : item
        )
        .filter(item => item.quantity > 0);
      return { ...state, items: updatedItems };
    }

    case "SET_QUANTITY": {
      const updatedItems = state.items.map(item =>
        item.id === action.product.id
          ? { ...item, quantity: Math.max(0, action.quantity) }
          : item
      );
      return { ...state, items: updatedItems.filter(item => item.quantity > 0) };
    }

    case "CLEAR":
      return initialState;

    default:
      console.warn(`Unhandled action type: ${action.type}`);
      return state;
  }
};

// Provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product, quantity = 1) => {
    dispatch({ type: "ADD", product, quantity });
    return true;
  };

  const removeFromCart = (product, quantity = 1) => {
    // Check if product exists in cart before removing
    const existingItem = state.items.find(item => item.id === product.id);
    if (!existingItem) {
      return false; // Product not in cart
    }
    dispatch({ type: "REMOVE", product, quantity });
    return true; // Successfully removed
  };

  const setQuantity = (product, quantity) =>
    dispatch({ type: "SET_QUANTITY", product, quantity });

  const clearCart = () => dispatch({ type: "CLEAR" });

  const getItemQuantity = (productId) =>
    state.items.find(item => item.id === productId)?.quantity || 0;


  // Live monitoring: send cart state to backend on every change
  useEffect(() => {
    const sendCartToBackend = async () => {
      try {
        await fetch((import.meta?.env?.VITE_BACKEND_URL || "http://localhost:5000") + "/cart-monitor", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cart: state.items }),
        });
      } catch (e) {
        // Optionally log or ignore
      }
    };
    sendCartToBackend();
  }, [state.items]);

  const contextValue = useMemo(
    () => ({
      items: state.items,
      addToCart,
      removeFromCart,
      setQuantity,
      clearCart,
      getItemQuantity,
    }),
    [state.items]
  );

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

// Hook for easier usage
export const useCart = () => useContext(CartContext);
export { CartContext };