import React, { useEffect } from 'react';

const LocationPopup = ({ onAllow, onDeny }) => {
  // Close popup with ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onDeny();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onDeny]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl w-[90%] max-w-sm p-6 text-center shadow-2xl animate-fadeIn">
        <h2 className="text-lg font-semibold mb-2 text-gray-900">
          Allow Location Access?
        </h2>
        <p className="text-sm text-gray-600 mb-6 leading-relaxed">
          We’ll use your location to provide delivery estimates, route mapping, and nearby search results. Your location will only be used while using the app.
        </p>
        <div className="flex justify-around border-t pt-4 space-x-4">
          <button
            onClick={onDeny}
            className="text-blue-600 font-medium px-4 py-2 hover:underline"
          >
            Don’t Allow
          </button>
          <button
            onClick={onAllow}
            className="text-blue-600 font-medium px-4 py-2 hover:underline"
          >
            Allow
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationPopup;
