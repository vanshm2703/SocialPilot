import React from 'react';

const Notification = () => {
  return (
    <div className="flex flex-col gap-6 p-6">
        <h1 className="font-bold">New Notifications</h1>
      {/* Card 1 */}
      <div className="flex bg-gray-800 border border-gray-500/50 text-white p-6 rounded-lg shadow-xl items-center justify-between hover:scale-102 transition-all duration-300">
        <div>
          <h3 className="font-semibold text-xl text-white">Client Name: John Doe</h3>
          <p className="text-sm text-gray-400">Project Title: Web Design</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-red-900/30 border-1  border-red-700 cursor-pointer text-white font-semibold px-5 py-3 rounded-lg hover:bg-red-700 focus:ring-4  transition transform hover:scale-105">
            Reject
          </button>
          <button className="bg-green-900/40 border-1 border-green-700 cursor-pointer text-white font-semibold px-5 py-3 rounded-lg hover:bg-green-700 focus:ring-4  transition transform hover:scale-105">
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notification;
