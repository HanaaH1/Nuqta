// Shared task completion store using localStorage
const KEY = 'nuqta_tasks';

const DEFAULT_TASKS = [
  { title: 'Read 1 ayah', points: 2, completed: false },
  { title: '100 dhikr', points: 20, completed: false },
  { title: 'Write reflection to Allah', points: 20, completed: false },
  { title: 'Pray Fajr on time', points: 30, completed: false },
  { title: 'Give a compliment', points: 5, completed: false },
  { title: 'Make dua for someone', points: 10, completed: false },
];

export function getTasks() {
  try {
    const stored = localStorage.getItem(KEY);
    return stored ? JSON.parse(stored) : DEFAULT_TASKS;
  } catch {
    return DEFAULT_TASKS;
  }
}

export function completeTask(title) {
  const tasks = getTasks();
  const updated = tasks.map(t => t.title === title ? { ...t, completed: true } : t);
  localStorage.setItem(KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event('nuqta_tasks_updated'));
  return updated;
}

export function resetTasks() {
  localStorage.setItem(KEY, JSON.stringify(DEFAULT_TASKS));
  window.dispatchEvent(new Event('nuqta_tasks_updated'));
}