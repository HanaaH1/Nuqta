import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const GOAL = 100;

export default function DhikrCounter({ onEarn }) {
  const [count, setCount] = useState(0);
  const [earned, setEarned] = useState(false);

  const handleAdd = () => {
    if (earned) return;
    const next = count + 1;
    setCount(next);
    if (next >= GOAL) {
      setEarned(true);
      onEarn(20, '🤲 +20 BP — Dhikr Complete!');
    }
  };

  const progress = Math.min((count / GOAL) * 100, 100);

  return (
    <div className="mx-6 mt-6">
      <div className="flex items-center gap-2 mb-3">
        <Heart className="w-4 h-4 text-primary" />
        <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">Dhikr Counter</h2>
      </div>
      <div className="bg-card rounded-2xl border border-border p-5 flex items-center gap-5">
        {/* Progress ring */}
        <div className="relative w-20 h-20 shrink-0">
          <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
            <circle cx="40" cy="40" r="32" fill="none" stroke="hsl(var(--muted))" strokeWidth="6" />
            <circle
              cx="40" cy="40" r="32"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="6"
              strokeDasharray={`${2 * Math.PI * 32}`}
              strokeDashoffset={`${2 * Math.PI * 32 * (1 - progress / 100)}`}
              strokeLinecap="round"
              className="transition-all duration-300"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-lg font-bold text-foreground tabular-nums">{count}</span>
            <span className="text-[9px] text-muted-foreground">/ {GOAL}</span>
          </div>
        </div>

        <div className="flex-1">
          {earned ? (
            <p className="text-sm font-semibold text-primary">MashAllah! 🤲<br /><span className="text-xs text-muted-foreground font-normal">+20 BP earned</span></p>
          ) : (
            <p className="text-xs text-muted-foreground mb-3">{GOAL - count} dhikr remaining</p>
          )}
          <motion.button
            whileTap={{ scale: 0.93 }}
            onClick={handleAdd}
            disabled={earned}
            className={cn(
              'w-full py-2.5 rounded-xl text-sm font-semibold transition-all',
              earned
                ? 'bg-primary/10 text-primary cursor-default'
                : 'bg-primary text-primary-foreground active:bg-primary/90'
            )}
          >
            {earned ? 'Completed ✓' : '+ Add Dhikr'}
          </motion.button>
        </div>
      </div>
    </div>
  );
}