import React, { useState, useEffect } from 'react';

const SuccessMessage = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Close after 3 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="bg-green-500 text-white font-bold py-4 px-8 rounded-lg shadow-lg transform transition-all duration-500 ease-in-out animate-bounce">
        {message}
      </div>
    </div>
  );
};

export default SuccessMessage;
