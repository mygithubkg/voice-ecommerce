import React from 'react';

// ============================================================================
// REUSABLE PREMIUM SVG ICONS
// Upgraded for the Next-Gen Ambient/Spatial UI Theme.
// ============================================================================

export const LogoIcon = ({ className = "w-7 h-7 text-white", strokeWidth = "1.5" }) => (
  <svg className={`transition-all duration-300 ease-in-out ${className}`} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
    {/* Sleek Microphone for VoiceCart */}
    <rect x="9" y="2" width="6" height="12" rx="3" />
    <path d="M5 10v1a7 7 0 0014 0v-1M12 18v4M8 22h8" />
  </svg>
);

export const MicrophoneIcon = ({ className = "w-8 h-8 text-current", strokeWidth = "1.5" }) => (
  <svg className={`transition-all duration-300 ease-in-out ${className}`} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
    {/* More detailed mic with soundwaves for primary voice actions */}
    <path d="M12 2a3 3 0 00-3 3v7a3 3 0 006 0V5a3 3 0 00-3-3z" />
    <path d="M19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8" />
  </svg>
);

export const CartIcon = ({ className = "w-5 h-5 text-current", strokeWidth = "1.5" }) => (
  <svg className={`transition-all duration-300 ease-in-out ${className}`} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
    {/* Modern Premium Shopping Bag instead of a clunky cart */}
    <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
  </svg>
);

export const ShoppingCartIcon = ({ className = "w-6 h-6 text-current", strokeWidth = "1.5" }) => (
  <svg className={`transition-all duration-300 ease-in-out ${className}`} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
    {/* Crisp traditional cart with perfect circles */}
    <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 3h11.5" />
    <circle cx="9" cy="20" r="1" fill="currentColor" />
    <circle cx="16" cy="20" r="1" fill="currentColor" />
  </svg>
);

export const GoogleIcon = ({ className = "w-6 h-6 drop-shadow-sm" }) => (
  <svg className={`transition-transform duration-300 ease-in-out ${className}`} viewBox="0 0 24 24" aria-hidden="true">
    {/* Authentic Google Brand Colors & Paths */}
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

export const CheckCircleIcon = ({ className = "w-5 h-5 text-current", strokeWidth = "1.5" }) => (
  <svg className={`transition-all duration-300 ease-in-out ${className}`} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
    <path d="M22 4L12 14.01l-3-3" />
  </svg>
);

export const UserIcon = ({ className = "w-6 h-6 text-current", strokeWidth = "1.5" }) => (
  <svg className={`transition-all duration-300 ease-in-out ${className}`} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
    {/* Corrected User Silhouette (Replaced broken abstract shapes) */}
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export const TrashIcon = ({ className = "w-5 h-5 text-current", strokeWidth = "1.5" }) => (
  <svg className={`transition-all duration-300 ease-in-out ${className}`} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
    {/* Clean, minimalist trash bin */}
    <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
    <path d="M10 11v6M14 11v6" />
  </svg>
);

export const PlusCircleIcon = ({ className = "w-5 h-5 text-current", strokeWidth = "1.5" }) => (
  <svg className={`transition-all duration-300 ease-in-out ${className}`} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 8v8M8 12h8" />
  </svg>
);

export const MinusCircleIcon = ({ className = "w-5 h-5 text-current", strokeWidth = "1.5" }) => (
  <svg className={`transition-all duration-300 ease-in-out ${className}`} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <path d="M8 12h8" />
  </svg>
);

export const DollarIcon = ({ className = "w-5 h-5 text-current", strokeWidth = "1.5" }) => (
  <svg className={`transition-all duration-300 ease-in-out ${className}`} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
    {/* Corrected Dollar Sign (Replaced the previous circle path) */}
    <path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
  </svg>
);

export default {
  LogoIcon,
  CartIcon,
  GoogleIcon,
  MicrophoneIcon,
  ShoppingCartIcon,
  CheckCircleIcon,
  UserIcon,
  TrashIcon,
  PlusCircleIcon,
  MinusCircleIcon,
  DollarIcon,
};