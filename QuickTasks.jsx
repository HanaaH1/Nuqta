import React from 'react';
import { motion } from 'framer-motion';
import { Check, BookOpen, Heart, PenLine } from 'lucide-react';
import { cn } from '@/lib/utils';

const taskIcons = {
  'Read 1 ayah': BookOpen,
  '100 dhikr': Heart,
  'Write reflection to Allah': PenLine
};

export default function QuickTasks({ tasks, onToggle }) {
  return (
    <div className="px-6 mt-8">
      <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">todays Nuqtas

      </h2>
      <div className="space-y-2.5">
        {tasks.map((task, i) => {
          const Icon = taskIcons[task.title] || BookOpen;
          return (
            <motion.button
              key={task.title}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => onToggle(i)}
              className={cn(
                'w-full flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 text-left',
                task.completed ?
                'bg-primary/5 border-primary/20' :
                'bg-card border-border hover:border-primary/20 hover:shadow-sm'
              )}>
              
              <div className={cn(
                'w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 shrink-0',
                task.completed ?
                'bg-primary text-primary-foreground' :
                'bg-accent text-accent-foreground'
              )}>
                {task.completed ?
                <Check className="w-5 h-5" /> :

                <Icon className="w-5 h-5" />
                }
              </div>
              <div className="flex-1 min-w-0">
                <p className={cn(
                  'text-sm font-medium transition-all',
                  task.completed && 'line-through text-muted-foreground'
                )}>
                  {task.title}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  +{task.points} BP
                </p>
              </div>
              <div className={cn(
                'w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-300',
                task.completed ?
                'border-primary bg-primary' :
                'border-muted-foreground/30'
              )}>
                {task.completed && <Check className="w-3.5 h-3.5 text-primary-foreground" />}
              </div>
            </motion.button>);

        })}
      </div>
    </div>);

}