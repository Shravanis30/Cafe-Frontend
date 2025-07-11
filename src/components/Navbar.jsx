import React, { useState } from 'react';
import { FaHome, FaBars, FaShoppingCart, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/cartcontext';

function Navbar() {
  const navigate = useNavigate();
  const [showAuthMenu, setShowAuthMenu] = useState(false);
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {/* Auth dropdown */}
      {showAuthMenu && (
        <div className="fixed top-16 right-4 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4 w-40 text-center space-y-3">
          <button
            onClick={() => {
              setShowAuthMenu(false);
              navigate('/login');
            }}
            className="block w-full bg-orange-500 text-white py-1 rounded hover:bg-orange-600"
          >
            Login
          </button>
          <button
            onClick={() => {
              setShowAuthMenu(false);
              navigate('/signup');
            }}
            className="block w-full bg-orange-500 text-white py-1 rounded hover:bg-orange-600"
          >
            Sign Up
          </button>
        </div>
      )}

      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-orange-100 shadow-md z-50">
        <div className="container mx-auto flex justify-between items-center px-4 py-2">
          {/* Logo */}
          <img
            src="https://i.pinimg.com/736x/9c/ad/5a/9cad5aba21bccddbdc5354bdf1935610.jpg"
            alt="Cafe Logo"
            className="w-10 h-10 object-contain rounded-full"
          />

          {/* Navigation icons */}
          <div className="flex gap-6 text-[#2d240f]">
            <button onClick={() => navigate('/')} className="flex flex-col items-center text-xs">
              <FaHome size={20} />
              <span>Home</span>
            </button>

            <button onClick={() => navigate('/menu')} className="flex flex-col items-center text-xs">
              <FaBars size={20} />
              <span>Menu</span>
            </button>

            <button onClick={() => navigate('/cart')} className="relative flex flex-col items-center text-xs">
              <FaShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
              <span>Cart</span>
            </button>

            <button onClick={() => setShowAuthMenu(!showAuthMenu)} className="flex flex-col items-center text-xs">
              <FaUser size={20} />
              <span>Profile</span>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
