import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"; // Removed useScroll and useMotionValueEvent
import { ShoppingBag, Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState(null);

  const location = useLocation();
  const { user, signIn, signOut } = useAuth();
  const { items } = useCart();

  const cartCount = items ? items.reduce((total, item) => total + item.quantity, 0) : 0;

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleAuth = async () => {
    if (user) {
      await signOut();
    } else {
      await signIn();
    }
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[100] flex justify-center px-4 pt-6 pointer-events-none">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          /* REMOVED THE DYNAMIC SCROLL CLASSES - IT IS NOW PERMANENTLY FROSTED */
          className="w-full max-w-[1000px] pointer-events-auto flex items-center justify-between bg-[#0A0A0F]/70 backdrop-blur-xl border border-white/10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] rounded-full px-6 py-3"
        >
          {/* 1. Logo (Editorial Style with breathing AI dot) */}
          <Link to="/" className="flex items-center gap-1.5 group z-10">
            <span className="font-serif font-medium text-2xl tracking-tight text-white">
              aura
            </span>
            <motion.div
              animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-1.5 h-1.5 rounded-full bg-[#00D4AA] mb-1" // Neon Teal dot
            />
          </Link>

          {/* 2. Desktop Links (With Sliding Magnetic Highlight) */}
          <div className="hidden md:flex items-center gap-2 relative z-0" onMouseLeave={() => setHoveredPath(null)}>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || (item.path === "/" && location.pathname === "/home");
              const isHovered = hoveredPath === item.path;

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onMouseEnter={() => setHoveredPath(item.path)}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${isActive ? "text-white" : "text-white/60 hover:text-white"
                    }`}
                >
                  <span className="relative z-10">{item.name}</span>

                  {/* The Sliding Hover/Active Background */}
                  {isHovered && (
                    <motion.div
                      layoutId="nav-hover"
                      className="absolute inset-0 bg-white/10 rounded-full -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  {isActive && !isHovered && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-x-4 -bottom-1 h-[2px] bg-[#6C63FF] rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* 3. Actions (Cart & Auth) */}
          <div className="flex items-center gap-3 z-10">
            {/* Minimalist Cart */}
            <Link
              to="/cart"
              className="relative p-2 text-white/60 hover:text-white transition-colors group"
            >
              <ShoppingBag className="w-[22px] h-[22px] stroke-[1.5]" />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#00D4AA] border-2 border-[#0A0A0F] rounded-full group-hover:border-[#1A1A1A] transition-colors"
                />
              )}
            </Link>

            <div className="hidden md:block w-[1px] h-4 bg-white/20 mx-2"></div>

            {/* Profile / Auth */}
            <div className="hidden md:block">
              {user ? (
                <Link to="/profile" className="flex items-center gap-2 group">
                  <div className="p-0.5 rounded-full border border-white/20 group-hover:border-[#6C63FF] transition-colors">
                    <img src={user.photoURL || "https://i.pravatar.cc/150"} alt="User" className="w-8 h-8 rounded-full object-cover" />
                  </div>
                </Link>
              ) : (
                <button
                  onClick={handleAuth}
                  className="text-sm font-medium text-white px-5 py-2.5 rounded-full bg-white/10 border border-white/10 hover:bg-white/20 hover:-translate-y-0.5 transition-all duration-300"
                >
                  Sign In
                </button>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-white/60 hover:text-white transition-colors"
            >
              <Menu className="w-6 h-6 stroke-[1.5]" />
            </button>
          </div>
        </motion.nav>
      </header>

      {/* 4. Mobile Drawer (Editorial & Airy but Dark) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(24px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[110] bg-[#0A0A0F]/90 flex flex-col"
          >
            {/* Drawer Header */}
            <div className="flex justify-end p-8">
              <button
                onClick={toggleMobileMenu}
                className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center border border-white/10 text-white hover:scale-105 transition-transform"
              >
                <X className="w-6 h-6 stroke-[1.5]" />
              </button>
            </div>

            {/* Drawer Links */}
            <div className="flex flex-col px-10 flex-1 justify-center gap-6">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ x: -40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    to={item.path}
                    onClick={toggleMobileMenu}
                    className="text-5xl font-serif text-white hover:text-[#00D4AA] transition-colors inline-block"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: navItems.length * 0.1 + 0.2 }}
                className="w-full h-px bg-white/10 my-6"
              />

              {/* Drawer Auth/Profile */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: navItems.length * 0.1 + 0.3 }}
              >
                {user ? (
                  <div className="flex items-center justify-between">
                    <Link to="/profile" onClick={toggleMobileMenu} className="flex items-center gap-4">
                      <img src={user.photoURL || "https://i.pravatar.cc/150"} alt="User" className="w-12 h-12 rounded-full border border-white/20 object-cover" />
                      <div>
                        <p className="text-sm text-white/50">Logged in as</p>
                        <span className="text-lg font-medium text-white">{user.displayName}</span>
                      </div>
                    </Link>
                    <button onClick={() => { handleAuth(); toggleMobileMenu(); }} className="text-sm font-medium text-white/50 hover:text-red-400 transition-colors">
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => { handleAuth(); toggleMobileMenu(); }}
                    className="w-full py-4 bg-[#6C63FF] text-white font-medium text-lg rounded-full shadow-[0_0_20px_rgba(108,99,255,0.3)] hover:shadow-[0_0_30px_rgba(108,99,255,0.5)] transition-all"
                  >
                    Sign In to Account
                  </button>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;