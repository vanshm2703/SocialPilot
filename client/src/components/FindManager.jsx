import React, { useState, useEffect } from 'react';
import { api } from '../const';
import StarIcon from '@mui/icons-material/Star';

export default function FindManager() {
  const [managers, setManagers] = useState([]);
  const [selectedManager, setSelectedManager] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    mediaPlatform: [],
    serviceCost: '',
    projectName: '',
    projectDiscription: '',
    clientId: localStorage.getItem('clientId') || ''
  });

  const managerdata = async () => {
    try {
      const res = await api.get('/api/manager/getAllManagers');
      console.log("Fetched Managers:", res.data);
      setManagers(res.data.managers || []);
    } catch (e) {
      console.error("Error fetching managers:", e);
    }
  };

  useEffect(() => {
    managerdata();
  }, []);

  const handleHireClick = (manager) => {
    setSelectedManager(manager);
    setIsPopupVisible(true);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSocialPlatformChange = (e) => {
    const platforms = e.target.value.split(',').map(platform => platform.trim());
    setFormData(prev => ({
      ...prev,
      mediaPlatform: platforms.filter(platform => platform !== '')
    }));
  };

  const handleFormSubmit = async(e) => {
    e.preventDefault();
    try{
      const res =await api.post('/api/request/createRequest',formData);
      console.log("Fetched Managers:", res.data);

    }catch(e){
      console.log(e);
    } 
  };

  return (
    <div className="flex relative overflow-hidden">
      <main className="flex-1 ml-8 z-10">
        <div className="space-y-6">
          <h1 className="text-2xl font-bold text-white">Available Managers</h1>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {managers.length > 0 ? (
              managers.map((manager, index) => (
                <div key={manager._id || index} className="bg-gray-800 border border-gray-400/50 rounded-lg shadow-md overflow-hidden p-6">
                  <div className="flex items-center">
                    <img 
                      src={manager.profilePicture || "https://via.placeholder.com/150"} 
                      alt={manager.managerUsername} 
                      className="h-12 w-12 rounded-full object-cover" 
                    />
                    <div className="ml-4">
                      <h2 className="text-lg font-semibold text-gray-100">{manager.managerUsername}</h2>
                      <p className="text-sm text-gray-300">{manager.managerEmail}</p>
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <StarIcon key={i} className={`h-4 w-4 ${i < manager.rating ? 'text-yellow-400' : 'text-gray-300'}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleHireClick(manager)}
                    className="mt-6 w-full font-semibold flex items-center justify-center px-4 py-2 border border-white text-white duration-500 rounded-md hover:bg-white hover:text-black cursor-pointer transition-colors"
                  >
                    Collaborate
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-300">No managers available.</p>
            )}
          </div>
        </div>
      </main>

      {isPopupVisible && selectedManager && (
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center">
          <div className="bg-gray-800 p-8 rounded-lg shadow-xl max-w-4xl w-full relative overflow-y-auto" style={{ maxHeight: '90vh' }}>
            <button
              onClick={handleClosePopup}
              className="absolute top-4 right-4 px-4 p-2 bg-gray-800 border border-gray-500 text-white rounded-full"
            >
              X
            </button>
            <h2 className="text-2xl font-bold text-center text-gray-100 mb-6">Manager Overview</h2>
            <div className="flex items-center mb-6">
              <img 
                src={selectedManager.profilePicture || "https://via.placeholder.com/150"} 
                alt={selectedManager.managerUsername} 
                className="h-12 w-12 rounded-full object-cover" 
              />
              <div className="ml-4">
                <h2 className="text-lg font-semibold text-gray-100">{selectedManager.managerUsername}</h2>
                <p className="text-sm text-gray-300">{selectedManager.managerEmail}</p>
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon key={i} className={`h-4 w-4 ${i < selectedManager.rating ? 'text-yellow-400' : 'text-gray-300'}`} />
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-white mb-4">Create a New Job Post</h2>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label htmlFor="projectName" className="text-white">Project Name</label>
                  <input
                    type="text"
                    name="projectName"
                    id="projectName"
                    value={formData.projectName}
                    onChange={handleInputChange}
                    className="w-full mt-2 p-2 bg-gray-700 text-white rounded-md"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="projectDiscription" className="text-white">Project Description</label>
                  <textarea
                    name="projectDiscription"
                    id="projectDiscription"
                    value={formData.projectDiscription}
                    onChange={handleInputChange}
                    className="w-full mt-2 p-2 bg-gray-700 text-white rounded-md"
                    rows="4"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="mediaPlatform" className="text-white">Social Platforms (comma separated)</label>
                  <input
                    type="text"
                    name="mediaPlatform"
                    id="mediaPlatform"
                    onChange={handleSocialPlatformChange}
                    className="w-full mt-2 p-2 bg-gray-700 text-white rounded-md"
                  />
                </div>
                <div>
                  <label htmlFor="serviceCost" className="text-white">Service Cost ($)</label>
                  <input
                    type="number"
                    name="serviceCost"
                    id="serviceCost"
                    value={formData.serviceCost}
                    onChange={handleInputChange}
                    className="w-full mt-2 p-2 bg-gray-700 text-white rounded-md"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="mt-4 w-full font-semibold flex items-center justify-center px-4 py-2 border border-white text-white bg-gray-700 hover:bg-white hover:text-black cursor-pointer transition-colors"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}