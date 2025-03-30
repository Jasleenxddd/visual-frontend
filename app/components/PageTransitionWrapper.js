'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function PageTransitionWrapper({ children }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ 
          opacity: 1
        }}
        animate={{ 
          opacity: 1
        }}
        exit={{ 
          opacity: 0
        }}
        transition={{ 
          duration: 0.3,
          ease: "easeInOut"
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}