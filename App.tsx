import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { MoodButton } from './components/MoodButton';
import { ContentCard } from './components/ContentCard';
import { generateLoveContent } from './services/geminiService';
import { MoodType, ContentCategory, GeneratedContent, MoodConfig } from './types';
import { Heart, Zap, Coffee, CloudRain, Flame, Frown } from 'lucide-react';

// Configuration for mood buttons
const MOODS: MoodConfig[] = [
  { type: MoodType.HAPPY, label: "开心", icon: "😊", color: "bg-yellow-100", promptContext: "celebratory" },
  { type: MoodType.ROMANTIC, label: "心动", icon: "🥰", color: "bg-pink-100", promptContext: "romantic" },
  { type: MoodType.TIRED, label: "累了", icon: "😴", color: "bg-blue-100", promptContext: "comforting" },
  { type: MoodType.SAD, label: "难过", icon: "😢", color: "bg-indigo-100", promptContext: "uplifting" },
  { type: MoodType.STRESSED, label: "压力大", icon: "😫", color: "bg-purple-100", promptContext: "calming" },
  { type: MoodType.ANGRY, label: "生气", icon: "😤", color: "bg-red-100", promptContext: "diffusing" },
];

const App: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [content, setContent] = useState<GeneratedContent | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Handler for mood selection
  const handleMoodSelect = useCallback((mood: MoodType) => {
    setSelectedMood(mood);
    // Automatically generate a love note when mood is first selected
    handleGenerateContent(mood, ContentCategory.LOVE_NOTE);
  }, []);

  // Handler for generating content
  const handleGenerateContent = async (mood: MoodType, category: ContentCategory) => {
    if (!mood) return;
    
    setLoading(true);
    try {
      // Add a small artificial delay for better UX flow (feels like "thinking")
      const [result] = await Promise.all([
        generateLoveContent(mood, category),
        new Promise(resolve => setTimeout(resolve, 800))
      ]);
      setContent(result);
    } catch (error) {
      console.error("Error generating content", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full pb-12 flex flex-col items-center">
      <Header />

      <main className="w-full max-w-xl px-4 flex flex-col gap-8">
        
        {/* Mood Selector Section */}
        <section>
          <div className="flex items-center gap-2 mb-4 px-2">
            <span className="bg-white/50 p-1.5 rounded-lg backdrop-blur-sm text-pink-600">
              <Heart size={16} fill="currentColor" />
            </span>
            <h2 className="text-lg font-semibold text-gray-700">亲爱的，今天心情怎么样？</h2>
          </div>
          
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {MOODS.map((mood) => (
              <MoodButton
                key={mood.type}
                config={mood}
                isSelected={selectedMood === mood.type}
                onClick={() => handleMoodSelect(mood.type)}
              />
            ))}
          </div>
        </section>

        {/* Content Display Section */}
        <section className="transition-all duration-500 ease-in-out">
          <ContentCard 
            content={content} 
            loading={loading}
            onGenerate={(category) => {
              if (selectedMood) {
                handleGenerateContent(selectedMood, category);
              } else {
                // Shake animation or tooltip could go here
                alert("请先告诉我你的心情哦！👆");
              }
            }}
          />
        </section>

        {/* Decorative Footer Element */}
        {content && (
           <div className="text-center opacity-60">
             <p className="text-xs font-medium text-purple-800">
               Made with ❤️ 专为你定制
             </p>
           </div>
        )}

      </main>
    </div>
  );
};

export default App;