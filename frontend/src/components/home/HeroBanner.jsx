import React, { useState, useEffect } from 'react';
import { HERO_DATA } from '../../data/mockData.js';
import { useGift } from '../../context/GiftContext.jsx';
import { api } from '../../api/client.js';

export default function HeroBanner() {
  const { searchQuery, setSearchQuery, setActivePage } = useGift();
  const [hero, setHero] = useState(HERO_DATA);

  useEffect(() => {
    let active = true;
    async function loadHero() {
      try {
        const data = await api.getHeroConfig();
        if (active && data && data.title) {
          setHero(data);
        }
      } catch {
        // Fallback to local HERO_DATA
      }
    }
    loadHero();
    return () => { active = false; };
  }, []);

  return (
    <section className="pt-4 pb-8">
      <div className="bg-primary-container rounded-[2rem] p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between shadow-[0_20px_40px_rgba(137,79,58,0.08)]">
        {/* Decorative blurred shapes behind text */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-surface rounded-full opacity-40 blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-primary-fixed rounded-full opacity-60 blur-3xl"></div>
        </div>

        <div className="relative z-10 w-full md:w-1/2 md:pr-8 mb-6 md:mb-0">
          <span className="inline-block px-3 py-1 rounded-full bg-surface/60 text-on-primary-container text-xs font-dm-sans font-medium mb-3">
            ✨ Instant Digital Delivery
          </span>
          <h2 className="font-quicksand font-bold text-3xl md:text-5xl text-on-primary-container leading-tight mb-3">
            Send a Smile<br />Digitally.
          </h2>
          <p className="font-dm-sans text-base md:text-lg text-on-primary-container/80 mb-6 max-w-md">
            {hero.subtitle}
          </p>

          {/* Search Bar inside banner */}
          <div className="relative w-full max-w-md mb-4">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-outline">search</span>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Find the perfect gift..."
              className="w-full pl-12 pr-4 py-3.5 bg-surface rounded-full border-none shadow-inner text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary focus:outline-none font-dm-sans text-base transition-all"
            />
          </div>

          {/* Quick CTA */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActivePage('customize')}
              className="px-6 py-2.5 rounded-full bg-primary text-white font-dm-sans font-medium text-sm hover:opacity-90 active:scale-95 transition-all shadow-sm flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">palette</span>
              Customize E-Card
            </button>
            <button
              onClick={() => setActivePage('categories')}
              className="px-5 py-2.5 rounded-full bg-surface/70 text-on-primary-container font-dm-sans font-medium text-sm hover:bg-surface active:scale-95 transition-all"
            >
              Browse All Vibes
            </button>
          </div>
        </div>

        <div className="relative z-10 w-full md:w-1/2 flex justify-center md:justify-end h-64 md:h-80">
          <img
            src={hero.image}
            alt={hero.alt}
            className="object-contain h-full w-auto drop-shadow-2xl hover:-translate-y-2 transition-transform duration-500"
          />
        </div>
      </div>
    </section>
  );
}
