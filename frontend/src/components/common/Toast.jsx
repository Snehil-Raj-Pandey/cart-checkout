import React from 'react';
import { useGift } from '../../context/GiftContext.jsx';

export default function Toast() {
  const { toast } = useGift();

  if (!toast) return null;

  const isSuccess = toast.type === 'success';

  return (
    <div className="fixed top-20 right-6 z-50 animate-bounce duration-300">
      <div className={`px-5 py-3 rounded-2xl shadow-soft flex items-center gap-3 border ${
        isSuccess
          ? 'bg-secondary-container text-on-secondary-container border-secondary/30'
          : 'bg-primary-fixed text-on-primary-fixed border-primary/30'
      }`}>
        <span className="material-symbols-outlined text-[20px]">
          {isSuccess ? 'check_circle' : 'info'}
        </span>
        <span className="font-dm-sans font-medium text-sm">
          {toast.message}
        </span>
      </div>
    </div>
  );
}
