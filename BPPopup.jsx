import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function BPPopup({ message, visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-primary text-primary-foreground px-5 py-3 rounded-2xl shadow-xl shadow-primary/30 flex items-center gap-2 text-sm font-semibold whitespace-nowrap"
        >
          <span>✨</span>
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}