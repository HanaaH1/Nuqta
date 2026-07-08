import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Flame } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export default function PointsCard({ points, streak, goal, pointPopup }) {
  const progressPercent = Math.min(points / goal * 100, 100);

  return (
    <div className="mx-6 mt-4">
      <div className="relative bg-gradient-to-br from-primary/10 via-accent to-primary/5 rounded-2xl p-6 border border-primary/10 overflow-hidden">
        {/* Decorative pattern */}
        <div className="absolute top-0 right-0 w-32 h-32 opacity-[0.03]">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
            <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
            <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
          </svg>
        </div>

        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Your barakah bank

            </p>
            <div className="flex items-baseline gap-1 mt-1 relative">
              <span className="text-4xl font-bold text-foreground tabular-nums">
                {points.toLocaleString()}
              </span>
              <span className="text-sm font-medium text-muted-foreground">BP</span>
              <AnimatePresence>
                {pointPopup &&
                <motion.span
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: 1, y: -20 }}
                  exit={{ opacity: 0, y: -40 }}
                  className="absolute -right-12 top-0 text-primary font-bold text-sm">
                  
                    +{pointPopup}
                  </motion.span>
                }
              </AnimatePresence>
            </div>
          </div>
          <div className="flex items-center gap-1.5 bg-background/60 backdrop-blur-sm rounded-full px-3 py-1.5">
            <Flame className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-semibold text-foreground">{streak}</span>
            <span className="text-xs text-muted-foreground">days</span>
          </div>
        </div>

        <div className="mt-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">
              Goal: {goal.toLocaleString()} BP
            </span>
            <span className="text-xs font-medium text-primary">
              {Math.round(progressPercent)}%
            </span>
          </div>
          <Progress value={progressPercent} className="h-2 bg-background/50" />
        </div>

        <div className="flex items-center gap-1 mt-3">
          <Sparkles className="w-3 h-3 text-primary/60" />
          <span className="text-[10px] text-muted-foreground">
            {goal - points > 0 ? `${(goal - points).toLocaleString()} BP to reach your goal` : 'Goal reached! MashAllah!'}
          </span>
        </div>
      </div>
    </div>);

}