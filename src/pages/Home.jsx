import React from 'react';

const Home = () => {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/free-photo/coffee-beans-top-view-white-background-space-text_176474-5028.jpg?semt=ais_hybrid&w=740')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-0" />

      {/* Centered Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4">
        <h1
          className="text-4xl md:text-6xl font-bold text-white drop-shadow-md animate-fadeInUp transition-opacity duration-700 ease-in-out"
          style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}
        >
          Welcome to Our Cafe
        </h1>
        <p
          className="text-lg md:text-xl text-white mt-4 max-w-md drop-shadow animate-fadeInUp transition-opacity duration-700 ease-in-out"
          style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}
        >
          Delicious coffee and tasty meals served fresh!
        </p>
      </div>
    </div>
  );
};

export default Home;
