import React, { createContext, useState, useEffect } from 'react';

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [locationAllowed, setLocationAllowed] = useState(null); // null = not asked
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const storedPermission = localStorage.getItem('locationPermission');
    if (storedPermission === 'granted') setLocationAllowed(true);
    else if (storedPermission === 'denied') setLocationAllowed(false);
  }, []);

  const requestLocation = () => {
    setShowPopup(true);
  };

  const allowLocation = () => {
    setLocationAllowed(true);
    localStorage.setItem('locationPermission', 'granted');
    setShowPopup(false);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => console.log('📍 Location:', position.coords),
        (err) => console.warn('⚠️ Error fetching location', err)
      );
    }
  };

  const denyLocation = () => {
    setLocationAllowed(false);
    localStorage.setItem('locationPermission', 'denied');
    setShowPopup(false);
  };

  return (
    <LocationContext.Provider value={{ locationAllowed, requestLocation, allowLocation, denyLocation, showPopup, setShowPopup }}>
      {children}
    </LocationContext.Provider>
  );
};
