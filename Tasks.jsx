import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, BookOpen, Heart, PenLine, Star, Moon, HandHeart } from 'lucide-react';
import { cn } from '@/lib/utils';
import BPPopup from '../components/shared/BPPopup';
import PrayerTracker from '../components/tasks/PrayerTracker';
import { getTasks, completeTask } from '../lib/taskStore';

const CATEGORIES = [
  { label: 'All', key: 'all' },
  { label: 'Worship', key: 'worship' },
  { label: 'Reflection', key: 'reflection' },
  { label: 'Growth', key: 'growth' },
];

const TASK_META = {
  'Read 1 ayah':              { points: 2,  icon: BookOpen,  category: 'worship',    action: 'Read' },
  '100 dhikr':                { points: 20, icon: Heart,     category: 'worship',    action: 'Begin' },
  'Write reflection to Allah':{ points: 20, icon: PenLine,   category: 'reflection', action: 'Reflect' },
  'Pray Fajr on time':        { points: 30, icon: Moon,      category: 'worship',    action: 'Complete' },
  'Give a compliment':        { points: 5,  icon: Star,      category: 'growth',     action: 'Respond' },
  'Make dua for someone':     { points: 10, icon: HandHeart, category: 'growth',     action: 'Offer Dua' },
};

export default function Tasks() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [tasks, setTasks] = useState(getTasks);
  const [popup, setPopup] = useState({ visible: false, message: '' });

  // Sync with taskStore when Quran (or another tab) marks an ayah read
  useEffect(() => {
    const sync = () => setTasks(getTasks());
    window.addEventListener('nuqta_tasks_updated', sync);
    return () => window.removeEventListener('nuqta_tasks_updated', sync);
  }, []);

  const tasksWithMeta = tasks.map(t => ({ ...t, ...(TASK_META[t.title] || {}) }));
  const filtered = activeCategory === 'all'
    ? tasksWithMeta
    : tasksWithMeta.filter(t => t.category === activeCategory);

  const handleComplete = (task) => {
    if (task.completed) return;
    const updated = completeTask(task.title);
    setTasks(updated);
    setPopup({ visible: true, message: `✨ +${task.points} Barakah Points Added` });
    setTimeout(() => setPopup({ visible: false, message: '' }), 2200);
  };

  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div className="pt-12 pb-6">
      <div className="px-6">
        <h1 className="text-2xl font-bold text-foreground">Your Dots</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {completedCount}/{tasks.length} completed today
        </p>
      </div>

      {/* Category filters */}
      <div className="flex gap-2 px-6 mt-5 overflow-x-auto no-scrollbar">
        {CATEGORIES.map(cat => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={cn(
              'px-4 py-2 rounded-full text-xs font-medium transition-all whitespace-nowrap',
              activeCategory === cat.key
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-accent'
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Task list */}
      <div className="px-6 mt-5 space-y-2.5">
        <AnimatePresence>
          {filtered.map((task, i) => {
            const Icon = task.icon || BookOpen;
            return (
              <motion.div
                key={task.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={cn(
                  'flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300',
                  task.completed ? 'bg-primary/5 border-primary/20' : 'bg-card border-border'
                )}
              >
                <div className={cn(
                  'w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all',
                  task.completed ? 'bg-primary text-primary-foreground' : 'bg-accent text-accent-foreground'
                )}>
                  {task.completed ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={cn('text-sm font-medium', task.completed && 'line-through text-muted-foreground')}>
                    {task.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">+{task.points} BP</p>
                </div>
                {task.completed ? (
                  <span className="text-xs text-primary font-medium">Done ✓</span>
                ) : (
                  <motion.button
                    whileTap={{ scale: 0.93 }}
                    onClick={() => handleComplete(task)}
                    className="shrink-0 px-3 py-1.5 rounded-xl bg-primary/10 text-primary text-xs font-semibold hover:bg-primary/20 transition-colors"
                  >
                    {task.action || 'Complete'}
                  </motion.button>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Prayer Tracker */}
      <div className="px-6 mt-8">
        <PrayerTracker onEarn={(amount, message) => {
          setPopup({ visible: true, message });
          setTimeout(() => setPopup({ visible: false, message: '' }), 2200);
        }} />
      </div>

      <BPPopup visible={popup.visible} message={popup.message} />
    </div>
  );
}