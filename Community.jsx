import React, { useState } from 'react';
import CommunityPost from '../components/community/CommunityPost';
import LetterSection from '../components/community/LetterSection';
import BPPopup from '../components/shared/BPPopup';

const POSTS = [
  {
    author: 'Amina',
    time: '2h ago',
    content: "I've been struggling with consistency lately. Some days I feel motivated, others I can't even start. How do you all keep going?",
    likes: 14,
    replies: [
      { author: 'Omar', time: '1h ago', content: "Start small. Allah sees your effort. Even one ayah counts. You're already ahead by showing up here." },
      { author: 'Fatima', time: '45m ago', content: "I felt the same way last month. The streak counter here really helped me stay on track. One dot at a time 💚" }
    ]
  },
  {
    author: 'Khalid',
    time: '5h ago',
    content: "Alhamdulillah, just hit 30 days of reading Quran daily. Never thought I could do it. This community keeps me accountable 🤲",
    likes: 42,
    replies: [
      { author: 'Yusuf', time: '4h ago', content: "MashAllah brother! That's inspiring. May Allah keep you consistent." }
    ]
  },
  {
    author: 'Noor',
    time: '8h ago',
    content: "Tip: I write my reflections right after Fajr when my mind is clear. It's become my favourite part of the day.",
    likes: 23,
    replies: []
  }
];

export default function Community() {
  const [totalBP, setTotalBP] = useState(0);
  const [popup, setPopup] = useState({ visible: false, message: '' });

  const handleEarn = (amount, message) => {
    setTotalBP(prev => prev + amount);
    setPopup({ visible: true, message });
    setTimeout(() => setPopup({ visible: false, message: '' }), 2200);
  };

  return (
    <div className="pt-12 pb-6">
      <div className="px-6">
        <h1 className="text-2xl font-bold text-foreground">Community</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Share, support, and grow together
          {totalBP > 0 && <span className="ml-2 text-primary font-medium">· +{totalBP} BP earned</span>}
        </p>
      </div>

      <LetterSection onEarn={handleEarn} />

      <div className="px-6 mt-4 space-y-4">
        {POSTS.map((post, i) => (
          <CommunityPost key={i} post={post} onEarn={handleEarn} />
        ))}
      </div>

      <BPPopup visible={popup.visible} message={popup.message} />
    </div>
  );
}