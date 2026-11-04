import React, { useState, useEffect } from 'react';
import { QUICK_CATEGORIES } from '../../data/mockData.js';
import { useGift } from '../../context/GiftContext.jsx';
import { api } from '../../api/client.js';

export default function CategoryChips({ selectedCategory, onSelectCategory }) {
  const { setActivePage } = useGift();
  const [categories, setCategories] = useState(QUICK_CATEGORIES);

  useEffect(() => {
    let active = true;
    async function loadQuickCategories() {
      try {
        const quick = await api.getCategories('quick');
        if (active && Array.isArray(quick) && quick.length > 0) {
          setCategories(quick);
        }
      } catch {
        // Fallback to local QUICK_CATEGORIES
      }
    }
    loadQuickCategories();
    return () => { active = false; };
  }, []);

  const handleClick = (id) => {
    if (id === 'all') {
      setActivePage('categories');
    } else {
      onSelectCategory(selectedCategory === id ? null : id);
    }
  };

  return (
    <section className="mb-8">
      <div className="flex justify-between items-end mb-3">
        <h3 className="font-quicksand font-semibold text-xl md:text-2xl text-on-surface">
          Browse Categories
        </h3>
        <button
          onClick={() => setActivePage('categories')}
          className="font-dm-sans text-xs md:text-sm font-medium text-primary hover:underline flex items-center gap-1"
        >
          View All <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
      </div>

      <div className="flex overflow-x-auto hide-scrollbar space-x-4 pb-2 -mx-4 px-4 md:mx-0 md:px-0">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => handleClick(cat.id)}
              className="flex flex-col items-center min-w-[88px] group focus:outline-none"
            >
              <div
                className={`w-18 h-18 md:w-20 md:h-20 rounded-[1.5rem] ${cat.bg} flex items-center justify-center mb-2 transition-all duration-300 border-[1.5px] ${cat.border} ${
                  isSelected
                    ? 'ring-2 ring-primary ring-offset-2 scale-105 shadow-md'
                    : 'group-hover:scale-105 group-active:scale-95 shadow-sm'
                }`}
              >
                <span className={`material-symbols-outlined text-[30px] ${cat.text}`}>
                  {cat.icon}
                </span>
              </div>
              <span className={`font-dm-sans text-xs md:text-sm font-medium transition-colors ${
                isSelected ? 'text-primary font-semibold' : 'text-on-surface-variant group-hover:text-primary'
              }`}>
                {cat.name}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
