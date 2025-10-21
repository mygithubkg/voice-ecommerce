// ====== CENTRALIZED PRODUCT CATALOG ======
// This file is the single source of truth for all products
// Used by both frontend (React) and backend (Node.js/Express)
// When you add/update products here, it reflects everywhere automatically

const PRODUCT_CATALOG = {
  categories: [
    {
      name: "Fruits",
      emoji: "🍎",
      products: [
        { id: 1, name: "Apple", price: 1.5, aliases: ["apples", "apple"] },
        { id: 2, name: "Mango", price: 2.0, aliases: ["mangoes", "mango"] },
        { id: 3, name: "Banana", price: 1.0, aliases: ["bananas", "banana"] },
        { id: 4, name: "Orange", price: 1.3, aliases: ["oranges", "orange"] },
        { id: 5, name: "Grapes", price: 1.8, aliases: ["grape", "grapes"] },
      ],
    },
    {
      name: "Dairy",
      emoji: "🥛",
      products: [
        { id: 6, name: "Milk", price: 1.2, aliases: ["milk", "dairy milk"] },
        { id: 7, name: "Cheese", price: 2.5, aliases: ["cheese", "cheddar"] },
        { id: 8, name: "Butter", price: 2.0, aliases: ["butter"] },
        { id: 9, name: "Yogurt", price: 1.7, aliases: ["yogurt", "yoghurt", "curd"] },
      ],
    },
    {
      name: "Groceries",
      emoji: "🌾",
      products: [
        { id: 10, name: "Sugar", price: 0.8, aliases: ["sugar"] },
        { id: 11, name: "Salt", price: 0.5, aliases: ["salt"] },
        { id: 12, name: "Rice", price: 1.0, aliases: ["rice"] },
        { id: 13, name: "Wheat Flour", price: 1.1, aliases: ["flour", "wheat flour", "atta"] },
        { id: 14, name: "Oil", price: 2.3, aliases: ["oil", "cooking oil"] },
      ],
    },
    {
      name: "Beverages",
      emoji: "☕",
      products: [
        { id: 15, name: "Tea", price: 1.4, aliases: ["tea", "chai"] },
        { id: 16, name: "Coffee", price: 2.0, aliases: ["coffee"] },
        { id: 17, name: "Juice", price: 1.9, aliases: ["juice", "fruit juice"] },
      ],
    },
    {
      name: "Snacks",
      emoji: "🍿",
      products: [
        { id: 18, name: "Biscuits", price: 1.0, aliases: ["biscuits", "biscuit", "cookies"] },
        { id: 19, name: "Chips", price: 1.3, aliases: ["chips", "crisps"] },
        { id: 20, name: "Popcorn", price: 1.5, aliases: ["popcorn"] },
      ],
    },
  ],
};

// Helper functions for easy access
export const getAllProducts = () => {
  return PRODUCT_CATALOG.categories.flatMap(cat => cat.products);
};

export const getAllCategories = () => {
  return PRODUCT_CATALOG.categories;
};

export const findProductById = (id) => {
  return getAllProducts().find(p => p.id === id);
};

export const findProductByName = (name) => {
  const allProducts = getAllProducts();
  const searchTerm = name.toLowerCase().trim();
  
  return allProducts.find(p => 
    p.name.toLowerCase() === searchTerm ||
    p.aliases.some(alias => alias.toLowerCase() === searchTerm)
  );
};

export default PRODUCT_CATALOG;