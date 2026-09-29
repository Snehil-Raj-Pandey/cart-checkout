import React from 'react';
import { CARD_DESIGNS, CARD_THEMES } from '../data/mockData.js';
import { useGift } from '../context/GiftContext.jsx';

const PRESET_AMOUNTS = [25, 50, 75, 100];

export default function CustomizePage() {
  const {
    customGift,
    setCustomGift,
    selectedDesign,
    selectedTheme,
    addToCart,
    setActivePage
  } = useGift();

  const handleDesignChange = (designId) => {
    setCustomGift(prev => ({ ...prev, designId }));
  };

  const handleThemeChange = (themeId) => {
    setCustomGift(prev => ({ ...prev, themeId }));
  };

  const handleRecipientChange = (recipient) => {
    setCustomGift(prev => ({ ...prev, recipient }));
  };

  const handleMessageChange = (message) => {
    setCustomGift(prev => ({ ...prev, message }));
  };

  const handleAmountChange = (amount) => {
    setCustomGift(prev => ({ ...prev, amount: Number(amount) || 0 }));
  };

  const handleAddToCart = () => {
    const customizedItem = {
      id: `custom-gift-${Date.now()}`,
      title: `${selectedDesign.name} eGift Card for ${customGift.recipient || 'Someone Special'}`,
      price: customGift.amount || 50,
      description: customGift.message || 'Happy gifting!',
      image: selectedDesign.image,
      isCustom: true,
      recipient: customGift.recipient,
      message: customGift.message,
      theme: selectedTheme.name
    };
    addToCart(customizedItem);
  };

  const handleDirectCheckout = () => {
    handleAddToCart();
    setActivePage('cart');
  };

  return (
    <main className="w-full max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-10 pb-24 flex flex-col lg:flex-row gap-8 lg:gap-12">
      {/* Left Column: E-Gift Card Live Preview (Sticky) */}
      <section className="lg:w-1/2 flex flex-col items-center justify-start lg:sticky lg:top-28 h-fit">
        <div className="w-full max-w-[380px] aspect-[3/4] bg-surface-container-lowest rounded-3xl border-[2px] border-surface-variant shadow-soft overflow-hidden flex flex-col relative transition-all duration-500">
          {/* Card Illustration Area */}
          <div className={`h-1/2 w-full ${selectedTheme.bgCard} relative overflow-hidden transition-colors duration-500`}>
            <img
              src={selectedDesign.image}
              alt={selectedDesign.alt}
              className="w-full h-full object-cover transition-opacity duration-300"
            />
            {/* Gift Amount Badge */}
            <div className="absolute top-4 right-4 bg-surface-container-lowest/90 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-sm">
              <span className="font-quicksand font-bold text-lg text-primary">
                ${customGift.amount || 0}
              </span>
            </div>
          </div>

          {/* Card Message Area */}
          <div className="p-6 flex-grow flex flex-col justify-center items-center text-center bg-surface-bright relative z-10">
            <p className="font-quicksand font-bold text-xl text-on-surface mb-2">
              For: {customGift.recipient || 'Alex'}
            </p>
            <p className="font-dm-sans text-sm text-on-surface-variant italic max-w-xs">
              "{customGift.message || 'Treat yourself to something cozy!'}"
            </p>
          </div>

          {/* Theme decorative outer border */}
          <div className={`absolute inset-0 pointer-events-none border-[6px] rounded-3xl transition-all duration-500 ${selectedTheme.borderColor}`}></div>
        </div>

        <p className="mt-4 text-on-surface-variant font-dm-sans text-xs flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[16px] text-primary">visibility</span>
          Live Preview • Updates in real-time
        </p>
      </section>

      {/* Right Column: Customization Controls */}
      <section className="lg:w-1/2 flex flex-col gap-8">
        <div>
          <span className="inline-block px-3 py-1 rounded-full bg-primary-container text-on-primary-container text-xs font-dm-sans font-medium mb-2">
            Personalize Your Gift
          </span>
          <h2 className="font-quicksand font-bold text-2xl md:text-3xl text-on-surface">
            Customize E-Gift Card
          </h2>
        </div>

        {/* Step 1: Choose Design */}
        <div className="bg-surface-container-low/60 rounded-3xl p-6 border border-outline-variant/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-quicksand font-bold text-sm">
              1
            </div>
            <h3 className="font-quicksand font-bold text-lg text-on-surface">
              Choose Design
            </h3>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {CARD_DESIGNS.map((design) => {
              const isChecked = customGift.designId === design.id;
              return (
                <div
                  key={design.id}
                  onClick={() => handleDesignChange(design.id)}
                  className={`cursor-pointer group relative rounded-2xl p-2 border-[2px] transition-all text-center ${
                    isChecked
                      ? 'border-primary bg-surface-container-lowest shadow-sm'
                      : 'border-surface-variant bg-surface-container/50 hover:border-primary-container'
                  }`}
                >
                  <div className="aspect-square rounded-xl overflow-hidden mb-2 bg-surface-container flex items-center justify-center">
                    <img
                      src={design.thumb}
                      alt={design.name}
                      className="w-full h-full object-cover p-2"
                    />
                  </div>
                  <p className="font-dm-sans font-medium text-xs text-on-surface">
                    {design.name}
                  </p>
                  {isChecked && (
                    <div className="absolute -top-1.5 -right-1.5 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center shadow-sm">
                      <span className="material-symbols-outlined text-[12px] fill">check</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 2: Select Theme */}
        <div className="bg-surface-container-low/60 rounded-3xl p-6 border border-outline-variant/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-quicksand font-bold text-sm">
              2
            </div>
            <h3 className="font-quicksand font-bold text-lg text-on-surface">
              Select Theme Mood
            </h3>
          </div>

          <div className="flex gap-4">
            {CARD_THEMES.map((theme) => {
              const isChecked = customGift.themeId === theme.id;
              return (
                <div
                  key={theme.id}
                  onClick={() => handleThemeChange(theme.id)}
                  className={`flex-1 cursor-pointer p-4 rounded-2xl border-[2px] text-center transition-all ${
                    isChecked
                      ? 'border-primary bg-surface-container-lowest shadow-sm'
                      : 'border-surface-variant hover:border-primary-container bg-surface-container/40'
                  }`}
                >
                  <span className={`inline-block w-full h-8 rounded-xl bg-gradient-to-r ${theme.gradientClass} mb-2 shadow-inner`}></span>
                  <span className="font-dm-sans font-medium text-sm text-on-surface">
                    {theme.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 3: Recipient & Personal Note */}
        <div className="bg-surface-container-low/60 rounded-3xl p-6 border border-outline-variant/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-tertiary-container text-on-tertiary-container flex items-center justify-center font-quicksand font-bold text-sm">
              3
            </div>
            <h3 className="font-quicksand font-bold text-lg text-on-surface">
              Recipient & Message
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-dm-sans font-medium text-on-surface-variant mb-1 ml-1">
                Recipient Name
              </label>
              <input
                type="text"
                value={customGift.recipient}
                onChange={(e) => handleRecipientChange(e.target.value)}
                placeholder="e.g. Alex, Mom, Bestie"
                className="w-full bg-surface-container-lowest rounded-full px-5 py-3 border border-outline-variant/50 text-sm font-dm-sans focus:outline-none focus:ring-2 focus:ring-primary input-recessed"
              />
            </div>

            <div>
              <label className="block text-xs font-dm-sans font-medium text-on-surface-variant mb-1 ml-1">
                Personalized Note
              </label>
              <textarea
                rows={3}
                value={customGift.message}
                onChange={(e) => handleMessageChange(e.target.value)}
                placeholder="Write a sweet, thoughtful note..."
                className="w-full bg-surface-container-lowest rounded-2xl px-5 py-3 border border-outline-variant/50 text-sm font-dm-sans focus:outline-none focus:ring-2 focus:ring-primary input-recessed resize-none"
              />
            </div>
          </div>
        </div>

        {/* Step 4: Gift Amount */}
        <div className="bg-surface-container-low/60 rounded-3xl p-6 border border-outline-variant/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center font-quicksand font-bold text-sm">
              4
            </div>
            <h3 className="font-quicksand font-bold text-lg text-on-surface">
              Gift Amount
            </h3>
          </div>

          <div className="grid grid-cols-4 gap-2.5 mb-3">
            {PRESET_AMOUNTS.map((amt) => {
              const isSelected = customGift.amount === amt;
              return (
                <button
                  key={amt}
                  type="button"
                  onClick={() => handleAmountChange(amt)}
                  className={`py-2.5 rounded-full font-quicksand font-bold text-sm transition-all ${
                    isSelected
                      ? 'bg-primary text-white shadow-sm'
                      : 'bg-surface-container-lowest border border-outline-variant/50 text-on-surface hover:bg-surface-container'
                  }`}
                >
                  ${amt}
                </button>
              );
            })}
          </div>

          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-outline font-bold">$</span>
            <input
              type="number"
              min="5"
              max="1000"
              value={customGift.amount}
              onChange={(e) => handleAmountChange(e.target.value)}
              placeholder="Or enter custom amount"
              className="w-full pl-8 pr-4 py-2.5 bg-surface-container-lowest rounded-full border border-outline-variant/50 text-sm font-dm-sans focus:outline-none focus:ring-2 focus:ring-primary input-recessed"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={handleAddToCart}
            className="flex-1 py-4 px-6 rounded-full bg-surface-container text-on-surface font-dm-sans font-semibold text-sm hover:bg-surface-container-high active:scale-95 transition-all flex items-center justify-center gap-2 border border-outline-variant/50"
          >
            <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
            Add to Cart (${customGift.amount || 0})
          </button>
          <button
            onClick={handleDirectCheckout}
            className="flex-1 py-4 px-6 rounded-full bg-primary text-white font-dm-sans font-semibold text-sm hover:opacity-90 active:scale-95 transition-all shadow-soft flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            Proceed to Checkout
          </button>
        </div>
      </section>
    </main>
  );
}
