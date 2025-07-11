import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaMapMarkerAlt, FaUtensils, FaClock, FaHome, FaTruck } from 'react-icons/fa';

const Success = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-[#1e1a15]">
        <p>No order found. Please go back and place an order.</p>
      </div>
    );
  }

  const {
    items,
    mode,
    tableNumber,
    address,
    subtotal,
    tax,
    delivery,
    total,
    estimatedTime,
  } = state;

  return (
    <div className="min-h-screen bg-[#1e1a15] text-white px-4 py-8 flex items-center justify-center">
      <div className="bg-[#2a2219] max-w-md w-full p-6 rounded-xl shadow-2xl animate-fade-in-down">
        {/* Header */}
        <div className="text-center mb-6">
          <FaCheckCircle className="text-green-400 text-4xl mx-auto mb-2 animate-bounce" />
          <h2 className="text-2xl font-bold">Order Placed Successfully!</h2>
          <p className="text-green-300 font-medium mt-1 flex items-center justify-center gap-2">
            <FaClock /> {estimatedTime}
          </p>
        </div>

        {/* Order Details */}
        <div className="bg-[#1e1a15] rounded-lg p-4 mb-4 border border-yellow-500">
          <h3 className="text-lg font-semibold mb-3">🧾 Order Summary</h3>
          <ul className="text-sm space-y-1">
            {items.map((item, idx) => (
              <li key={idx} className="flex justify-between">
                <span>{item.name} × {item.quantity}</span>
                <span>₹{item.price * item.quantity}</span>
              </li>
            ))}
          </ul>

          <div className="border-t border-gray-600 mt-4 pt-3 space-y-1 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal}</span></div>
            <div className="flex justify-between"><span>Tax</span><span>₹{tax}</span></div>
            <div className="flex justify-between"><span>Delivery</span><span>{delivery === 0 ? 'Free' : `₹${delivery}`}</span></div>
            <div className="flex justify-between font-bold text-base mt-2">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>
        </div>

        {/* Mode Information */}
        {mode === 'dinein' && (
          <div className="bg-[#1e1a15] rounded-lg p-4 mb-4 border border-orange-400 text-sm">
            <p className="font-semibold text-orange-300 flex items-center gap-2">
              <FaUtensils /> Dine-In Table No: <span className="text-white">{tableNumber}</span>
            </p>
          </div>
        )}

        {mode === 'delivery' && (
          <div className="bg-[#1e1a15] rounded-lg p-4 mb-4 border border-blue-400 text-sm space-y-1">
            <p className="font-semibold text-blue-300 flex items-center gap-2"><FaMapMarkerAlt /> Delivery Address:</p>
            <p>👤 {address.name}</p>
            <p>📞 {address.phone}</p>
            <p>📍 {address.fullAddress}</p>
            <p>🏷️ {address.pincode}</p>
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-col gap-3 mt-6">
          {mode === 'delivery' && (
            <button
              onClick={() =>
                navigate('/track', {
                  state: {
                    orderMode: mode,
                    orderedItems: items,
                    estimatedTime,
                    address,
                    tableNumber,
                    total,
                  },
                })
              }
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-full flex items-center justify-center gap-2"
            >
              <FaTruck /> Track Order
            </button>
          )}
          <button
            onClick={() => navigate('/')}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 rounded-full flex items-center justify-center gap-2"
          >
            <FaHome /> Back to Home
          </button>
        </div>

        {/* Footer */}
        <p className="text-xs text-center text-gray-400 mt-6">
          © 2025 Cafe Cum Restaurant. Bon Appétit!
        </p>
      </div>
    </div>
  );
};

export default Success;
