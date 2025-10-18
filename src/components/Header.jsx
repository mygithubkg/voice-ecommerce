import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// --- Mock Cart Hook ---
// In a real application, this would be imported from a shared context file.
// To make this component standalone, we are mocking it here.
const useCart = () => {
  return { items: [{ quantity: 2 }, { quantity: 1 }] };
};

// --- Animation Variants ---

// Variant for the main header to slide in
const headerVariants = {
  hidden: { y: -100, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 120, damping: 20, delay: 0.2 }
  },
};

// Variant for staggering child elements on desktop
const desktopNavVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.4 },
  },
};

// Variant for individual navigation items fading in
const navItemVariants = {
  hidden: { y: -20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
};

// Variants for the mobile menu container
const mobileMenuVariants = {
    open: {
        clipPath: `circle(1200px at 90% -10%)`,
        transition: { type: "spring", stiffness: 20, restDelta: 2 }
    },
    closed: {
        clipPath: "circle(24px at 90% -10%)",
        transition: { delay: 0.2, type: "spring", stiffness: 400, damping: 40 }
    }
};

// --- Helper Components ---

// Helper component for animated navigation links
const NavItem = ({ to, children, onClick }) => (
  <motion.div variants={navItemVariants} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `block md:inline-block px-4 py-2 rounded-md text-base font-medium transition-colors duration-300 ${
          isActive
            ? "text-blue-600 bg-blue-100"
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        }`
      }
    >
      {children}
    </NavLink>
  </motion.div>
);

// Animated Hamburger/Close button for mobile
const MenuToggle = ({ toggle }) => (
    <button onClick={toggle} className="relative z-50 md:hidden w-8 h-8 focus:outline-none">
        <svg width="24" height="24" viewBox="0 0 24 24" className="text-slate-800">
            <motion.path
                stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                variants={{
                    closed: { d: "M 2 5 L 22 5" },
                    open: { d: "M 4 18 L 20 2" }
                }}
            />
            <motion.path
                stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                d="M 2 12 L 22 12"
                variants={{ closed: { opacity: 1 }, open: { opacity: 0 } }}
                transition={{ duration: 0.1 }}
            />
            <motion.path
                stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                variants={{
                    closed: { d: "M 2 19 L 22 19" },
                    open: { d: "M 4 2 L 20 18" }
                }}
            />
        </svg>
    </button>
);


// --- Main Header Component ---

const ModernHeader = ({ onVoiceClick }) => {
  const { items } = useCart();
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <motion.header
      variants={headerVariants}
      initial="hidden"
      animate="visible"
      className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8 py-3">
        {/* Logo and Branding */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link to="/" className="flex items-center gap-2 text-slate-900 group">
            <motion.img
              src="https://placehold.co/32x32/3b82f6/FFFFFF?text=VC&font=sans"
              alt="VoiceCart Logo"
              className="w-8 h-8 rounded-full"
              whileHover={{ rotate: 15 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            />
            <span className="font-bold text-xl tracking-tight">VoiceCart</span>
          </Link>
        </motion.div>

        {/* Desktop Navigation & Actions */}
        <motion.div
            variants={desktopNavVariants}
            initial="hidden"
            animate="visible"
            className="hidden md:flex items-center gap-4"
        >
          <NavItem to="/">Home</NavItem>
          <NavItem to="/products">Products</NavItem>
          <div className="h-6 w-px bg-slate-200 mx-2"></div>
          {/* Action Buttons */}
          <motion.button
            variants={navItemVariants}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={onVoiceClick}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium transition-colors"
            title="Use Voice Command"
          >
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5a6 6 0 00-12 0v1.5a6 6 0 006 6z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75V18.75" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 9a2.25 2.25 0 012.25 2.25v.75" /><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 12a2.25 2.25 0 002.25-2.25V9" /></svg>
          </motion.button>
          <motion.div variants={navItemVariants} className="relative">
             <Link to="/cart" className="relative block text-slate-600 hover:text-slate-900" title={`Cart with ${cartCount} items`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3.75 3.75 0 0011.25 0M3.375 5.25h17.25c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125H3.375c-.621 0-1.125-.504-1.125-1.125v-1.5c0-.621.504-1.125 1.125-1.125z" /></svg>
                <AnimatePresence>
                  {cartCount > 0 && <motion.span key={cartCount} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center bg-blue-600 text-white text-[10px] font-bold rounded-full">{cartCount}</motion.span>}
                </AnimatePresence>
              </Link>
          </motion.div>
        </motion.div>
        
        {/* Mobile Menu Toggle */}
        <motion.div className="md:hidden" initial={false} animate={isMenuOpen ? "open" : "closed"}>
            <MenuToggle toggle={toggleMenu} />
        </motion.div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className="absolute top-0 right-0 bottom-0 w-full bg-slate-50 md:hidden"
        style={{ pointerEvents: isMenuOpen ? 'auto' : 'none', height: '100vh' }}
        variants={mobileMenuVariants}
        initial={false}
        animate={isMenuOpen ? "open" : "closed"}
      >
        <motion.div 
            className="flex flex-col items-center justify-center h-full gap-6"
            variants={{
                open: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
                closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
            }}
        >
            <NavItem to="/" onClick={toggleMenu}>Home</NavItem>
            <NavItem to="/products" onClick={toggleMenu}>Products</NavItem>
            <div className="w-24 h-px bg-slate-300 my-2"></div>
            <NavItem to="/cart" onClick={toggleMenu}>Cart ({cartCount})</NavItem>
            <motion.button onClick={() => { onVoiceClick(); toggleMenu(); }} className="flex items-center gap-2 text-slate-600 font-medium py-2 px-4 rounded-md hover:bg-slate-200">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5a6 6 0 00-12 0v1.5a6 6 0 006 6z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75V18.75" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 9a2.25 2.25 0 012.25 2.25v.75" /><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 12a2.25 2.25 0 002.25-2.25V9" /></svg>
                Voice Command
            </motion.button>
        </motion.div>
      </motion.div>
    </motion.header>
  );
};

export default ModernHeader;

