import React, { useState } from 'react';
import { Moon, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const PRAYERS = [
  { name: 'Fajr', adhan: '05:30' },
  { name: 'Dhuhr', adhan: '13:00' },
  { name: 'Asr', adhan: '16:30' },
  { name: 'Maghrib', adhan: '19:45' },
  { name: 'Isha', adhan: '21:15' },
];

function timeToMinutes(t) {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
}

function getBP(adhan, prayed) {
  if (!prayed) return null;
  const diff = timeToMinutes(prayed) - timeToMinutes(adhan);
  if (diff < 0) return null; // before adhan
  if (diff <= 60) return 20;
  return 10;
}

export default function PrayerTracker({ onEarn }) {
  const [prayedTimes, setPrayedTimes] = useState({});
  const [logged, setLogged] = useState({});

  const handleLog = (prayer) => {
    const prayed = prayedTimes[prayer.name];
    const bp = getBP(prayer.adhan, prayed);
    if (bp === null) return;
    setLogged(prev => ({ ...prev, [prayer.name]: bp }));
    onEarn(bp, `🕌 +${bp} BP — ${prayer.name} Logged`);
  };

  return (
    <div className="mx-0 mt-0">
      <div className="flex items-center gap-2 mb-3">
        <Moon className="w-4 h-4 text-primary" />
        <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">Prayer Tracker</h2>
      </div>
      <div className="space-y-2.5">
        {PRAYERS.map(prayer => {
          const isLogged = !!logged[prayer.name];
          const bp = logged[prayer.name];
          return (
            <div
              key={prayer.name}
              className={cn(
                'bg-card rounded-2xl border p-4 transition-all',
                isLogged ? 'border-primary/20 bg-primary/5' : 'border-border'
              )}
            >
              <div className="flex items-center justify-between mb-2.5">
                <div>
                  <p className="text-sm font-semibold text-foreground">{prayer.name}</p>
                  <p className="text-[10px] text-muted-foreground flex items-center gap-1 mt-0.5">
                    <Clock className="w-3 h-3" /> Adhan: {prayer.adhan}
                  </p>
                </div>
                {isLogged ? (
                  <span className="text-xs text-primary font-semibold">+{bp} BP ✓</span>
                ) : (
                  <span className="text-[10px] text-muted-foreground">≤1hr = +20 BP · &gt;1hr = +10 BP</span>
                )}
              </div>
              {!isLogged && (
                <div className="flex gap-2 items-center">
                  <div className="flex items-center gap-1.5 flex-1 bg-secondary rounded-xl px-3 py-2">
                    <Clock className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                    <input
                      type="time"
                      value={prayedTimes[prayer.name] || ''}
                      onChange={e => setPrayedTimes(prev => ({ ...prev, [prayer.name]: e.target.value }))}
                      className="bg-transparent text-xs text-foreground outline-none w-full"
                    />
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.93 }}
                    onClick={() => handleLog(prayer)}
                    disabled={!prayedTimes[prayer.name]}
                    className="px-3 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold disabled:opacity-40 shrink-0"
                  >
                    Log
                  </motion.button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}