import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { LogoIcon, CartIcon, GoogleIcon } from "./Icons";

// --- Main Navbar Component ---
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user, signIn, signOut } = useAuth();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleAuth = async () => {
    if (user) {
      await signOut();
    } else {
      setShowAuthModal(true);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signIn();
      setShowAuthModal(false);
    } catch (error) {
      console.error("Authentication error:", error);
    }
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg shadow-sm border-b border-gray-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 min-h-[80px]">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                <div className="relative bg-gradient-to-r from-violet-600 to-purple-600 p-2.5 rounded-xl shadow-lg">
                  <LogoIcon />
                </div>
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                  VoiceCart
                </span>
                <p className="text-xs text-gray-500 font-medium -mt-1">Voice-Powered Shopping</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/products">Products</NavLink>
              <NavLink to="/about">About</NavLink>
              <NavLink to="/contact">Contact</NavLink>
            </div>

            {/* Auth Button & Cart */}
            <div className="hidden md:flex items-center space-x-4">
               <Link to="/cart" className="p-2.5 rounded-full text-gray-600 hover:bg-gray-100 hover:text-violet-600 transition-colors">
                  <CartIcon/>
               </Link>
               <div className="w-px h-6 bg-gray-200"></div>
               {user ? <UserMenu user={user} onSignOut={handleAuth} /> : <SignInButton onClick={handleAuth} />}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors z-50"
            >
              <div className="w-6 h-6 flex flex-col justify-around">
                <motion.span 
                    animate={{ rotate: isMobileMenuOpen ? 45 : 0, y: isMobileMenuOpen ? 8 : 0 }}
                    className="w-full h-0.5 bg-gray-800"
                ></motion.span>
                <motion.span 
                    animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                    className="w-full h-0.5 bg-gray-800"
                ></motion.span>
                <motion.span 
                    animate={{ rotate: isMobileMenuOpen ? -45 : 0, y: isMobileMenuOpen ? -8 : 0 }}
                    className="w-full h-0.5 bg-gray-800"
                ></motion.span>
              </div>
            </button>
          </div>
        </div>
      </motion.nav>
      
      <MobileMenu isOpen={isMobileMenuOpen} toggleMenu={toggleMobileMenu} user={user} onAuthClick={handleAuth} />
      <AuthModal show={showAuthModal} onClose={() => setShowAuthModal(false)} onGoogleSignIn={handleGoogleSignIn} />
    </>
  );
};

// --- Sub-components for better structure ---

const NavLink = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link to={to} className="px-4 py-2 relative rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition-colors duration-300">
      {children}
      {isActive && (
        <motion.div
          layoutId="underline"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-violet-600"
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        />
      )}
    </Link>
  );
};

const SignInButton = ({ onClick }) => (
    <motion.button
        onClick={onClick}
        className="px-6 py-2.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold rounded-full shadow-lg shadow-violet-500/20"
        whileHover={{ scale: 1.05, y: -2, boxShadow: "0px 10px 20px rgba(139, 92, 246, 0.3)" }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
    >
        Sign In
    </motion.button>
);

const UserMenu = ({ user, onSignOut }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuRef]);

    return (
        <div className="relative" ref={menuRef}>
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => setIsOpen(!isOpen)} className="flex items-center">
                <img
                    src={user.photoURL || "https://i.pravatar.cc/150"}
                    alt={user.displayName}
                    className="w-10 h-10 rounded-full border-2 border-violet-500 object-cover"
                />
            </motion.button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95, transition: { duration: 0.15 } }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        className="absolute top-14 right-0 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 p-2 origin-top-right z-50"
                    >
                       <div className="p-2 border-b border-gray-100">
                         <p className="font-semibold text-sm text-gray-800 truncate">{user.displayName}</p>
                       </div>
                       <Link to="/profile" onClick={() => setIsOpen(false)} className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-violet-600 rounded-md transition-colors">Profile</Link>
                       <Link to="/settings" onClick={() => setIsOpen(false)} className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-violet-600 rounded-md transition-colors">Settings</Link>
                       <button
                           onClick={() => { onSignOut(); setIsOpen(false); }}
                           className="block w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-md transition-colors"
                       >
                           Sign Out
                       </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const MobileMenu = ({ isOpen, toggleMenu, user, onAuthClick }) => {
    const menuVariants = {
        hidden: { x: "100%", transition: { type: "tween", ease: "easeIn" } },
        visible: { x: 0, transition: { type: "tween", ease: "easeOut" } },
    };

    const linkContainerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        },
    };

    const linkVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    variants={menuVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="fixed inset-0 bg-white z-40 md:hidden"
                >
                    <motion.div 
                        variants={linkContainerVariants}
                        className="flex flex-col h-full pt-28 px-8"
                    >
                         <motion.div variants={linkVariants}><MobileNavLink to="/" onClick={toggleMenu}>Home</MobileNavLink></motion.div>
                         <motion.div variants={linkVariants}><MobileNavLink to="/products" onClick={toggleMenu}>Products</MobileNavLink></motion.div>
                         <motion.div variants={linkVariants}><MobileNavLink to="/about" onClick={toggleMenu}>About</MobileNavLink></motion.div>
                         <motion.div variants={linkVariants}><MobileNavLink to="/contact" onClick={toggleMenu}>Contact</MobileNavLink></motion.div>
                         <motion.div variants={linkVariants}><MobileNavLink to="/cart" onClick={toggleMenu}>Cart</MobileNavLink></motion.div>
                         
                         <motion.div variants={linkVariants} className="mt-auto pb-8">
                             {user ? (
                                 <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                     <img src={user.photoURL} alt={user.displayName} className="w-12 h-12 rounded-full border-2 border-violet-500"/>
                                     <div className="flex-1">
                                         <p className="font-semibold text-gray-800">{user.displayName}</p>
                                         <button onClick={() => { onAuthClick(); toggleMenu(); }} className="text-sm text-red-500 hover:underline font-medium">
                                             Sign Out
                                         </button>
                                     </div>
                                 </div>
                             ) : (
                                <button
                                    onClick={() => { onAuthClick(); toggleMenu(); }}
                                    className="w-full py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold rounded-full shadow-lg shadow-violet-500/30"
                                >
                                    Sign In
                                </button>
                             )}
                         </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const MobileNavLink = ({ to, children, onClick }) => (
  <Link to={to} onClick={onClick} className="block py-4 text-3xl font-bold text-gray-800 hover:text-violet-600 transition-colors">
    {children}
  </Link>
);

const AuthModal = ({ show, onClose, onGoogleSignIn }) => (
    <AnimatePresence>
        {show && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 30, scale: 0.95, transition: { duration: 0.2 } }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative border border-gray-100"
                >
                    <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 text-2xl font-bold transition-colors">&times;</button>
                    
                    <div className="text-center">
                        <div className="mb-6">
                            <div className="inline-block bg-gradient-to-r from-violet-600 to-purple-600 p-4 rounded-2xl mb-4 shadow-lg shadow-violet-500/30">
                               <LogoIcon />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to VoiceCart</h2>
                            <p className="text-gray-500">Sign in to start your voice-powered shopping experience.</p>
                        </div>

                        <motion.button
                            onClick={onGoogleSignIn}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full flex items-center justify-center space-x-3 px-6 py-4 bg-white border-2 border-gray-200 rounded-full hover:border-violet-500 hover:shadow-lg hover:shadow-violet-500/20 transition-all duration-200 group"
                        >
                            <GoogleIcon />
                            <span className="font-semibold text-gray-700 group-hover:text-violet-600 transition-colors">Continue with Google</span>
                        </motion.button>

                        <p className="text-xs text-gray-400 mt-6">
                            By signing in, you agree to our <a href="#" className="underline hover:text-gray-600">Terms of Service</a>.
                        </p>
                    </div>
                </motion.div>
            </div>
        )}
    </AnimatePresence>
);

export default Navbar;
