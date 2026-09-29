import React from 'react';
import Header from './components/common/Header.jsx';
import BottomNav from './components/common/BottomNav.jsx';
import Toast from './components/common/Toast.jsx';
import HomePage from './pages/HomePage.jsx';
import CategoriesPage from './pages/CategoriesPage.jsx';
import CustomizePage from './pages/CustomizePage.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';
import { useGift } from './context/GiftContext.jsx';

export default function App() {
  const { activePage } = useGift();

  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col font-dm-sans antialiased selection:bg-primary-container selection:text-on-primary-container">
      {/* Top sticky app bar */}
      <Header />

      {/* Floating feedback toast */}
      <Toast />

      {/* Main page view */}
      <div className="flex-grow">
        {activePage === 'home' && <HomePage />}
        {activePage === 'categories' && <CategoriesPage />}
        {activePage === 'customize' && <CustomizePage />}
        {activePage === 'cart' && <CheckoutPage />}
      </div>

      {/* Mobile bottom navigation bar */}
      <BottomNav />
    </div>
  );
}
