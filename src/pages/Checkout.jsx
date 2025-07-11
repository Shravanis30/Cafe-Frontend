import React, { useState, useEffect } from 'react';
import { useCart } from '../context/cartcontext';
import { useNavigate } from 'react-router-dom';
import LocationPopup from '../components/LocationPopup';

const Checkout = () => {
  const { cart } = useCart();
  const navigate = useNavigate();

  const [mode, setMode] = useState('dinein');
  const [tableNumber, setTableNumber] = useState('');
  const [address, setAddress] = useState({
    name: '',
    phone: '',
    fullAddress: '',
    pincode: '',
  });

  const [locationAllowed, setLocationAllowed] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [pendingOrder, setPendingOrder] = useState(false); // 🔁 Tracks order attempt after popup

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = 25;
  const delivery = mode === 'delivery' ? 20 : 0;
  const total = subtotal + tax + delivery;

  const isDeliveryValid =
    address.name.trim() &&
    address.phone.trim() &&
    address.fullAddress.trim() &&
    address.pincode.trim();

  const isDineInValid = tableNumber.trim();

  const handlePlaceOrder = () => {
    // For delivery, check if location permission granted
    if (mode === 'delivery' && locationAllowed !== true) {
      setShowPopup(true);
      setPendingOrder(true);
      return;
    }

    const estimatedTime = mode === 'dinein' ? '15–20 mins (Dine-In)' : '30–40 mins (Delivery)';
    const orderDetails = {
      items: cart,
      mode,
      tableNumber: mode === 'dinein' ? tableNumber : null,
      address: mode === 'delivery' ? address : null,
      subtotal,
      tax,
      delivery,
      total,
      estimatedTime,
    };

    navigate('/pay', { state: orderDetails });
  };

  // ✅ Automatically continue if allowed after popup
  useEffect(() => {
    if (pendingOrder && locationAllowed === true && !showPopup) {
      setPendingOrder(false); // reset
      handlePlaceOrder();
    }
  }, [locationAllowed, showPopup, pendingOrder]);

  return (
    <div className="min-h-screen bg-[#1e1a15] text-white p-4 relative">
      {/* Location Popup */}
      {showPopup && (
        <LocationPopup
          onAllow={() => {
            setLocationAllowed(true);
            setShowPopup(false);
          }}
          onDeny={() => {
            setLocationAllowed(false);
            setShowPopup(false); // Optional: dismiss popup on deny
          }}
        />
      )}

      <h2 className="text-xl font-bold mb-4">Checkout</h2>

      {/* Mode Selection */}
      <div className="flex items-center gap-4 mb-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="mode"
            value="delivery"
            checked={mode === 'delivery'}
            onChange={() => setMode('delivery')}
          />
          <span className="font-semibold">🚚 DELIVERY</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="mode"
            value="dinein"
            checked={mode === 'dinein'}
            onChange={() => setMode('dinein')}
          />
          <span className="text-orange-400 font-bold">🍽️ DINE-IN/TAKEAWAY</span>
        </label>
      </div>

      {/* Dine-In Input */}
      {mode === 'dinein' && (
        <div className="flex items-center gap-2 mb-6">
          <span className="text-orange-400 font-bold">🍽️ TABLE NO:</span>
          <input
            type="number"
            min="1"
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
            className="flex-1 p-2 rounded-md bg-white text-black outline-none"
            placeholder="Enter table number"
          />
        </div>
      )}

      {/* Delivery Inputs */}
      {mode === 'delivery' && (
        <div className="bg-[#2b2317] p-4 rounded-md mb-6 space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={address.name}
            onChange={(e) => setAddress({ ...address, name: e.target.value })}
            className="w-full p-2 rounded bg-white text-black"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={address.phone}
            onChange={(e) => setAddress({ ...address, phone: e.target.value })}
            className="w-full p-2 rounded bg-white text-black"
          />
          <textarea
            placeholder="Full Address"
            value={address.fullAddress}
            onChange={(e) => setAddress({ ...address, fullAddress: e.target.value })}
            className="w-full p-2 rounded bg-white text-black"
          />
          <input
            type="text"
            placeholder="Pincode"
            value={address.pincode}
            onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
            className="w-full p-2 rounded bg-white text-black"
          />
        </div>
      )}

      {/* Price Summary */}
      <div className="space-y-2 text-sm text-gray-300 mb-6">
        <div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal}</span></div>
        <div className="flex justify-between"><span>Tax</span><span>₹{tax}</span></div>
        <div className="flex justify-between"><span>Delivery</span><span>{delivery === 0 ? 'Free' : `₹${delivery}`}</span></div>
        <div className="flex justify-between font-bold text-white text-base mt-2">
          <span>Total</span><span>₹{total}</span>
        </div>
      </div>

      {/* Place Order */}
      <button
        onClick={handlePlaceOrder}
        disabled={(mode === 'dinein' && !isDineInValid) || (mode === 'delivery' && !isDeliveryValid)}
        className="w-full bg-yellow-400 text-black font-semibold py-3 rounded-full hover:bg-yellow-500 transition disabled:opacity-50"
      >
        Place Order
      </button>
    </div>
  );
};

export default Checkout;
