import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { INITIAL_CART, CARD_DESIGNS, CARD_THEMES } from '../data/mockData.js';
import { api } from '../api/client.js';

const GiftContext = createContext(null);

export function GiftProvider({ children }) {
  const [activePage, setActivePage] = useState('home');
  const [cartItems, setCartItems] = useState(INITIAL_CART);
  const [wishlist, setWishlist] = useState(['spotify-1yr']);
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState(null);
  const [cardDesigns, setCardDesigns] = useState(CARD_DESIGNS);
  const [cardThemes, setCardThemes] = useState(CARD_THEMES);
  const [isApiConnected, setIsApiConnected] = useState(false);
  const [latestOrder, setLatestOrder] = useState(null);

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

  // Sync initial state from backend on mount
  useEffect(() => {
    let isMounted = true;

    async function loadBackendData() {
      try {
        // 1. Check health
        await api.checkHealth();
        if (!isMounted) return;
        setIsApiConnected(true);

        // 2. Fetch custom designs & themes
        const customOpts = await api.getCustomOptions();
        if (isMounted && customOpts) {
          if (customOpts.designs?.length) setCardDesigns(customOpts.designs);
          if (customOpts.themes?.length) setCardThemes(customOpts.themes);
        }

        // 3. Fetch persistent cart
        const cartData = await api.getCart();
        if (isMounted && cartData?.items) {
          setCartItems(cartData.items);
        }

        // 4. Fetch persistent wishlist
        const wishlistData = await api.getWishlist();
        if (isMounted && Array.isArray(wishlistData)) {
          setWishlist(wishlistData);
        }
      } catch (err) {
        // Backend currently offline or connecting; fallback to initial mock data smoothly
        if (isMounted) {
          setIsApiConnected(false);
        }
      }
    }

    loadBackendData();

    return () => {
      isMounted = false;
    };
  }, []);

  const addToCart = async (item) => {
    const newItem = {
      ...item,
      cartInstanceId: item.cartInstanceId || `${item.id || 'item'}-${Date.now()}`
    };

    // Optimistically update UI
    setCartItems(prev => [...prev, newItem]);
    showToast(`Added "${item.title || item.name}" to cart!`);

    // Persist to backend if available
    try {
      const persisted = await api.addToCart(newItem);
      if (persisted && persisted.cartInstanceId) {
        setCartItems(prev => prev.map(it => it.cartInstanceId === newItem.cartInstanceId ? persisted : it));
      }
    } catch {
      // Local state is preserved
    }
  };

  const removeFromCart = async (cartInstanceId) => {
    setCartItems(prev => prev.filter(item => (item.cartInstanceId || item.id) !== cartInstanceId));
    showToast('Item removed from cart.', 'info');

    try {
      await api.removeFromCart(cartInstanceId);
    } catch {
      // Local state is updated
    }
  };

  const clearCart = async () => {
    setCartItems([]);
    try {
      await api.clearCart();
    } catch {
      // Local state is cleared
    }
  };

  const toggleWishlist = async (itemId) => {
    const isSaved = wishlist.includes(itemId);
    if (isSaved) {
      setWishlist(prev => prev.filter(id => id !== itemId));
      showToast('Removed from wishlist.', 'info');
    } else {
      setWishlist(prev => [...prev, itemId]);
      showToast('Saved to wishlist!');
    }

    try {
      const res = await api.toggleWishlist(itemId);
      if (res?.wishlist) {
        setWishlist(res.wishlist);
      }
    } catch {
      // Local optimistic state preserved
    }
  };

  const checkoutOrder = async ({ recipientEmail, giftNote, paymentMethod }) => {
    const orderPayload = {
      recipientEmail,
      giftNote,
      paymentMethod,
      items: cartItems
    };

    try {
      const order = await api.checkout(orderPayload);
      setLatestOrder(order);
      setCartItems([]);
      return order;
    } catch (err) {
      // Fallback local order if offline
      const mockOrder = {
        id: `GIFT-${Date.now().toString().slice(-6)}`,
        recipientEmail,
        giftNote,
        paymentMethod,
        totalAmount: cartTotal,
        items: cartItems,
        status: 'completed'
      };
      setLatestOrder(mockOrder);
      setCartItems([]);
      return mockOrder;
    }
  };

  const cartTotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + (Number(item.price) || 0), 0);
  }, [cartItems]);

  const selectedDesign = useMemo(() => {
    return cardDesigns.find(d => d.id === customGift.designId) || cardDesigns[0] || CARD_DESIGNS[0];
  }, [cardDesigns, customGift.designId]);

  const selectedTheme = useMemo(() => {
    return cardThemes.find(t => t.id === customGift.themeId) || cardThemes[0] || CARD_THEMES[0];
  }, [cardThemes, customGift.themeId]);

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
    cardDesigns,
    cardThemes,
    selectedDesign,
    selectedTheme,
    toast,
    showToast,
    checkoutOrder,
    latestOrder,
    setLatestOrder,
    isApiConnected
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
