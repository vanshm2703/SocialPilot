import React from 'react';
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="z-50 fixed top-0 left-0 w-full h-20 bg-black/0 bg-opacity-70 backdrop-blur-lg flex items-center justify-between px-4"> 
      <div className="ml-10 text-white font-bold text-xl">
        Social Pilot
      </div>
 
      <div className="space-x-4 mr-10">
      <Link to="/features">
  <button className="text-white bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-md">
    Features
  </button>
</Link>
        <button className="text-white hover:bg-gray-700 px-4 py-2 rounded-md">Contact</button>
        <Link to="/register">
  <button className="text-white bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-md">
    Signup
  </button>
</Link>
      </div>
    </div>
  );
};

export default Navbar;
