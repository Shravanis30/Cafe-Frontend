import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { WishlistProvider } from './context/wishlistcontext'; // ✅ Wishlist context
import { CartProvider } from './context/cartcontext'; // ✅ Cart context
import { Toaster } from 'react-hot-toast'; // ✅ Toast notifications

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider>
      <WishlistProvider> {/* ✅ Wrap App to enable wishlist everywhere */}
        <App />
        <Toaster position="top-center" reverseOrder={false} />
      </WishlistProvider>
    </CartProvider>
  </React.StrictMode>
);
