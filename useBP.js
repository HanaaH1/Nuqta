// Shared Barakah Points state using localStorage for cross-page sync
import { useState, useEffect } from 'react';

const KEY = 'nuqta_bp';
const DEFAULT = 1250;

export function useBP() {
  const [points, setPointsState] = useState(() => {
    const stored = localStorage.getItem(KEY);
    return stored ? parseInt(stored, 10) : DEFAULT;
  });

  const addPoints = (amount) => {
    setPointsState(prev => {
      const next = prev + amount;
      localStorage.setItem(KEY, String(next));
      return next;
    });
  };

  return { points, addPoints };
}