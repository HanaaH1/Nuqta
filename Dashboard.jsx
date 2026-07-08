import React, { useState, useCallback } from 'react';
import WelcomeHeader from '../components/dashboard/WelcomeHeader';
import PointsCard from '../components/dashboard/PointsCard';
import QuickTasks from '../components/dashboard/QuickTasks';
import DiaryCard from '../components/dashboard/DiaryCard';
import DhikrCounter from '../components/dashboard/DhikrCounter';
import QuranCard from '../components/dashboard/QuranCard';
import BPPopup from '../components/shared/BPPopup';

const INITIAL_TASKS = [
  { title: 'Read 1 ayah', points: 2, completed: false },
  { title: '100 dhikr', points: 20, completed: false },
  { title: 'Write reflection to Allah', points: 20, completed: false },
];

export default function Dashboard() {
  const [points, setPoints] = useState(1250);
  const [streak] = useState(7);
  const [goal] = useState(2000);
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [popup, setPopup] = useState({ visible: false, message: '' });

  const showPopup = useCallback((amount, message) => {
    setPoints(prev => prev + amount);
    setPopup({ visible: true, message: message || `✨ +${amount} Barakah Points Added` });
    setTimeout(() => setPopup({ visible: false, message: '' }), 2200);
  }, []);

  const handleToggleTask = (index) => {
    setTasks(prev => {
      const updated = [...prev];
      const task = updated[index];
      if (task.completed) return prev;
      updated[index] = { ...task, completed: true };
      showPopup(task.points);
      return updated;
    });
  };

  return (
    <div className="pb-6">
      <WelcomeHeader name="Yusuf" />
      <PointsCard points={points} streak={streak} goal={goal} pointPopup={null} />
      <QuickTasks tasks={tasks} onToggle={handleToggleTask} />
      <QuranCard onEarn={showPopup} />
      <DhikrCounter onEarn={showPopup} />
      <DiaryCard onEarn={showPopup} />
      <div className="h-4" />
      <BPPopup visible={popup.visible} message={popup.message} />
    </div>
  );
}