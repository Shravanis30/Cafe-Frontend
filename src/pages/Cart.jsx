// src/pages/Cart.jsx
import React, { useState } from 'react';
import { useCart } from '../context/cartcontext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Cart = () => {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const navigate = useNavigate();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = 25;
  const delivery = 0;
  const total = subtotal + tax + delivery;

  const decreaseQuantity = (item) => {
    if (item.quantity > 1) {
      addToCart(item, item.quantity - 1);
    } else {
      removeFromCart(item.id);
    }
  };

  const increaseQuantity = (item) => {
    addToCart(item, item.quantity + 1);
  };

  return (
    <div className="min-h-screen bg-[#1e1a15] text-white p-4 pb-40">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button onClick={() => navigate(-1)}>←</button>
        <h2 className="text-lg font-bold">My Cart</h2>
        <button
          onClick={() => {
            if (window.confirm('Are you sure you want to clear your cart?')) {
              clearCart();
              toast.success('Cart cleared successfully');
            }
          }}
          className="text-xl"
          title="Clear Cart"
        >
          🗑️
        </button>
      </div>

      {/* Cart Items */}
      {cart.length === 0 ? (
        <p className="text-center text-gray-400 mt-20">Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item, index) => (
            <div key={index} className="flex justify-between items-start mb-6">
              <div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-sm text-yellow-500 mb-1"
                >
                  Remove
                </button>
                <h3 className="font-semibold">{item.name}</h3>
                {item.addons?.length > 0 && (
                  <p className="text-sm text-gray-300">
                    + {item.addons.join(', ')}
                  </p>
                )}

                {/* Price + Quantity Buttons */}
                <div className="mt-2 inline-flex items-center gap-3 bg-[#3c331f] px-4 py-1 rounded-full text-sm">
                  <button
                    onClick={() => decreaseQuantity(item)}
                    className="px-2 py-1 text-white bg-gray-600 rounded-full"
                  >
                    −
                  </button>
                  <span className="font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(item)}
                    className="px-2 py-1 text-white bg-gray-600 rounded-full"
                  >
                    +
                  </button>
                  <span className="ml-3">₹{item.price * item.quantity}</span>
                </div>
              </div>

              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-xl"
              />
            </div>
          ))}

          {/* Promo Code */}
          <div className="mb-6">
            <h4 className="mb-1">Have a promo code?</h4>
            <div className="flex gap-2">
              <input
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Enter code"
                className="flex-1 bg-transparent border border-gray-600 px-4 py-2 rounded-md text-sm focus:outline-none"
              />
              <button className="bg-[#4e4324] px-4 py-2 rounded-md text-sm">
                Apply
              </button>
            </div>
          </div>

          {/* Totals */}
          <div className="space-y-2 text-sm text-gray-300 mb-6">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>₹{tax}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery</span>
              <span>{delivery === 0 ? 'Free' : `₹${delivery}`}</span>
            </div>
            <div className="flex justify-between font-bold text-white text-base mt-2">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>

          {/* Checkout Button */}
          <button
            onClick={() => navigate('/checkout')}
            className="w-full bg-yellow-400 text-black font-semibold py-3 rounded-full hover:bg-yellow-500 transition"
          >
            Proceed to Checkout
          </button>

          
        </>
      )}
    </div>
  );
};

export default Cart;
