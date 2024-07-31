import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 w-full fixed top-0">
      <div className="flex justify-between items-center mx-auto w-full px-4">
        <div className="text-white text-xl font-bold">MyApp</div>
        <div className="flex space-x-4">
          <a href="/login" className="text-white hover:text-gray-300">Login</a>
          <a href="/signup" className="text-white hover:text-gray-300">Sign Up</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
