import React, { useState, useEffect } from "react";
import Profile from "./Profile";  // Import the Profile component
import FindManager from "./FindManager";  // Import the FindManager component
import PastProjects from "./PastProjects";  // Import the PastProjects component (you will need to create this)
import { useNavigate } from "react-router-dom";
import Notification from "./Manager/Notification";

const Dashboard = () => {
  const [activePage, setActivePage] = useState("profile");  // State to manage active page
  const [activeSidebarItem, setActiveSidebarItem] = useState("profile");  // State to track active sidebar item
  const [role, setRole] = useState("");  // State to hold the role

  useEffect(() => {
    // Retrieve the role from localStorage
    const storedRole = localStorage.getItem("role");
    console.log(storedRole)
    setRole(storedRole);
  }, []);

  const navigate = useNavigate();
  // Handle sidebar item click
  const handleSidebarClick = (page, item) => {
    setActivePage(page);  // Change the active page content
    setActiveSidebarItem(item);  // Change the active sidebar item
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login')
  }

  // If the role is 'manager', render only the background shapes
  // if (role === "manager") {
  //   return (
  //     <div className="bg-gray-900 text-white min-h-screen p-6 flex relative overflow-hidden">
  //       {/* Background shapes */}
  //       <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-gradient-to-br from-pink-500 via-yellow-500 to-blue-500 opacity-30 blur-2xl"></div>
  //       <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-t from-purple-600 via-indigo-500 to-blue-500 opacity-30 blur-3xl"></div>
  //       <div className="absolute top-1/4 right-0 w-80 h-80 rounded-full bg-gradient-to-br from-teal-500 to-green-400 opacity-20 blur-xl"></div>
  //       <div className="absolute bottom-0 left-1/2 w-60 h-60 rounded-full bg-gradient-to-bl from-indigo-500 via-purple-600 to-pink-500 opacity-25 blur-lg"></div>
  //       <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full bg-gradient-to-br from-yellow-500 to-red-500 opacity-40 blur-2xl"></div>
  //       <div className="absolute top-1/3 right-1/4 w-56 h-56 rounded-full bg-gradient-to-tl from-blue-400 to-purple-600 opacity-30 blur-xl"></div>
  //     </div>
  //   );
  // }

  return (
    <>
    {(role === "User") ? (<div className="bg-gray-900 text-white min-h-screen p-6 flex relative overflow-hidden">
      {/* Background shapes */}
      <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-gradient-to-br from-pink-500 via-yellow-500 to-blue-500 opacity-30 blur-2xl"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-t from-purple-600 via-indigo-500 to-blue-500 opacity-30 blur-3xl"></div>
      <div className="absolute top-1/4 right-0 w-80 h-80 rounded-full bg-gradient-to-br from-teal-500 to-green-400 opacity-20 blur-xl"></div>
      <div className="absolute bottom-0 left-1/2 w-60 h-60 rounded-full bg-gradient-to-bl from-indigo-500 via-purple-600 to-pink-500 opacity-25 blur-lg"></div>
      <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full bg-gradient-to-br from-yellow-500 to-red-500 opacity-40 blur-2xl"></div>
      <div className="absolute top-1/3 right-1/4 w-56 h-56 rounded-full bg-gradient-to-tl from-blue-400 to-purple-600 opacity-30 blur-xl"></div>

      {/* Sidebar */}
      <aside className="w-72 bg-gray-800 border border-gray-500 p-6 rounded-xl shadow-lg z-10">
        <h2 className="text-2xl font-extrabold mb-6 text-white">SocialPilot</h2>
        <input className="w-full p-3 mb-6 bg-gray-700 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Search the docs..." />
        <nav>
          <h3 className="text-gray-400 text-xs uppercase font-semibold mb-3">Overview</h3>
          <ul>
            <li 
              onClick={() => handleSidebarClick("profile", "profile")}
              className={`cursor-pointer p-2 rounded-lg font-bold text-md ${activeSidebarItem === "profile" ? "bg-gray-600/70" : "bg-gray-700/50 hover:text-blue-400"}`}>
              Profile
            </li>
          </ul>
          <h3 className="text-gray-400 uppercase text-xs font-semibold mt-6">Manage Account</h3>
          <ul className="space-y-3 pt-2 text-md">
            <li
              onClick={() => handleSidebarClick("findManager", "findManager")}
              className={`cursor-pointer p-2 border-none rounded-lg font-semibold ${activeSidebarItem === "findManager" ? "bg-gray-600/70" : "bg-gray-800 hover:text-blue-400"}`}>
              Search for Managers
            </li>
            <div className="w-full border-b-1 border-b-gray-200/30"></div>
            <li
              onClick={() => handleSidebarClick("pastProjects", "pastProjects")}
              className={`cursor-pointer p-2 border-none rounded-lg font-semibold ${activeSidebarItem === "pastProjects" ? "bg-gray-600/70" : "bg-gray-800 hover:text-blue-400"}`}>
              Your Projects
            </li>
            <div className="w-full border-b-1 border-b-gray-200/30"></div>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-8 z-10">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold">Manage Social Media</h1>
          <button onClick={handleLogout} className="bg-red-600 cursor-pointer px-5 py-3 rounded-lg font-semibold hover:bg-red-700 transition">
            Log out
          </button>
        </header>

        {/* Render different components based on activePage */}
        {activePage === "profile" ? (
          <Profile />  // Render Profile component when activePage is "profile"
        ) : activePage === "findManager" ? (
          <FindManager />  // Render FindManager component when activePage is "findManager"
        ) : activePage === "pastProjects" ? (
          <PastProjects />  // Render PastProjects component when activePage is "pastProjects"
        ) : null}
      </main>
    </div>) : (<><div className="bg-gray-900 text-white min-h-screen p-6 flex relative overflow-hidden">
        {/* Background shapes */}
        <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-gradient-to-br from-pink-500 via-yellow-500 to-blue-500 opacity-30 blur-2xl"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-t from-purple-600 via-indigo-500 to-blue-500 opacity-30 blur-3xl"></div>
        <div className="absolute top-1/4 right-0 w-80 h-80 rounded-full bg-gradient-to-br from-teal-500 to-green-400 opacity-20 blur-xl"></div>
        <div className="absolute bottom-0 left-1/2 w-60 h-60 rounded-full bg-gradient-to-bl from-indigo-500 via-purple-600 to-pink-500 opacity-25 blur-lg"></div>
        <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full bg-gradient-to-br from-yellow-500 to-red-500 opacity-40 blur-2xl"></div>
        <div className="absolute top-1/3 right-1/4 w-56 h-56 rounded-full bg-gradient-to-tl from-blue-400 to-purple-600 opacity-30 blur-xl"></div>
        <aside className="w-72 bg-gray-800 border border-gray-500 p-6 rounded-xl shadow-lg z-10">
        <h2 className="text-2xl font-extrabold mb-6 text-white">SocialPilot</h2>
        <input className="w-full p-3 mb-6 bg-gray-700 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Search the docs..." />
        <nav>
          <h3 className="text-gray-400 text-xs uppercase font-semibold mb-3">Overview</h3>
          <ul>
            <li 
              onClick={() => handleSidebarClick("profile", "profile")}
              className={`cursor-pointer p-2 rounded-lg font-bold text-md ${activeSidebarItem === "profile" ? "bg-gray-600/70" : "bg-gray-700/50 hover:text-blue-400"}`}>
              Profile
            </li>
          </ul>
          <h3 className="text-gray-400 uppercase text-xs font-semibold mt-6">Manage Account</h3>
          <ul className="space-y-3 pt-2 text-md">
            <li
              onClick={() => handleSidebarClick("notification", "notification")}
              className={`cursor-pointer p-2 border-none rounded-lg font-semibold ${activeSidebarItem === "notification" ? "bg-gray-600/70" : "bg-gray-800 hover:text-blue-400"}`}>
              Notifications
            </li>
            <div className="w-full border-b-1 border-b-gray-200/30"></div>
            <li
            onClick={() => handleSidebarClick("postit", "postit")}
            className={`cursor-pointer p-2 border-none rounded-lg font-semibold ${activeSidebarItem === "postit" ? "bg-gray-600/70" : "bg-gray-800 hover:text-blue-400"}`}>
              Post Management
            </li>
            <div className="w-full border-b-1 border-b-gray-200/30"></div>
            <li
              onClick={() => handleSidebarClick("pastProjects", "pastProjects")}
              className={`cursor-pointer p-2 border-none rounded-lg font-semibold ${activeSidebarItem === "pastProjects" ? "bg-gray-600/70" : "bg-gray-800 hover:text-blue-400"}`}>
              Your Projects
            </li>
            <div className="w-full border-b-1 border-b-gray-200/30"></div>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-8 z-10">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold">Manage Social Media</h1>
          <button onClick={handleLogout} className="bg-red-600 cursor-pointer px-5 py-3 rounded-lg font-semibold hover:bg-red-700 transition">
            Log out
          </button>
        </header>


        {activePage === "profile" ? (
          <Profile />  // Render Profile component when activePage is "profile"
        ) : activePage === "notification" ? (
          <Notification />  // Render FindManager component when activePage is "findManager"
        ) : activePage === "pastProjects" ? (
          <PastProjects />  // Render PastProjects component when activePage is "pastProjects"
        ) : activePage === "postit" ? (
          <h1>POST IT</h1>
        ) : null}

        
        </main>
      </div>
      
      </>
    
    )}
    
    </>
    
  );
};

export default Dashboard;
