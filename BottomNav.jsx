import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ListChecks, Users, User, BookOpen, Sprout } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/tasks', icon: ListChecks, label: 'Tasks' },
  { path: '/quran', icon: BookOpen, label: 'Quran' },
  { path: '/community', icon: Users, label: 'Community' },
  { path: '/growth', icon: Sprout, label: 'Growth' },
];

export default function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-card/80 backdrop-blur-xl border-t border-border z-50">
      <div className="flex items-center justify-around py-2 pb-safe">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={cn(
                'flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-all duration-200',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Icon className={cn('w-5 h-5', isActive && 'stroke-[2.5px]')} />
              <span className={cn('text-[9px] font-medium', isActive && 'font-semibold')}>
                {label}
              </span>
              {isActive && (
                <div className="w-1 h-1 rounded-full bg-primary mt-0.5" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}