import React, { useEffect, useState } from 'react';
import { generateDailyAffirmation } from '../services/geminiService';
import { Heart } from 'lucide-react';

export const Header: React.FC = () => {
  const [affirmation, setAffirmation] = useState<string>("正在加载今日份阳光...");

  useEffect(() => {
    let isMounted = true;
    const fetchAffirmation = async () => {
      const text = await generateDailyAffirmation();
      if (isMounted) setAffirmation(text);
    };
    fetchAffirmation();
    return () => { isMounted = false; };
  }, []);

  return (
    <header className="w-full p-6 text-center space-y-4">
      <div className="flex items-center justify-center space-x-2">
        <Heart className="text-rose-500 fill-rose-500 animate-pulse" size={28} />
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">HeartSpace</h1>
      </div>
      <div className="glass-panel rounded-2xl p-4 max-w-md mx-auto shadow-sm">
        <p className="text-sm uppercase tracking-widest text-gray-500 font-semibold mb-1">每日寄语</p>
        <p className="text-lg font-medium text-rose-700 italic">"{affirmation}"</p>
      </div>
    </header>
  );
};