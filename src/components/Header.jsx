// src/components/Header.jsx
import React from 'react';
import logo from './assets/logo.jpg'; // adjust path based on your structure

const Header = () => {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white shadow-md">
      <div className="flex items-center gap-2">
        <img src={logo} alt="Café Logo" className="w-10 h-10 object-contain rounded-full" />
        <h1 className="text-xl font-bold text-[#4b2e05]">Café App</h1>
      </div>
    </header>
  );
};

export default Header;
