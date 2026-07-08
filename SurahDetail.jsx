import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Loader2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { SURAHS } from '../lib/surahs';
import { completeTask } from '../lib/taskStore';
import BPPopup from '../components/shared/BPPopup';

export default function SurahDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const surahId = parseInt(id, 10);
  const surah = SURAHS.find(s => s.id === surahId);

  const [ayahs, setAyahs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const storageKey = `nuqta_read_${surahId}`;
  const [readSet, setReadSet] = useState(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch { return new Set(); }
  });
  const [popup, setPopup] = useState({ visible: false, message: '' });
  const [taskDone, setTaskDone] = useState(() => {
    try {
      const t = JSON.parse(localStorage.getItem('nuqta_tasks') || '[]');
      return t.find(x => x.title === 'Read 1 ayah')?.completed;
    } catch { return false; }
  });

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true); setError(false);
      try {
        const res = await fetch(`https://api.alquran.cloud/v1/surah/${surahId}/editions/quran-uthmani,en.asad`);
        const json = await res.json();
        if (cancelled) return;
        if (json.code !== 200 || !json.data?.length) throw new Error('bad');
        const ar = json.data[0].ayahs;
        const en = json.data[1].ayahs;
        const merged = ar.map((a, i) => ({
          n: a.numberInSurah,
          ar: a.text,
          en: en[i]?.text || '',
        }));
        setAyahs(merged);
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, [surahId]);

  const markRead = (ayahNum) => {
    if (readSet.has(ayahNum)) return;
    const next = new Set([...readSet, ayahNum]);
    setReadSet(next);
    localStorage.setItem(storageKey, JSON.stringify([...next]));
    setPopup({ visible: true, message: '📖 +2 Barakah Points — Ayah Read' });
    setTimeout(() => setPopup({ visible: false, message: '' }), 1800);
    if (!taskDone && next.size === 1) {
      completeTask('Read 1 ayah');
      setTaskDone(true);
    }
  };

  const totalBP = readSet.size * 2;

  if (!surah) return <div className="pt-20 px-6 text-center text-muted-foreground">Surah not found.</div>;

  const progress = ayahs.length ? Math.round((readSet.size / ayahs.length) * 100) : 0;
  const showBismillahHeader = surahId !== 1 && surahId !== 9;

  return (
    <div className="pb-6 min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/90 backdrop-blur-md border-b border-border px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate('/quran')} className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center">
          <ArrowLeft className="w-4 h-4 text-foreground" />
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline justify-between">
            <p className="text-sm font-bold text-foreground">{surah.name}</p>
            <p className="text-base font-arabic text-foreground/70">{surah.arabic}</p>
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <p className="text-[10px] text-muted-foreground">{surah.meaning} · {surah.ayahCount} ayahs</p>
            {readSet.size > 0 && <span className="text-[10px] text-primary font-medium">· {readSet.size} read · +{totalBP} BP</span>}
          </div>
        </div>
      </div>

      {/* Progress */}
      {readSet.size > 0 && (
        <div className="px-6 pt-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] text-muted-foreground">Reading progress</span>
            <span className="text-[10px] text-primary font-medium">{progress}%</span>
          </div>
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}

      {/* Bismillah */}
      {showBismillahHeader && !loading && (
        <div className="mx-6 mt-5 bg-gradient-to-br from-accent to-primary/5 rounded-2xl border border-primary/10 p-4 text-center">
          <p className="text-2xl font-arabic text-foreground">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
          <p className="text-xs text-muted-foreground mt-1">In the name of Allah, the Entirely Merciful, the Especially Merciful</p>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="px-6 mt-10 flex flex-col items-center gap-3 text-muted-foreground">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
          <p className="text-xs">Loading verses…</p>
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div className="px-6 mt-10 flex flex-col items-center gap-3 text-center">
          <AlertCircle className="w-6 h-6 text-destructive" />
          <p className="text-xs text-muted-foreground">Couldn't load verses.</p>
          <button onClick={() => { setAyahs([]); }} className="text-xs text-primary font-semibold">Retry</button>
        </div>
      )}

      {/* Ayahs */}
      {!loading && !error && (
        <div className="px-6 mt-4 space-y-3">
          {ayahs.map((ayah) => {
            const isRead = readSet.has(ayah.n);
            return (
              <motion.div
                key={ayah.n}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  'rounded-2xl border p-5 transition-all duration-300',
                  isRead ? 'bg-primary/5 border-primary/20' : 'bg-card border-border'
                )}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className={cn(
                    'w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-1',
                    isRead ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
                  )}>
                    {isRead ? <Check className="w-3.5 h-3.5" /> : ayah.n}
                  </div>
                  <p className="text-xl font-arabic text-right text-foreground leading-relaxed flex-1">{ayah.ar}</p>
                </div>
                <p className="text-sm text-foreground/75 leading-relaxed italic">{ayah.en}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[10px] text-muted-foreground">{surah.name} {surahId}:{ayah.n}</span>
                  <motion.button
                    whileTap={{ scale: 0.94 }}
                    onClick={() => markRead(ayah.n)}
                    disabled={isRead}
                    className={cn(
                      'px-3 py-1.5 rounded-xl text-xs font-semibold transition-all',
                      isRead ? 'bg-primary/10 text-primary cursor-default' : 'bg-primary text-primary-foreground'
                    )}
                  >
                    {isRead ? 'Read ✓' : 'Mark as Read · +2 BP'}
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      <BPPopup visible={popup.visible} message={popup.message} />
    </div>
  );
}