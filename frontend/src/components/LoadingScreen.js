import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 via-indigo-500 to-blue-500">
      <div className="flex flex-col items-center space-y-6">
        {/* Updated Spinner */}
        <div className="w-16 h-16 border-8 border-t-8 border-solid border-white border-opacity-20 rounded-full animate-spin"></div>
        
        {/* Loading Text */}
        <h1 className="text-white text-4xl font-semibold animate-pulse">Loading...</h1>
        
        {/* Subtext */}
        <p className="text-white text-lg font-light animate-pulse text-center">We’re setting things up for you, please be patient!</p>
        
        {/* Additional subtle animation */}
        <div className="w-32 h-1 bg-white opacity-30 animate-pulse"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
