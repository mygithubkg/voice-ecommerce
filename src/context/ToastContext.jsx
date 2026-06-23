import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info', duration = 3000) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type, duration }]);

    setTimeout(() => {
      removeToast(id);
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-3 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

const ToastItem = ({ toast, onRemove }) => {
  const { id, message, type, duration } = toast;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-[#22C55E]" />,
    error: <AlertCircle className="w-5 h-5 text-[#FF4D6D]" />,
    info: <Info className="w-5 h-5 text-[#6C63FF]" />
  };

  const borders = {
    success: 'border-l-[#22C55E]',
    error: 'border-l-[#FF4D6D]',
    info: 'border-l-[#6C63FF]'
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 100, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      className={`pointer-events-auto bg-[#18181F] border border-[rgba(255,255,255,0.1)] border-l-4 ${borders[type]} rounded-lg shadow-2xl p-4 pr-12 w-[320px] relative overflow-hidden`}
    >
      <div className="flex items-start gap-3">
        {icons[type]}
        <p className="text-[15px] text-[#F4F4F8] leading-tight mt-[2px]">{message}</p>
      </div>
      <button
        onClick={() => onRemove(id)}
        className="absolute top-4 right-3 text-[#9898A8] hover:text-white transition-colors"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Progress bar drain */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] bg-white opacity-20"
        initial={{ width: "100%" }}
        animate={{ width: "0%" }}
        transition={{ duration: duration / 1000, ease: "linear" }}
      />
    </motion.div>
  );
};
