import React, { useState } from 'react';
import { PenLine, Send } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DiaryCard({ onEarn }) {
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!text.trim()) return;
    setSubmitted(true);
    onEarn(20, '✨ +20 Barakah Points Added');
    setTimeout(() => {
      setText('');
      setSubmitted(false);
    }, 2000);
  };

  return (
    <div className="mx-6 mt-6">
      <div className="flex items-center gap-2 mb-3">
        
        <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">Diary to Allah</h2>
      </div>
      <div className="bg-card rounded-2xl border border-border p-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your thoughts, duas, or reflections…"
          rows={4}
          className="w-full resize-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 outline-none leading-relaxed" />
        
        <div className="border-t border-border mt-3 pt-3 flex items-center justify-between">
          <span className="text-[10px] text-muted-foreground">+20 BP on submit</span>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
            disabled={!text.trim() || submitted}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold disabled:opacity-40 transition-opacity">
            
            <Send className="w-3.5 h-3.5" />
            {submitted ? 'Submitted ✓' : 'Submit Entry'}
          </motion.button>
        </div>
      </div>
    </div>);

}