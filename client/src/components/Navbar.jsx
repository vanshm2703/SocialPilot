import React from 'react';

const Navbar = () => {
  return (
    <div className="z-50 fixed top-0 left-0 w-full h-20 bg-black/0 bg-opacity-70 backdrop-blur-lg flex items-center justify-between px-4"> 
      <div className="ml-10 text-white font-bold text-xl">
        MyApp
      </div>
 
      <div className="space-x-4 mr-10">
        <button className="text-white hover:bg-gray-700 px-4 py-2 rounded-md">Features</button>
        <button className="text-white hover:bg-gray-700 px-4 py-2 rounded-md">Contact</button>
        <button className="text-white hover:bg-blue-500 px-4 py-2 rounded-md">Signup</button>
      </div>
    </div>
  );
};

export default Navbar;
