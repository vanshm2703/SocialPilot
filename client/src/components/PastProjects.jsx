import React, { useEffect, useRef, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import ChatIcon from "@mui/icons-material/Chat";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';

const PastProjects = () => {
  const chatRef = useRef(null);
  const { teacherName } = useParams();
  const { state } = useLocation();
  const { img } = state || {};
  const navigate = useNavigate();

  const [isChatPanelOpen, setIsChatPanelOpen] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorLink, setErrorLink] = useState("");

  // State to manage visibility of the ProjectOverview pop-up
  const [isProjectOverviewVisible, setIsProjectOverviewVisible] =
    useState(false);

  useEffect(() => {
    chatRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [newMessage]);

  const [message, setMessage] = useState([
    {
      You: "Hello! I have a question about your course.",
      Teacher: "Sure! What would you like to know?",
    },
    {
      You: "I would like to know the prerequisites to join your lectures.",
      Teacher:
        "Sure! The prerequisites are basic maths you learned in your previous standards and a healthy attitude to learn.",
    },
    {
      You: "What topics will be covered in the course?",
      Teacher:
        "The course will cover algebra, calculus, probability, and some advanced topics in statistics.",
    },
  ]);

  const ignoreLinks = ["www.meet", "www.zoom"];

  function checkIgnoreLinks(check) {
    const words = check.split(" ");
    const result = words.map((word) => {
      const matchedLink = ignoreLinks.find((link) => word.startsWith(link));
      setErrorLink(matchedLink);
      if (matchedLink) {
        return false;
      } else {
        return true;
      }
    });
    return result;
  }

  const handleNewMessage = () => {
    if (checkIgnoreLinks(newMessage).every((value) => value !== false)) {
      setMessage((prev) => [
        ...prev,
        {
          You: newMessage,
          Teacher: "Thank you for your question, I'll get back to you shortly.",
        },
      ]);
      setNewMessage("");
      setErrorLink("");
      setErrorMessage("");
    } else {
      setErrorMessage(
        `Following Link cannot be sent in the chat - ${errorLink}`
      );
    }
  };

  const toggleChatPanel = () => {
    setIsChatPanelOpen(!isChatPanelOpen);
  };

  // Toggle the Project Overview visibility
  const handleProjectOverviewToggle = () => {
    setIsProjectOverviewVisible(!isProjectOverviewVisible);
  };

  return (
    <div className="flex items-center justify-between px-6 py-6 text-white">
      <div className="flex-1">
        <h1 className="text-2xl font-bold text-left">Past Projects</h1>

        {/* Manager Profile Card */}
        <div className="max-w-4xl mx-auto bg-gray-800 border border-gray-500 rounded-lg shadow-lg p-6 mt-6">
          <div className="flex items-center mb-6">
            <img
              src={img}
              className="h-20 w-20 border rounded-full object-cover shadow-md"
              alt="Profile"
            />
            <div className="ml-6 flex-1">
              <h2 className="text-2xl font-semibold text-gray-100">
                {teacherName}
              </h2>
              <div className="flex items-center text-yellow-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={`h-5 w-5 ${
                      i < 4 ? "text-yellow-400" : "text-gray-400"
                    }`}
                    fill="currentColor"
                  >
                    <path d="M12 2l4 4h-3v6h-2V6H8l4-4z" />
                  </svg>
                ))}
                <span className="ml-2 text-sm text-gray-300">4 Rating</span>
              </div>
              <div className="text-sm text-gray-500 mt-2">39 reviews</div>
            </div>
          </div>

          {/* Details Section */}
          <div className="text-gray-300 text-sm space-y-2">
            <div className="flex items-center">
              <span>
                Project status:
                <span className="p-1 bg-gradient-to-r ml-3 from-yellow-400 via-yellow-500 to-yellow-600 text-white border border-yellow-700 rounded-lg text-sm font-semibold shadow-md transform transition-all duration-300 hover:scale-105">
                  Pending
                </span>
              </span>
            </div>

            <div className="flex items-center">
              <TurnedInNotIcon className="mr-2 text-gray-400" />
              <span>Project Assigned to: <span className="font-semibold">Manager 1</span></span>
            </div>

            <div className="flex items-center">
              <CalendarMonthIcon className="mr-2 text-gray-400" />
              <span>Last Project: 2024-02-15</span>
            </div>
            <div className="mt-2">
              <strong>About Me:</strong> A passionate educator with over 10
              years of experience in teaching mathematics at various levels.
            </div>
          </div>
        </div>
      </div>

      {/* Icons in Vertical Center */}
      <div className="flex flex-col items-center justify-center relative right-20 h-full mt-16 space-y-4">
        <button
          onClick={toggleChatPanel}
          className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-all"
        >
          <ChatIcon />
        </button>
        <button
          onClick={handleProjectOverviewToggle} // Toggle Project Overview visibility
          className="p-3 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-all"
        >
          <RemoveRedEyeIcon />
        </button>
      </div>

      {/* Conditionally render the Project Overview Popup */}
      {isProjectOverviewVisible && (
        <div className="fixed inset-0 z-50 bg-black/50 bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-800 p-8 rounded-lg shadow-xl max-w-4xl w-full relative">
            {/* Close Button */}
            <button
              onClick={handleProjectOverviewToggle}
              className="absolute top-4 right-4 p-2 px-4 bg-transparent border border-gray-500 text-white rounded-full"
            >
              X
            </button>

            {/* Project Overview Heading */}
            <h2 className="text-2xl font-bold text-center text-gray-100 mb-6">
              Project Overview
            </h2>

            {/* Project Information Section */}
            <div className="bg-gray-800 border border-gray-500 rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-6">
                <img
                  src={img}
                  className="h-20 w-20 border rounded-full object-cover shadow-md"
                  alt="Profile"
                />
                <div className="ml-6 flex-1">
                  <h2 className="text-2xl font-semibold text-gray-100">
                    {teacherName}
                  </h2>
                  <div className="flex items-center text-yellow-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className={`h-5 w-5 ${
                          i < 4 ? "text-yellow-400" : "text-gray-400"
                        }`}
                        fill="currentColor"
                      >
                        <path d="M12 2l4 4h-3v6h-2V6H8l4-4z" />
                      </svg>
                    ))}
                    <span className="ml-2 text-sm text-gray-300">4 Rating</span>
                  </div>
                  <div className="text-sm text-gray-500 mt-2">39 reviews</div>
                </div>
              </div>

              {/* Details Section */}
              <div className="text-gray-300 text-sm space-y-2">
                <div className="flex items-center">
                  <span>
                    Project status:
                    <span className="p-1 bg-gradient-to-r ml-3 from-yellow-400 via-yellow-500 to-yellow-600 text-white border border-yellow-700 rounded-lg text-sm font-semibold shadow-md transform transition-all duration-300 hover:scale-105">
                      Pending
                    </span>
                  </span>
                </div>

                <div className="flex items-center">
              <TurnedInNotIcon className="mr-2 text-gray-400" />
              <span>Project Assigned to: <span className="font-semibold">Manager 1</span></span>
            </div>

                <div className="flex items-center">
                  <CalendarMonthIcon className="mr-2 text-gray-400" />
                  <span>Last Project: 2024-02-15</span>
                </div>
                <div className="mt-2">
                  <strong>About Me:</strong> A passionate educator with over 10
                  years of experience in teaching mathematics at various levels.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chat Panel */}
      <div
        className={`fixed inset-0 z-50 bg-gray-800/50 bg-opacity-50 transition-all duration-300 transform ${
          isChatPanelOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={toggleChatPanel}
      >
        <div
          className={`fixed right-0 top-0 h-full w-[50%] bg-gray-900 shadow-lg transition-all duration-300 ${
            isChatPanelOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4 flex justify-between items-center">
            <h3 className="font-bold text-lg text-gray-100">
              Chat with {teacherName}
            </h3>
            <button
              className="text-gray-600 font-bold px-3 bg-gray-200 border rounded-lg hover:text-gray-800"
              onClick={toggleChatPanel}
            >
              X
            </button>
          </div>

          {/* Chat History */}
          <div className="p-4 h-[70%] space-y-4 overflow-y-scroll">
            {message.map((role, index) => (
              <div key={index} className="flex flex-col space-y-2">
                <div className="text-sm bg-gray-700 p-3 rounded-lg self-end">
                  <strong className="text-gray-100">You:</strong> {role.You}
                </div>
                <div className="text-sm bg-gray-800 p-3 rounded-lg self-start">
                  <strong className="text-gray-100">Manager:</strong>{" "}
                  {role.Teacher}
                </div>
              </div>
            ))}
            <div ref={chatRef}></div>
          </div>

          {/* New Message Section */}
          <div className="p-4 border-t border-gray-700 relative">
            {errorMessage && (
              <div className="absolute top-[-30px] bg-red-100 border border-red-500 py-2 flex justify-center left-0 w-full text-red-500 text-sm mb-2">
                The following link cannot be sent - <strong>{errorLink}</strong>
              </div>
            )}
            <input
              type="text"
              className="w-full focus:outline-blue-600 p-3 border border-gray-600 rounded-lg focus:outline-none bg-gray-800 text-gray-200"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button
              onClick={handleNewMessage}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg w-full hover:bg-blue-500"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PastProjects;
