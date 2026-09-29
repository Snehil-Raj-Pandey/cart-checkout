import React from 'react';
import { VIBE_CATEGORIES } from '../data/mockData.js';
import { useGift } from '../context/GiftContext.jsx';

export default function CategoriesPage() {
  const { setActivePage, showToast } = useGift();

  const handleSelectVibe = (category) => {
    showToast(`Exploring "${category.title}" collection!`);
    // Navigate to customize or home
    setActivePage('customize');
  };

  return (
    <main className="w-full max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-10 pb-20">
      {/* Header */}
      <div className="mb-8 md:mb-10 text-center md:text-left">
        <span className="inline-block px-3 py-1 rounded-full bg-secondary-container/60 text-on-secondary-container text-xs font-dm-sans font-medium mb-3">
          Explore by Personality
        </span>
        <h2 className="font-quicksand font-bold text-3xl md:text-5xl text-on-surface mb-2 tracking-tight">
          Find the Perfect Vibe
        </h2>
        <p className="font-dm-sans text-base md:text-lg text-on-surface-variant max-w-2xl">
          Thoughtfully curated collections for every personality and passion. Tap any vibe to personalize a matching e-gift.
        </p>
      </div>

      {/* Categories Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {VIBE_CATEGORIES.map((cat) => (
          <div
            key={cat.id}
            onClick={() => handleSelectVibe(cat)}
            className={`group relative overflow-hidden rounded-[2rem] ${cat.bgClass} p-6 md:p-8 flex flex-col justify-between aspect-square shadow-soft hover:-translate-y-1.5 transition-all duration-300 border-[1.5px] ${cat.borderClass} cursor-pointer`}
          >
            {/* Ambient blur circle */}
            <div className="absolute -right-4 -top-4 w-32 h-32 bg-white/25 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 pointer-events-none"></div>

            <div className="z-10">
              <span className={`material-symbols-outlined text-[48px] ${cat.textClass} mb-4 fill block transition-transform group-hover:scale-110 duration-300`}>
                {cat.icon}
              </span>
              <h3 className={`font-quicksand font-bold text-2xl ${cat.textClass} mb-1`}>
                {cat.title}
              </h3>
              <p className={`font-dm-sans text-sm md:text-base ${cat.textClass} opacity-85`}>
                {cat.description}
              </p>
            </div>

            <div className="z-10 flex items-center justify-between mt-auto pt-4">
              <span className={`text-xs font-dm-sans font-semibold uppercase tracking-wider ${cat.textClass} opacity-70 group-hover:opacity-100 transition-opacity`}>
                Customize for this vibe
              </span>
              <div className={`${cat.buttonBg} text-white rounded-full p-3 flex items-center justify-center group-hover:scale-110 group-active:scale-95 transition-transform shadow-sm`}>
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
