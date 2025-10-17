import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user, signIn, signOut } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

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

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 p-2.5 rounded-xl">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  VoiceCart
                </span>
                <p className="text-xs text-gray-500 font-medium -mt-1">Voice-Powered Shopping</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              <NavLink to="/" active={isActive("/")}>Home</NavLink>
              <NavLink to="/products" active={isActive("/products")}>Products</NavLink>
              <NavLink to="/about" active={isActive("/about")}>About</NavLink>
              <NavLink to="/contact" active={isActive("/contact")}>Contact</NavLink>
              <NavLink to="/cart" active={isActive("/cart")}>
                <svg className="w-5 h-5 inline-block mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Cart
              </NavLink>
            </div>

            {/* Auth Button */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-3">
                  <img
                    src={user.photoURL || "https://via.placeholder.com/40"}
                    alt={user.displayName}
                    className="w-10 h-10 rounded-full border-2 border-purple-500"
                  />
                  <div className="text-sm">
                    <p className="font-semibold text-gray-800">{user.displayName}</p>
                    <button
                      onClick={handleAuth}
                      className="text-xs text-purple-600 hover:text-purple-700 font-medium"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={handleAuth}
                  className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full hover:shadow-lg hover:scale-105 transition-all duration-200"
                >
                  Sign In
                </button>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-100 bg-white"
            >
              <div className="px-4 py-4 space-y-2">
                <MobileNavLink to="/" onClick={() => setIsOpen(false)}>Home</MobileNavLink>
                <MobileNavLink to="/products" onClick={() => setIsOpen(false)}>Products</MobileNavLink>
                <MobileNavLink to="/about" onClick={() => setIsOpen(false)}>About</MobileNavLink>
                <MobileNavLink to="/contact" onClick={() => setIsOpen(false)}>Contact</MobileNavLink>
                <MobileNavLink to="/cart" onClick={() => setIsOpen(false)}>Cart</MobileNavLink>
                
                <div className="pt-4 border-t border-gray-100">
                  {user ? (
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <img
                        src={user.photoURL || "https://via.placeholder.com/40"}
                        alt={user.displayName}
                        className="w-10 h-10 rounded-full border-2 border-purple-500"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800 text-sm">{user.displayName}</p>
                        <button
                          onClick={() => {
                            handleAuth();
                            setIsOpen(false);
                          }}
                          className="text-xs text-purple-600 hover:text-purple-700 font-medium"
                        >
                          Sign Out
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        handleAuth();
                        setIsOpen(false);
                      }}
                      className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full hover:shadow-lg transition-all"
                    >
                      Sign In
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Auth Modal */}
      <AnimatePresence>
        {showAuthModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-3xl shadow-2xl max-w-md w-full mx-4 p-8 relative"
            >
              <button
                onClick={() => setShowAuthModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold"
              >
                ×
              </button>
              
              <div className="text-center">
                <div className="mb-6">
                  <div className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-2xl mb-4">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome to VoiceCart</h2>
                  <p className="text-gray-600">Sign in to start your voice-powered shopping experience</p>
                </div>

                <button
                  onClick={handleGoogleSignIn}
                  className="w-full flex items-center justify-center space-x-3 px-6 py-4 bg-white border-2 border-gray-200 rounded-full hover:border-purple-500 hover:shadow-lg transition-all duration-200 group"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="font-semibold text-gray-700 group-hover:text-purple-600">Continue with Google</span>
                </button>

                <p className="text-xs text-gray-500 mt-6">
                  By signing in, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

const NavLink = ({ to, children, active }) => (
  <Link
    to={to}
    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
      active
        ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md"
        : "text-gray-700 hover:bg-gray-100"
    }`}
  >
    {children}
  </Link>
);

const MobileNavLink = ({ to, children, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="block px-4 py-3 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition-colors"
  >
    {children}
  </Link>
);

export default Navbar;
