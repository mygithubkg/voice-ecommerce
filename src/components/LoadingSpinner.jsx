import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ size = 'md', color = 'var(--brand-primary)' }) => {
  const sizeMap = {
    sm: 24,
    md: 40,
    lg: 64,
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  return (
    <div className="flex items-center justify-center w-full h-full p-4">
      <motion.div
        style={{
          width: currentSize,
          height: currentSize,
          border: `3px solid ${color}40`,
          borderTop: `3px solid ${color}`,
          borderRadius: '50%',
        }}
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 1
        }}
      />
    </div>
  );
};

export default LoadingSpinner;
