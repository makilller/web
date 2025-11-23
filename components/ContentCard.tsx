import React from 'react';
import { GeneratedContent, ContentCategory } from '../types';
import { Copy, Share2, Sparkles } from 'lucide-react';

interface ContentCardProps {
  content: GeneratedContent | null;
  loading: boolean;
  onGenerate: (category: ContentCategory) => void;
}

const CATEGORY_LABELS: Record<ContentCategory, string> = {
  [ContentCategory.LOVE_NOTE]: '温馨情书',
  [ContentCategory.DATE_IDEA]: '浪漫约会',
  [ContentCategory.JOKE]: '逗你一笑',
  [ContentCategory.POEM]: '三行情诗'
};

export const ContentCard: React.FC<ContentCardProps> = ({ content, loading, onGenerate }) => {
  
  if (loading) {
    return (
      <div className="glass-panel rounded-3xl p-8 min-h-[300px] flex flex-col items-center justify-center text-center shadow-lg animate-pulse">
         <Sparkles className="text-pink-400 animate-spin mb-4" size={48} />
         <p className="text-pink-600 font-medium">正在咨询爱神丘比特...</p>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="glass-panel rounded-3xl p-8 min-h-[300px] flex flex-col items-center justify-center text-center shadow-lg">
        <div className="bg-pink-100 p-4 rounded-full mb-4">
          <Sparkles className="text-pink-500" size={32} />
        </div>
        <h2 className="text-xl font-bold text-gray-700 mb-2">我一直都在</h2>
        <p className="text-gray-500 mb-6">告诉我你现在的心情，我会为你准备一份专属的小惊喜。</p>
      </div>
    );
  }

  return (
    <div className="w-full perspective-1000">
      <div className="glass-panel rounded-3xl p-8 shadow-xl transform transition-all duration-500 hover:shadow-2xl border-t-4 border-pink-300 relative overflow-hidden group">
        
        {/* Decorative bg blob */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-pink-200/30 rounded-full blur-3xl group-hover:bg-pink-300/40 transition-colors duration-500 pointer-events-none"></div>

        <div className="relative z-10 flex flex-col items-center text-center">
          <span className="text-6xl mb-6 animate-bounce">{content.emoji}</span>
          
          <div className="mb-8">
            <h3 className="text-xs font-bold text-pink-500 uppercase tracking-widest mb-3 border-b border-pink-200 pb-1 inline-block">
              {CATEGORY_LABELS[content.category]}
            </h3>
            <p className="text-2xl font-medium text-gray-800 leading-relaxed font-serif">
              "{content.text}"
            </p>
          </div>

          <div className="flex gap-3 w-full justify-center mt-auto">
            <ActionButton 
              label="情书" 
              onClick={() => onGenerate(ContentCategory.LOVE_NOTE)} 
              primary 
            />
            <ActionButton 
              label="约会" 
              onClick={() => onGenerate(ContentCategory.DATE_IDEA)} 
            />
            <ActionButton 
              label="惊喜" 
              onClick={() => {
                 const categories = [ContentCategory.JOKE, ContentCategory.POEM];
                 const random = categories[Math.floor(Math.random() * categories.length)];
                 onGenerate(random);
              }} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const ActionButton: React.FC<{ label: string, onClick: () => void, primary?: boolean }> = ({ label, onClick, primary }) => (
  <button
    onClick={onClick}
    className={`
      px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 active:scale-95
      ${primary 
        ? 'bg-gradient-to-r from-rose-400 to-pink-500 text-white shadow-md hover:shadow-lg hover:from-rose-500 hover:to-pink-600' 
        : 'bg-white text-gray-600 shadow-sm hover:bg-gray-50 border border-gray-200'}
    `}
  >
    {label}
  </button>
);