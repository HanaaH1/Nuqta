import React, { useState } from 'react';
import { PenLine, CalendarDays, CheckCircle2, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import BPPopup from '../components/shared/BPPopup';

const PLANNER_SLOTS = [
  { label: 'Fajr', placeholder: 'e.g. Wake up at 5:30am, pray Fajr' },
  { label: 'Morning', placeholder: 'e.g. Read Quran, exercise' },
  { label: 'Afternoon', placeholder: 'e.g. Study, work on project' },
  { label: 'Evening', placeholder: 'e.g. Family time, dhikr' },
  { label: 'Night', placeholder: 'e.g. Reflect, sleep by 11pm' },
];

export default function Growth() {
  const [activeTab, setActiveTab] = useState('diary');
  const [diaryText, setDiaryText] = useState('');
  const [diarySubmitted, setDiarySubmitted] = useState(false);
  const [diaryBP, setDiaryBP] = useState(0);
  const [planner, setPlanner] = useState(() => Object.fromEntries(PLANNER_SLOTS.map(s => [s.label, ''])));
  const [plannerSubmitted, setPlannerSubmitted] = useState(false);
  const [plannerBP, setPlannerBP] = useState(0);
  const [popup, setPopup] = useState({ visible: false, message: '' });

  const wordCount = diaryText.trim().split(/\s+/).filter(Boolean).length;

  const showPopup = (msg) => {
    setPopup({ visible: true, message: msg });
    setTimeout(() => setPopup({ visible: false, message: '' }), 2200);
  };

  const submitDiary = () => {
    if (wordCount < 50 || diarySubmitted) return;
    setDiarySubmitted(true);
    setDiaryBP(prev => prev + 20);
    showPopup('✨ +20 Barakah Points — Diary Submitted');
  };

  const submitPlanner = () => {
    if (plannerSubmitted) return;
    const filled = PLANNER_SLOTS.some(s => planner[s.label].trim());
    if (!filled) return;
    setPlannerSubmitted(true);
    setPlannerBP(prev => prev + 10);
    showPopup('📅 +10 Barakah Points — Planner Filled');
  };

  return (
    <div className="pt-12 pb-6 min-h-screen">
      <div className="px-6">
        <h1 className="text-2xl font-bold text-foreground">Personal Growth</h1>
        <p className="text-sm text-muted-foreground mt-1">Your private space to grow with Allah</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 px-6 mt-5">
        {[
          { key: 'diary', label: 'Diary to Allah', icon: PenLine },
          { key: 'planner', label: 'Daily Planner', icon: CalendarDays },
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={cn(
              'flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold transition-all',
              activeTab === key
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-accent'
            )}
          >
            <Icon className="w-3.5 h-3.5" />
            {label}
          </button>
        ))}
      </div>

      {/* Diary Tab */}
      {activeTab === 'diary' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-6 mt-5"
        >
          {diaryBP > 0 && (
            <div className="mb-3 text-xs text-primary font-medium">+{diaryBP} BP earned from diary</div>
          )}
          <div className="bg-card rounded-2xl border border-border p-5">
            <p className="text-xs text-muted-foreground mb-3 italic">
              "Your words to Allah are never wasted. Write freely."
            </p>
            <textarea
              value={diaryText}
              onChange={e => { if (!diarySubmitted) setDiaryText(e.target.value); }}
              placeholder="Write your thoughts, duas, or reflections… (min. 50 words)"
              rows={8}
              className="w-full resize-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50 outline-none leading-relaxed"
            />
            <div className="border-t border-border mt-3 pt-3 flex items-center justify-between">
              <span className={cn('text-xs', wordCount >= 50 ? 'text-primary font-medium' : 'text-muted-foreground')}>
                {wordCount} / 50 words {wordCount >= 50 ? '✓' : ''}
              </span>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={submitDiary}
                disabled={wordCount < 50 || diarySubmitted}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold disabled:opacity-40"
              >
                {diarySubmitted ? <><CheckCircle2 className="w-3.5 h-3.5" /> Submitted</> : 'Submit Entry (+20 BP)'}
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Planner Tab */}
      {activeTab === 'planner' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-6 mt-5 space-y-3"
        >
          {plannerBP > 0 && (
            <div className="text-xs text-primary font-medium">+{plannerBP} BP earned from planner</div>
          )}
          {PLANNER_SLOTS.map(({ label, placeholder }) => (
            <div key={label} className="bg-card rounded-2xl border border-border p-4">
              <p className="text-xs font-semibold text-foreground mb-2 uppercase tracking-wider">{label}</p>
              <input
                value={planner[label]}
                onChange={e => !plannerSubmitted && setPlanner(prev => ({ ...prev, [label]: e.target.value }))}
                placeholder={placeholder}
                className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50 outline-none"
              />
            </div>
          ))}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={submitPlanner}
            disabled={plannerSubmitted || !PLANNER_SLOTS.some(s => planner[s.label].trim())}
            className="w-full py-3 rounded-2xl bg-primary text-primary-foreground text-sm font-semibold disabled:opacity-40 mt-2"
          >
            {plannerSubmitted ? 'Planner Saved ✓' : 'Save Daily Plan (+10 BP)'}
          </motion.button>
        </motion.div>
      )}

      <BPPopup visible={popup.visible} message={popup.message} />
    </div>
  );
}