import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import useVoiceHandler from "./VoiceHandler";

const voiceProducts = [
  { id: 1, name: "Apple", price: 1.5 },
  { id: 2, name: "Mango", price: 2.0 },
  { id: 3, name: "Banana", price: 1.0 },
  { id: 4, name: "Sugar", price: 0.8 },
  { id: 5, name: "Milk", price: 1.2 },
];

const VoiceIntegration = ({ active }) => {
  const { addToCart, removeFromCart } = useContext(CartContext);

  useVoiceHandler(
    active
      ? ({ action, product, quantity }) => {
          const found = voiceProducts.find(
            (p) => p.name.toLowerCase() === product.toLowerCase()
          );
          if (!found) return;
          if (action === "add") addToCart(found, quantity);
          else if (action === "remove") removeFromCart(found, quantity);
        }
      : () => {}
  );

  return null;
};

export default VoiceIntegration;
