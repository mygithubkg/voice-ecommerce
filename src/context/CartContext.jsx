import React, { createContext, useReducer, useMemo, useContext } from "react";

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

  const addToCart = (product, quantity = 1) =>
    dispatch({ type: "ADD", product, quantity });

  const removeFromCart = (product, quantity = 1) =>
    dispatch({ type: "REMOVE", product, quantity });

  const setQuantity = (product, quantity) =>
    dispatch({ type: "SET_QUANTITY", product, quantity });

  const clearCart = () => dispatch({ type: "CLEAR" });

  const getItemQuantity = (productId) =>
    state.items.find(item => item.id === productId)?.quantity || 0;

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