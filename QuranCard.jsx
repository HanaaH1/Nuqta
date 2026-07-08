import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

const AYAH = {
  arabic: 'إِنَّ مَعَ الْعُسْرِ يُسْرًا',
  translation: '"Indeed, with hardship comes ease."',
  ref: 'Surah Ash-Sharh 94:6',
};

export default function QuranCard({ onEarn }) {
  const [read, setRead] = useState(false);

  const handleRead = () => {
    if (read) return;
    setRead(true);
    onEarn(2, '📖 +2 BP — Ayah Read');
  };

  return (
    <div className="mx-6 mt-6">
      <div className="flex items-center gap-2 mb-3">
        <BookOpen className="w-4 h-4 text-primary" />
        <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">Ayah of the Day</h2>
      </div>
      <div className="bg-gradient-to-br from-accent to-primary/5 rounded-2xl border border-primary/10 p-5">
        <p className="text-2xl font-arabic text-right text-foreground leading-relaxed">
          {AYAH.arabic}
        </p>
        <p className="text-sm text-foreground/80 mt-3 italic leading-relaxed">
          {AYAH.translation}
        </p>
        <p className="text-[10px] text-muted-foreground mt-1">{AYAH.ref}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-[10px] text-muted-foreground">+2 BP on read</span>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleRead}
            disabled={read}
            className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold disabled:opacity-50 transition-opacity"
          >
            {read ? 'Read ✓' : 'Mark as Read'}
          </motion.button>
        </div>
      </div>
    </div>
  );
}