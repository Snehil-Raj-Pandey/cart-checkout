import React, { useState } from 'react';
import { useGift } from '../context/GiftContext.jsx';

export default function CheckoutPage() {
  const { cartItems, removeFromCart, cartTotal, setActivePage, clearCart, showToast, checkoutOrder } = useGift();
  const [recipientEmail, setRecipientEmail] = useState('');
  const [giftNote, setGiftNote] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  const handleCheckout = async (paymentMethod = 'Card') => {
    if (cartItems.length === 0) {
      showToast('Your cart is empty!', 'info');
      return;
    }
    if (!recipientEmail || !recipientEmail.includes('@')) {
      showToast('Please enter a valid recipient email', 'info');
      return;
    }

    setIsProcessing(true);
    try {
      const order = await checkoutOrder({
        recipientEmail,
        giftNote,
        paymentMethod
      });
      setConfirmedOrder(order);
      setIsCompleted(true);
      showToast('Order confirmed successfully!');
    } catch (err) {
      showToast(err.message || 'Checkout failed. Please try again.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  if (isCompleted) {
    return (
      <main className="w-full max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="bg-surface-container-lowest border-[1.5px] border-secondary/30 rounded-[2.5rem] p-8 md:p-12 shadow-soft flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center mb-6 shadow-sm">
            <span className="material-symbols-outlined text-[40px] fill">celebration</span>
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-secondary mb-2">Order Confirmed</span>
          <h2 className="font-quicksand font-bold text-3xl md:text-4xl text-on-surface mb-3">
            Gift Sent Successfully!
          </h2>
          {confirmedOrder && confirmedOrder.id && (
            <div className="mb-4 px-4 py-1.5 rounded-full bg-surface-container text-xs font-mono font-semibold text-primary inline-flex items-center gap-1.5 border border-outline-variant/30">
              <span className="material-symbols-outlined text-[14px]">receipt_long</span>
              Receipt ID: {confirmedOrder.id}
            </div>
          )}
          <p className="font-dm-sans text-base text-on-surface-variant max-w-md mb-8">
            Your thoughtful digital gift has been dispatched to <strong>{recipientEmail || 'your friend'}</strong>. A confirmation receipt has been saved to your account.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
            <button
              onClick={() => {
                setIsCompleted(false);
                setActivePage('home');
              }}
              className="w-full py-3.5 px-6 rounded-full bg-primary text-white font-dm-sans font-semibold text-sm hover:opacity-90 active:scale-95 transition-all shadow-sm"
            >
              Back to Home
            </button>
            <button
              onClick={() => {
                setIsCompleted(false);
                setActivePage('categories');
              }}
              className="w-full py-3.5 px-6 rounded-full bg-surface-container text-on-surface font-dm-sans font-semibold text-sm hover:bg-surface-container-high active:scale-95 transition-all"
            >
              Send Another Gift
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full max-w-3xl mx-auto px-4 md:px-8 py-6 md:py-10 pb-28 flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-1 text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
          <button
            onClick={() => setActivePage('home')}
            className="text-on-surface-variant hover:text-primary flex items-center text-sm font-dm-sans"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Back
          </button>
        </div>
        <h2 className="font-quicksand font-bold text-3xl md:text-4xl text-on-surface">
          Your Gift Cart
        </h2>
        <p className="font-dm-sans text-base text-on-surface-variant">
          Review your thoughtful selections before sending.
        </p>
      </div>

      {/* Cart Items List */}
      <section className="flex flex-col gap-4">
        {cartItems.length === 0 ? (
          <div className="bg-surface-container-lowest border border-outline-variant/40 rounded-3xl p-10 text-center shadow-card">
            <div className="w-16 h-16 rounded-full bg-surface-container mx-auto flex items-center justify-center mb-4 text-outline">
              <span className="material-symbols-outlined text-[32px]">shopping_bag</span>
            </div>
            <h3 className="font-quicksand font-bold text-xl text-on-surface mb-2">
              Your cart is currently empty
            </h3>
            <p className="font-dm-sans text-sm text-on-surface-variant mb-6 max-w-sm mx-auto">
              Find a special gift, create a custom e-card, or explore gifts for your favorite hobbies.
            </p>
            <button
              onClick={() => setActivePage('home')}
              className="px-6 py-3 rounded-full bg-primary text-white font-dm-sans font-medium text-sm hover:opacity-90 active:scale-95 transition-all shadow-sm"
            >
              Explore Gifts
            </button>
          </div>
        ) : (
          cartItems.map((item) => {
            const key = item.cartInstanceId || item.id;
            return (
              <div
                key={key}
                className="bg-surface-container-lowest border-[1.5px] border-outline-variant/40 rounded-2xl p-5 flex flex-col sm:flex-row gap-4 items-center sm:items-start shadow-card transition-all hover:shadow-soft"
              >
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl flex-shrink-0 overflow-hidden bg-surface-variant flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-grow flex flex-col gap-1 text-center sm:text-left w-full">
                  <div className="flex justify-between items-start w-full">
                    <h3 className="font-quicksand font-bold text-lg text-on-surface">
                      {item.title}
                    </h3>
                    <p className="font-quicksand font-bold text-xl text-primary">
                      ${Number(item.price).toFixed(2)}
                    </p>
                  </div>

                  <p className="font-dm-sans text-xs md:text-sm text-on-surface-variant line-clamp-2">
                    {item.description}
                  </p>

                  {item.recipient && (
                    <p className="text-xs font-dm-sans text-secondary font-medium">
                      Recipient: {item.recipient}
                    </p>
                  )}

                  <div className="mt-2 self-center sm:self-start">
                    <button
                      onClick={() => removeFromCart(key)}
                      className="font-dm-sans text-xs font-semibold text-error hover:opacity-80 transition-opacity flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[16px]">delete</span>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </section>

      {cartItems.length > 0 && (
        <>
          {/* Subtotal / Total */}
          <div className="flex justify-between items-center py-4 border-t-[1.5px] border-outline-variant/30">
            <span className="font-quicksand font-bold text-lg text-on-surface-variant">Total</span>
            <span className="font-quicksand font-bold text-3xl text-primary">
              ${cartTotal.toFixed(2)}
            </span>
          </div>

          {/* Delivery Details */}
          <section className="bg-surface-container-low rounded-2xl p-6 flex flex-col gap-4 border-[1.5px] border-outline-variant/30 shadow-card">
            <h3 className="font-quicksand font-bold text-xl text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">mail</span>
              Delivery Details
            </h3>

            <div className="flex flex-col gap-1">
              <label className="font-dm-sans text-xs font-medium text-on-surface-variant ml-1" htmlFor="recipient_email">
                Recipient Email *
              </label>
              <input
                id="recipient_email"
                type="email"
                required
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                placeholder="friend@example.com"
                className="w-full bg-surface-container-lowest border border-outline-variant/40 rounded-full px-5 py-3 font-dm-sans text-sm text-on-surface focus:ring-2 focus:ring-primary focus:outline-none input-recessed transition-all"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-dm-sans text-xs font-medium text-on-surface-variant ml-1" htmlFor="gift_message">
                Add a personal note (Optional)
              </label>
              <textarea
                id="gift_message"
                rows={3}
                value={giftNote}
                onChange={(e) => setGiftNote(e.target.value)}
                placeholder="Thinking of you! Enjoy this gift..."
                className="w-full bg-surface-container-lowest border border-outline-variant/40 rounded-2xl px-5 py-3 font-dm-sans text-sm text-on-surface focus:ring-2 focus:ring-primary focus:outline-none input-recessed transition-all resize-none"
              />
            </div>
          </section>

          {/* Payment Method */}
          <section className="flex flex-col gap-4">
            <h3 className="font-quicksand font-bold text-xl text-on-surface">Payment Method</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Apple Pay */}
              <button
                type="button"
                onClick={() => handleCheckout('Apple Pay')}
                disabled={isProcessing}
                className="bg-on-surface text-surface-container-lowest rounded-full py-3.5 px-6 flex items-center justify-center gap-2 font-quicksand font-bold text-base hover:opacity-90 active:scale-95 transition-all w-full shadow-sm"
              >
                <span className="material-symbols-outlined text-[20px] fill">payments</span>
                Apple Pay
              </button>

              {/* Google Pay */}
              <button
                type="button"
                onClick={() => handleCheckout('Google Pay')}
                disabled={isProcessing}
                className="bg-surface-container-lowest border-[1.5px] border-outline-variant text-on-surface rounded-full py-3.5 px-6 flex items-center justify-center gap-2 font-quicksand font-bold text-base hover:bg-surface-variant active:scale-95 transition-all w-full shadow-sm"
              >
                <span className="material-symbols-outlined text-[20px] text-primary">account_balance_wallet</span>
                Google Pay
              </button>
            </div>

            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t-[1.5px] border-outline-variant/30"></div>
              <span className="flex-shrink-0 mx-4 font-dm-sans text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
                Or pay with card
              </span>
              <div className="flex-grow border-t-[1.5px] border-outline-variant/30"></div>
            </div>

            {/* Send Gift Button */}
            <button
              type="button"
              onClick={() => handleCheckout('Card')}
              disabled={isProcessing}
              className="w-full bg-primary-container text-on-primary-container rounded-full py-4 px-8 flex justify-center items-center gap-3 hover:opacity-95 active:scale-[0.98] transition-all shadow-soft"
            >
              {isProcessing ? (
                <span className="font-quicksand font-bold text-lg animate-pulse">
                  Sending your gift...
                </span>
              ) : (
                <>
                  <span className="font-quicksand font-bold text-lg">
                    Send Gift • ${cartTotal.toFixed(2)}
                  </span>
                  <span className="material-symbols-outlined text-[22px] fill">favorite</span>
                </>
              )}
            </button>
            <p className="text-center font-dm-sans text-xs text-outline">
              By clicking 'Send Gift', you agree to our Terms of Service & Privacy Policy.
            </p>
          </section>
        </>
      )}
    </main>
  );
}
