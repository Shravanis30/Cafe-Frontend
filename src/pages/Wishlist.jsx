import React from 'react';
import { useWishlist } from '../context/wishlistcontext';
import { useNavigate } from 'react-router-dom';

const Wishlist = () => {
  const { wishlist, toggleWishlist } = useWishlist();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#1e1a15] text-white p-4">
      <h2 className="text-xl font-bold mb-4">My Wishlist</h2>

      {wishlist.length === 0 ? (
        <p className="text-center text-gray-400">Your wishlist is empty.</p>
      ) : (
        <div className="grid gap-4">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="bg-[#2a2217] p-4 rounded-lg flex items-center gap-4 cursor-pointer"
              onClick={() => navigate(`/item/${item.id}`)}
            >
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-400">₹{item.price}</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(item);
                }}
                className="text-red-500 text-xl"
              >
                ❤️
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
