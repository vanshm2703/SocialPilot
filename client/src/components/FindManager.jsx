import React, { useState } from 'react';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import VerifiedIcon from '@mui/icons-material/Verified';
import StarIcon from '@mui/icons-material/Star';

const mockManagers = [
  {
    id: 1,
    name: 'Sarah Johnson',
    rating: 5,
    completedProjects: 24,
    lastProject: '2024-02-15',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
  },
  {
    id: 2,
    name: 'Michael Chen',
    rating: 4.8,
    completedProjects: 18,
    lastProject: '2024-02-10',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
  },
];

export default function FindManager() {
  const [selectedManager, setSelectedManager] = useState(null); // state to hold the selected manager
  const [isPopupVisible, setIsPopupVisible] = useState(false); // state to control popup visibility

  // Function to handle the "Hire" button click
  const handleHireClick = (manager) => {
    setSelectedManager(manager); // Set the selected manager
    setIsPopupVisible(true); // Show the popup
  };

  // Function to close the popup
  const handleClosePopup = () => {
    setIsPopupVisible(false); // Hide the popup
  };

  return (
    <div className="flex relative overflow-hidden">
      {/* Main Content */}
      <main className="flex-1 ml-8 z-10">
        {/* Manager Cards */}
        <div className="space-y-6">
          <h1 className="text-2xl font-bold text-white">Available Managers</h1>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mockManagers.map((manager) => (
              <div
                key={manager.id}
                className="bg-gray-800 border border-gray-400/50 rounded-lg shadow-md overflow-hidden p-6"
              >
                <div className="flex items-center">
                  <img
                    src={manager.avatar}
                    alt={manager.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <h2 className="text-lg font-semibold text-gray-100">{manager.name}</h2>
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(manager.rating)
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          }`}
                          fill="currentColor"
                        >
                          <path d="M12 2l4 4h-3v6h-2V6H8l4-4z" />
                        </svg>
                      ))}
                      <span className="ml-2 text-sm text-gray-600">{manager.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center text-gray-300">
                    <span>
                      <VerifiedIcon className="text-green-400" /> Projects Completed
                    </span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <span>
                      <CalendarMonthIcon /> &nbsp;Last Project: {manager.lastProject}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleHireClick(manager)} // Pass manager data to the function
                  className="mt-6 w-full font-semibold flex items-center justify-center px-4 py-2 border border-white text-white duration-500 rounded-md hover:bg-white hover:text-black cursor-pointer transition-colors"
                >
                  Collaborate 
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>


{/* AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA */}
{isPopupVisible && selectedManager && (
  <div className="fixed inset-0 z-50 bg-black/50 bg-opacity-50 flex justify-center items-center">
    <div className="bg-gray-800 p-8 rounded-lg shadow-xl max-w-4xl w-full relative">
      {/* Close Button */}
      <button
        onClick={handleClosePopup}
        className="absolute top-4 right-4 px-4 p-2 bg-gray-800 border border-gray-500 text-white rounded-full"
      >
        X
      </button>

      {/* Popup Heading */}
      <h2 className="text-2xl font-bold text-center text-gray-100 mb-6">Manager Overview</h2>

      {/* Manager Information Section */}
      <div className="bg-gray-800 border border-gray-500 rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center mb-6">
          <img
            src={selectedManager.avatar}
            alt={selectedManager.name}
            className="h-12 w-12 rounded-full object-cover"
          />
          <div className="ml-4">
            <h2 className="text-lg font-semibold text-gray-100">{selectedManager.name}</h2>
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon
                key={i}
                className={`h-4 w-4 ${i < Math.floor(selectedManager.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                style={{ fontSize: 20 }} // Optional, adjust the size of the icon
              />
              ))}
              <span className="ml-2 text-sm text-gray-600">{selectedManager.rating}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex items-center text-gray-300">
            <span>
              <VerifiedIcon className="text-green-400" /> Projects Completed
            </span>
          </div>
          <div className="flex items-center text-gray-300">
            <span>
              <CalendarMonthIcon /> &nbsp;Last Project: {selectedManager.lastProject}
            </span>
          </div>
        </div>
      </div>

      {/* Project Title Section */}
      <div className="mb-6">
        <label className="text-gray-100 text-lg font-semibold" htmlFor="projectTitle">Project Title:</label>
        <input
          type="text"
          id="projectTitle"
          placeholder="Enter your project title"
          className="w-full mt-2 p-3 bg-gray-700 border border-gray-600 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Project Description Section */}
      <div className="mb-6">
        <label className="text-gray-100 text-lg font-semibold" htmlFor="projectDescription">Enter Project Information:</label>
        <textarea
          id="projectDescription"
          rows="4"
          placeholder="Provide a brief description of your project"
          className="w-full mt-2 p-3 bg-gray-700 border border-gray-600 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Social Media Checkboxes */}
      <div className="flex justify-center space-x-6 mb-6">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="linkedin"
            className="mr-2"
          />
          <label htmlFor="linkedin" className="text-gray-100">LinkedIn</label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="twitter"
            className="mr-2"
          />
          <label htmlFor="twitter" className="text-gray-100">Twitter</label>
        </div>
      </div>

      {/* Hire Button */}
      <button className="mt-4 w-full font-semibold flex items-center rounded-lg justify-center px-4 py-2 border text-black border-white hover:text-white bg-white hover:bg-black duration-500 cursor-pointer transition-colors">
      Collaborate
      </button>
    </div>
  </div>
)}





    </div>
  );
}
