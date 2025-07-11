import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import menuItems from '../data/menu';
import { useCart } from '../context/cartcontext';
import toast from 'react-hot-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = menuItems.find((item) => item.id === parseInt(id));
  const { addToCart } = useCart();

  const defaultOption = product?.customOptions?.[0] || '1 Kg';
  const [selectedOption, setSelectedOption] = useState(defaultOption);
  const [message, setMessage] = useState('');

  if (!product) {
    return (
      <div className="text-center text-gray-600 py-20">
        <p className="text-xl">Product not found.</p>
        <button
          onClick={() => navigate('/menu')}
          className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-full"
        >
          Back to Menu
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    const cartItem = {
      ...product,
      option: selectedOption,
      message,
      cartKey: `${product.id}-${selectedOption}`,
    };
    addToCart(cartItem);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="flex flex-col md:flex-row bg-[#fdfdfd] p-6 md:p-10 rounded-lg shadow-xl max-w-6xl mx-auto my-8">
      {/* Left - Image */}
      <div
        className="w-full md:w-1/2 h-[300px] md:h-[500px] bg-cover bg-center rounded-lg"
        style={{ backgroundImage: `url(${product.image})` }}
      ></div>

      {/* Right - Details */}
      <div className="w-full md:w-1/2 mt-6 md:mt-0 md:pl-10 space-y-4 text-gray-800">
        <h2 className="text-3xl font-bold">{product.name}</h2>

        {/* Rating */}
        <div className="flex items-center text-yellow-500">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={`text-2xl ${i < Math.floor(product.rating) ? '' : 'text-gray-300'}`}
            />
          ))}
          <span className="ml-2 text-sm text-gray-600">({product.rating})</span>
        </div>

        {/* Price */}
        <div className="text-2xl font-semibold">
          ₹{product.price}/-{' '}
          <span className="text-sm text-gray-500">(Inclusive of GST)</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {product.tags.map((tag, i) => (
            <span
              key={i}
              className="bg-orange-100 text-orange-700 text-xs px-3 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Option Selection (Size/Strength/Weight) */}
        {product.customOptions && (
          <div>
            <p className="font-medium text-lg mb-2">Select Option</p>
            <div className="flex flex-wrap gap-3">
              {product.customOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => setSelectedOption(option)}
                  className={`px-4 py-2 border rounded-full font-semibold ${
                    selectedOption === option
                      ? 'bg-orange-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-orange-100'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Message */}
        <div>
          <p className="font-medium text-lg mb-1">Give Your Feedback</p>
          <input
            type="text"
            placeholder="Enter message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* In Our Chef's Word */}
        {product.chefWord && (
          <div className="bg-orange-50 p-4 rounded">
            <p className="text-lg font-bold mb-1">In Our Chef's Word</p>
            <p className="text-sm text-gray-700">{product.chefWord}</p>
          </div>
        )}

        {/* Product Description */}
        {product.description && (
          <div>
            <p className="text-lg font-bold mt-4 mb-1">Product Description</p>
            <p className="text-sm text-gray-700">{product.description}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4 mt-6">
          <button
            onClick={handleAddToCart}
            className="bg-orange-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-orange-700 transition"
          >
            Add To Cart
          </button>
          <button
            onClick={() => {
              handleAddToCart();
              navigate('/checkout');
            }}
            className="bg-green-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-700 transition"
          >
            Buy Now | ₹{product.price}/-
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;