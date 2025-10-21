// Simple SVG icons for demo purposes
import React from "react";  

export const icons = {
  Apple: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-red-400">
      <path d="M16.5 2a4.5 4.5 0 0 1-3.5 4.5A4.5 4.5 0 0 1 16.5 2zM12 7c-3.5 0-6 2.5-6 6 0 2.5 2 7 6 7s6-4.5 6-7c0-3.5-2.5-6-6-6z" />
    </svg>
  ),
  Mango: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-yellow-400">
      <ellipse cx="12" cy="14" rx="7" ry="8" />
      <path d="M12 6c1-2 4-2 4 0" stroke="#a3e635" strokeWidth="2" fill="none" />
    </svg>
  ),
  Banana: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-yellow-300">
      <path d="M6 18c6 2 10-4 10-10" stroke="#fbbf24" strokeWidth="2" fill="none" />
      <path d="M6 18c1 2 4 2 6 0" stroke="#fde68a" strokeWidth="2" fill="none" />
    </svg>
  ),
  Milk: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-blue-200">
      <rect x="8" y="6" width="8" height="12" rx="4" />
      <rect x="10" y="2" width="4" height="4" rx="2" />
    </svg>
  ),
  Cheese: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-yellow-500">
      <rect x="4" y="10" width="16" height="8" rx="4" />
      <circle cx="8" cy="14" r="1.5" fill="#fde68a" />
      <circle cx="16" cy="14" r="1.5" fill="#fde68a" />
    </svg>
  ),
  Sugar: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-gray-300">
      <ellipse cx="12" cy="16" rx="6" ry="4" />
      <rect x="8" y="4" width="8" height="10" rx="4" />
    </svg>
  ),
  Salt: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-gray-400">
      <ellipse cx="12" cy="16" rx="6" ry="4" />
      <rect x="10" y="4" width="4" height="10" rx="2" />
    </svg>
  ),
};
