import React, { useState } from 'react';
import HeroBanner from '../components/home/HeroBanner.jsx';
import CategoryChips from '../components/home/CategoryChips.jsx';
import TrendingGifts from '../components/home/TrendingGifts.jsx';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <main className="w-full max-w-7xl mx-auto px-4 md:px-8 pb-16">
      <HeroBanner />
      <CategoryChips
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <TrendingGifts
        selectedCategory={selectedCategory}
      />
    </main>
  );
}
