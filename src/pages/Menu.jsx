import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import menuItems from '../data/menu';
import { FaStar, FaSearch } from 'react-icons/fa';
import { useCart } from '../context/cartcontext';
import toast from 'react-hot-toast';

const categories = ['All', 'Coffee', 'Main Dish', 'Snacks', 'Desserts'];

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const filteredByCategory =
    selectedCategory === 'All'
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  const filteredBySearch = filteredByCategory.filter((item) => {
    const lowerQuery = searchQuery.toLowerCase();
    return (
      item.name.toLowerCase().includes(lowerQuery) ||
      item.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
    );
  });

  const filteredByAvailability = showAvailableOnly
    ? filteredBySearch.filter((item) => item.available)
    : filteredBySearch;

  const finalFilteredItems = [...filteredByAvailability].sort((a, b) => {
    if (sortOption === 'priceLow') return a.price - b.price;
    if (sortOption === 'priceHigh') return b.price - a.price;
    if (sortOption === 'ratingHigh') return b.rating - a.rating;
    return 0;
  });

  const handleAddToCart = (item) => {
    if (!item.available) {
      toast.error('Item is currently out of stock!');
      return;
    }

    addToCart(item);
    toast.success(`${item.name} added to cart!`);
  };

  return (
    <div className="p-4 pb-28 bg-[#fef9f6] min-h-screen">
      <h2 className="text-2xl font-bold text-center mb-4 text-[#3c2c1e]">
        🍽️ Browse Our Menu
      </h2>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search by name or tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 pl-10 border rounded-full shadow-sm 
                       text-[#3c2c1e] placeholder-gray-400 
                       focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
          <FaSearch className="absolute top-2.5 left-3 text-gray-400" />
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-1.5 text-sm rounded-full border transition duration-300 ${
                selectedCategory === category
                  ? 'bg-[#ff6b00] text-white border-transparent'
                  : 'bg-white text-[#3c2c1e] border-gray-300 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {/* Availability Toggle */}
          <label className="flex items-center text-sm text-gray-700 gap-2">
            <input
              type="checkbox"
              checked={showAvailableOnly}
              onChange={(e) => setShowAvailableOnly(e.target.checked)}
              className="accent-orange-600"
            />
            Available Only
          </label>

          {/* Sort Dropdown */}
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="px-3 py-2 border rounded-md text-sm shadow-sm text-black bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-300"
          >
            <option value="">Sort By</option>
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
            <option value="ratingHigh">Rating: High to Low</option>
          </select>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {finalFilteredItems.map((item) => (
          <div
            key={item.id}
            className={`relative bg-white rounded-2xl overflow-hidden shadow-md transition hover:shadow-xl duration-300 ${
              !item.available ? 'opacity-60' : 'cursor-pointer'
            }`}
            onClick={() => navigate(`/menu/${item.id}`)}
          >
            <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />

            <div className="p-4 flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg text-[#3c2c1e]">{item.name}</h3>
                <span className="text-orange-600 font-bold text-sm">₹{item.price}</span>
              </div>

              <div className="flex items-center gap-1 text-yellow-500 text-sm">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={i < Math.floor(item.rating) ? 'fill-current' : 'text-gray-300'}
                  />
                ))}
                <span className="text-gray-500 ml-1">({item.rating})</span>
              </div>

              <div className="flex flex-wrap gap-1">
                {item.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-orange-100 text-orange-700 text-xs px-2 py-0.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent card click navigation
                  handleAddToCart(item);
                }}
                className="mt-2 w-full bg-[#ff6b00] text-white py-1.5 text-sm font-medium rounded-full hover:bg-[#e25800] transition disabled:opacity-50"
                disabled={!item.available}
              >
                {item.available ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {finalFilteredItems.length === 0 && (
        <p className="text-center text-gray-500 mt-10">No items found.</p>
      )}
    </div>
  );
};

export default Menu;
