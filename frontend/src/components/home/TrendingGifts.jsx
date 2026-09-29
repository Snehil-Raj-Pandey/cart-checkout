import React from 'react';
import { TRENDING_GIFTS } from '../../data/mockData.js';
import { useGift } from '../../context/GiftContext.jsx';

export default function TrendingGifts({ selectedCategory }) {
  const { addToCart, setActivePage, searchQuery, wishlist, toggleWishlist } = useGift();

  const filteredGifts = TRENDING_GIFTS.filter(gift => {
    const matchesCategory = !selectedCategory || gift.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      gift.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gift.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const spotify = filteredGifts.find(g => g.id === 'spotify-1yr') || TRENDING_GIFTS[0];
  const starbucks = filteredGifts.find(g => g.id === 'starbucks-card') || TRENDING_GIFTS[1];
  const netflix = filteredGifts.find(g => g.id === 'netflix-3mo') || TRENDING_GIFTS[2];
  const ecards = filteredGifts.find(g => g.id === 'premium-ecards') || TRENDING_GIFTS[3];

  return (
    <section className="mb-10">
      <div className="flex justify-between items-end mb-5">
        <div>
          <h3 className="font-quicksand font-bold text-2xl text-on-surface">
            Trending Gifts
          </h3>
          <p className="font-dm-sans text-xs text-on-surface-variant mt-0.5">
            Most popular picks loved by digital gifters this week
          </p>
        </div>
        <button
          onClick={() => setActivePage('categories')}
          className="font-dm-sans text-sm font-medium text-primary hover:underline"
        >
          View All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Featured Large Card: Spotify Premium */}
        {spotify && (
          <div className="md:col-span-2 bg-surface-container-lowest rounded-[2rem] border-[1.5px] border-outline-variant/30 overflow-hidden shadow-[0_12px_30px_rgba(137,79,58,0.06)] group flex flex-col md:flex-row h-full transition-all duration-300 hover:shadow-soft">
            <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-secondary-container/50 text-on-secondary-container font-dm-sans text-xs font-semibold">
                    <span className="material-symbols-outlined text-[15px] mr-1 fill">local_fire_department</span>
                    #1 Popular
                  </div>
                  <button
                    onClick={() => toggleWishlist(spotify.id)}
                    className="text-on-surface-variant hover:text-primary transition-colors p-1"
                    title="Save to wishlist"
                  >
                    <span className={`material-symbols-outlined text-[20px] ${wishlist.includes(spotify.id) ? 'fill text-primary' : ''}`}>
                      favorite
                    </span>
                  </button>
                </div>
                <h4 className="font-quicksand font-bold text-xl text-on-surface mb-2 group-hover:text-primary transition-colors">
                  {spotify.title}
                </h4>
                <p className="font-dm-sans text-sm text-on-surface-variant mb-4 line-clamp-3">
                  {spotify.description}
                </p>
              </div>

              <div className="flex items-center justify-between mt-4 pt-3 border-t border-outline-variant/20">
                <div>
                  <span className="text-xs text-on-surface-variant block">Price</span>
                  <span className="font-quicksand font-bold text-2xl text-primary">${spotify.price.toFixed(2)}</span>
                </div>
                <button
                  onClick={() => addToCart(spotify)}
                  className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center btn-squash shadow-[0_4px_12px_rgba(137,79,58,0.3)] hover:opacity-90 transition-all"
                  title="Add to Cart"
                >
                  <span className="material-symbols-outlined text-[20px] fill">add_shopping_cart</span>
                </button>
              </div>
            </div>

            <div className="w-full md:w-1/2 h-52 md:h-auto bg-surface-variant/30 relative overflow-hidden">
              <img
                src={spotify.image}
                alt={spotify.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          </div>
        )}

        {/* Standard Card 1: Starbucks */}
        {starbucks && (
          <div className="bg-surface-container-lowest rounded-[2rem] border-[1.5px] border-outline-variant/30 p-6 flex flex-col shadow-[0_12px_30px_rgba(137,79,58,0.04)] group transition-all duration-300 hover:shadow-soft">
            <div className="w-full h-40 bg-surface-container/50 rounded-xl mb-4 relative overflow-hidden flex items-center justify-center">
              <img
                src={starbucks.image}
                alt={starbucks.title}
                className="w-24 h-24 object-contain z-10 group-hover:scale-110 transition-transform duration-500"
              />
              <button
                onClick={() => toggleWishlist(starbucks.id)}
                className="absolute top-2 right-2 text-on-surface-variant hover:text-primary transition-colors p-1 z-20"
              >
                <span className={`material-symbols-outlined text-[18px] ${wishlist.includes(starbucks.id) ? 'fill text-primary' : ''}`}>
                  favorite
                </span>
              </button>
            </div>
            <h4 className="font-quicksand font-semibold text-lg text-on-surface mb-1 group-hover:text-primary transition-colors">
              {starbucks.title}
            </h4>
            <p className="font-dm-sans text-xs text-on-surface-variant mb-4">
              {starbucks.subtitle}
            </p>
            <div className="flex items-center justify-between mt-auto pt-2">
              <span className="font-quicksand font-bold text-lg text-primary">${starbucks.price.toFixed(2)}</span>
              <button
                onClick={() => addToCart(starbucks)}
                className="w-10 h-10 rounded-full bg-surface-container text-on-surface flex items-center justify-center btn-squash hover:bg-primary-container hover:text-on-primary-container transition-colors"
                title="Add to Cart"
              >
                <span className="material-symbols-outlined text-[18px]">add</span>
              </button>
            </div>
          </div>
        )}

        {/* Standard Card 2: Netflix */}
        {netflix && (
          <div className="bg-surface-container-lowest rounded-[2rem] border-[1.5px] border-outline-variant/30 p-6 flex flex-col shadow-[0_12px_30px_rgba(137,79,58,0.04)] group transition-all duration-300 hover:shadow-soft">
            <div className="w-full h-40 bg-surface-container/50 rounded-xl mb-4 relative overflow-hidden flex items-center justify-center">
              <img
                src={netflix.image}
                alt={netflix.title}
                className="w-24 h-24 object-contain z-10 group-hover:scale-110 transition-transform duration-500"
              />
              <button
                onClick={() => toggleWishlist(netflix.id)}
                className="absolute top-2 right-2 text-on-surface-variant hover:text-primary transition-colors p-1 z-20"
              >
                <span className={`material-symbols-outlined text-[18px] ${wishlist.includes(netflix.id) ? 'fill text-primary' : ''}`}>
                  favorite
                </span>
              </button>
            </div>
            <h4 className="font-quicksand font-semibold text-lg text-on-surface mb-1 group-hover:text-primary transition-colors">
              {netflix.title}
            </h4>
            <p className="font-dm-sans text-xs text-on-surface-variant mb-4">
              {netflix.subtitle}
            </p>
            <div className="flex items-center justify-between mt-auto pt-2">
              <span className="font-quicksand font-bold text-lg text-primary">${netflix.price.toFixed(2)}</span>
              <button
                onClick={() => addToCart(netflix)}
                className="w-10 h-10 rounded-full bg-surface-container text-on-surface flex items-center justify-center btn-squash hover:bg-primary-container hover:text-on-primary-container transition-colors"
                title="Add to Cart"
              >
                <span className="material-symbols-outlined text-[18px]">add</span>
              </button>
            </div>
          </div>
        )}

        {/* Standard Card 3 (Span 2): Premium Animated E-Cards */}
        {ecards && (
          <div className="bg-surface-container-lowest rounded-[2rem] border-[1.5px] border-outline-variant/30 p-6 flex flex-col shadow-[0_12px_30px_rgba(137,79,58,0.04)] group md:col-span-2 transition-all duration-300 hover:shadow-soft">
            <div className="flex flex-col md:flex-row h-full gap-5">
              <div className="w-full md:w-1/3 h-40 md:h-auto bg-surface-container/50 rounded-xl relative overflow-hidden flex items-center justify-center shrink-0">
                <img
                  src={ecards.image}
                  alt={ecards.title}
                  className="w-32 h-32 object-contain z-10 group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="flex flex-col justify-center flex-grow">
                <div className="inline-block px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[11px] font-semibold w-fit mb-2">
                  Artisan Collection
                </div>
                <h4 className="font-quicksand font-bold text-xl text-on-surface mb-2 group-hover:text-primary transition-colors">
                  {ecards.title}
                </h4>
                <p className="font-dm-sans text-sm text-on-surface-variant mb-4">
                  {ecards.description}
                </p>
                <div className="flex items-center gap-3 mt-auto">
                  <button
                    onClick={() => setActivePage('customize')}
                    className="px-6 py-2.5 rounded-full bg-primary text-white font-dm-sans text-sm font-medium hover:opacity-90 active:scale-95 transition-all shadow-sm flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[18px]">palette</span>
                    Customize Card
                  </button>
                  <button
                    onClick={() => addToCart(ecards)}
                    className="px-4 py-2.5 rounded-full bg-surface-container text-on-surface font-dm-sans text-sm font-medium hover:bg-secondary-container transition-colors"
                  >
                    Add directly (${ecards.price.toFixed(2)})
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
