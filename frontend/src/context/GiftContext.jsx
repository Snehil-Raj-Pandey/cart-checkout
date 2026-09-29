import React, { createContext, useContext, useState, useMemo } from 'react';
import { INITIAL_CART, CARD_DESIGNS, CARD_THEMES } from '../data/mockData.js';

const GiftContext = createContext(null);

export function GiftProvider({ children }) {
  const [activePage, setActivePage] = useState('home');
  const [cartItems, setCartItems] = useState(INITIAL_CART);
  const [wishlist, setWishlist] = useState(['spotify-1yr']);
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState(null);

  // Custom Gift state
  const [customGift, setCustomGift] = useState({
    designId: 'birthday',
    themeId: 'soft',
    recipient: 'Alex',
    message: 'Happy Birthday! Treat yourself to something cozy.',
    amount: 50
  });

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const addToCart = (item) => {
    const newItem = {
      ...item,
      cartInstanceId: `${item.id}-${Date.now()}`
    };
    setCartItems(prev => [...prev, newItem]);
    showToast(`Added "${item.title || item.name}" to cart!`);
  };

  const removeFromCart = (cartInstanceId) => {
    setCartItems(prev => prev.filter(item => (item.cartInstanceId || item.id) !== cartInstanceId));
    showToast('Item removed from cart.', 'info');
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const toggleWishlist = (itemId) => {
    setWishlist(prev => {
      if (prev.includes(itemId)) {
        showToast('Removed from wishlist.', 'info');
        return prev.filter(id => id !== itemId);
      } else {
        showToast('Saved to wishlist!');
        return [...prev, itemId];
      }
    });
  };

  const cartTotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + (Number(item.price) || 0), 0);
  }, [cartItems]);

  const selectedDesign = useMemo(() => {
    return CARD_DESIGNS.find(d => d.id === customGift.designId) || CARD_DESIGNS[0];
  }, [customGift.designId]);

  const selectedTheme = useMemo(() => {
    return CARD_THEMES.find(t => t.id === customGift.themeId) || CARD_THEMES[0];
  }, [customGift.themeId]);

  const value = {
    activePage,
    setActivePage,
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    cartTotal,
    wishlist,
    toggleWishlist,
    searchQuery,
    setSearchQuery,
    customGift,
    setCustomGift,
    selectedDesign,
    selectedTheme,
    toast,
    showToast
  };

  return (
    <GiftContext.Provider value={value}>
      {children}
    </GiftContext.Provider>
  );
}

export function useGift() {
  const context = useContext(GiftContext);
  if (!context) {
    throw new Error('useGift must be used within a GiftProvider');
  }
  return context;
}
