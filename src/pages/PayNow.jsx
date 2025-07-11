import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCreditCard, FaMoneyBillWave, FaMobileAlt } from 'react-icons/fa';

const PayNow = () => {
  const { state } = useLocation(); // order data
  const navigate = useNavigate();

  const [paymentMode, setPaymentMode] = useState('upi');
  const [upiId, setUpiId] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState('');

  const handleVerify = () => {
    const upiRegex = /^[\w.-]+@[\w.-]+$/;
    if (upiRegex.test(upiId)) {
      setIsVerified(true);
      setError('');
    } else {
      setError('Invalid UPI ID. Format: name/phone@bankname');
      setIsVerified(false);
    }
  };

  const handlePay = () => {
    if (paymentMode === 'upi' && !isVerified) {
      setError('Please verify a valid UPI ID first.');
      return;
    }
    navigate('/success', { state: { ...state, paymentMode } });
  };

  return (
    <div className="min-h-screen bg-[#fffbe6] flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-xl p-6 max-w-md w-full border-t-4 border-green-500 space-y-4 animate-fade-in">
        <h2 className="text-xl font-bold text-gray-800 mb-2">💰 Select Payment Method</h2>

        {/* Payment Mode Tabs */}
        <div className="flex justify-between border rounded overflow-hidden text-sm font-medium text-gray-700">
          <button
            className={`flex-1 py-2 px-4 text-center ${
              paymentMode === 'upi' ? 'bg-green-100 font-bold' : 'bg-gray-100'
            }`}
            onClick={() => setPaymentMode('upi')}
          >
            <FaMobileAlt className="inline mr-1" />
            UPI
          </button>
          <button
            className={`flex-1 py-2 px-4 text-center ${
              paymentMode === 'card' ? 'bg-green-100 font-bold' : 'bg-gray-100'
            }`}
            onClick={() => setPaymentMode('card')}
          >
            <FaCreditCard className="inline mr-1" />
            Card
          </button>
          <button
            className={`flex-1 py-2 px-4 text-center ${
              paymentMode === 'cod' ? 'bg-green-100 font-bold' : 'bg-gray-100'
            }`}
            onClick={() => setPaymentMode('cod')}
          >
            <FaMoneyBillWave className="inline mr-1" />
            COD
          </button>
        </div>

        {/* UPI Payment */}
        {paymentMode === 'upi' && (
          <div>
            <label className="block font-semibold text-gray-800 mb-1">
              <FaMobileAlt className="inline mr-1 text-blue-500" />
              Other UPI Apps
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Enter UPI ID"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className="flex-1 p-2 border rounded text-sm"
              />
              <button
                onClick={handleVerify}
                className="bg-yellow-400 px-4 py-2 rounded hover:bg-yellow-500 font-medium"
              >
                Verify
              </button>
            </div>
            <p className="text-xs text-gray-500">Format: name/phone@bankname</p>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            {isVerified && <p className="text-green-600 text-sm font-semibold mt-1">✅ Verified</p>}
          </div>
        )}

        {/* Card Info (Mock) */}
        {paymentMode === 'card' && (
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Card Number"
              className="w-full p-2 rounded border text-sm"
            />
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="MM/YY"
                className="w-1/2 p-2 rounded border text-sm"
              />
              <input
                type="text"
                placeholder="CVV"
                className="w-1/2 p-2 rounded border text-sm"
              />
            </div>
            <input
              type="text"
              placeholder="Cardholder Name"
              className="w-full p-2 rounded border text-sm"
            />
          </div>
        )}

        {/* COD Info */}
        {paymentMode === 'cod' && (
          <div className="text-sm text-gray-600 bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded">
            You’ll pay the amount on delivery. Make sure your phone is reachable.
          </div>
        )}

        <button
          onClick={handlePay}
          className="w-full bg-green-500 text-white font-semibold py-3 rounded-md hover:bg-green-600 transition"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default PayNow;
