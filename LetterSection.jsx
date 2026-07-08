import React, { useState } from 'react';
import { Heart, Send, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const CATEGORIES = ['School', 'Health', 'Prayer', 'Quran', 'Confidence', 'Mental Health'];

export default function LetterSection({ onEarn }) {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState('');
  const [letter, setLetter] = useState('');
  const [sent, setSent] = useState(false);

  const canSend = category && letter.trim().length > 0;

  const handleSend = () => {
    if (!canSend || sent) return;
    setSent(true);
    onEarn(30, '💌 +30 BP — Letter of Support Sent');
    setTimeout(() => {
      setLetter('');
      setCategory('');
      setSent(false);
      setOpen(false);
    }, 2500);
  };

  return (
    <div className="mx-6 mt-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between bg-card border border-border rounded-2xl px-5 py-4 text-left transition-all hover:border-primary/30"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
            <Heart className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Write a Letter to Someone Struggling</p>
            <p className="text-[10px] text-muted-foreground">+30 BP · Choose a category of struggle</p>
          </div>
        </div>
        <ChevronDown className={cn('w-4 h-4 text-muted-foreground transition-transform', open && 'rotate-180')} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-card border border-t-0 border-border rounded-b-2xl p-5 space-y-4">
              {/* Category select */}
              <div>
                <p className="text-xs font-semibold text-foreground mb-2 uppercase tracking-wider">Category of Struggle</p>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={cn(
                        'px-3 py-1.5 rounded-full text-xs font-medium transition-all border',
                        category === cat
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-secondary text-secondary-foreground border-border hover:border-primary/30'
                      )}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Letter input */}
              <div>
                <p className="text-xs font-semibold text-foreground mb-2 uppercase tracking-wider">Your Letter</p>
                <textarea
                  value={letter}
                  onChange={e => !sent && setLetter(e.target.value)}
                  placeholder="Write words of support, encouragement, or advice…"
                  rows={5}
                  className="w-full resize-none bg-secondary rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none leading-relaxed"
                />
              </div>

              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={handleSend}
                disabled={!canSend || sent}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold disabled:opacity-40 transition-all"
              >
                {sent ? 'Letter Sent ✓' : <><Send className="w-4 h-4" /> Send Letter (+30 BP)</>}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}