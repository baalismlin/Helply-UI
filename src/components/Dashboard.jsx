import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import WebSocketService from '../services/websocket';
import ServiceCategories from './services/ServiceCategories';
import ServiceList from './services/ServiceList';
import SearchBar from './services/SearchBar';
import PostServiceModal from './services/PostServiceModal';
import ChatWindow from './chat/ChatWindow';

function Dashboard() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showPostForm, setShowPostForm] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [showChatPanel, setShowChatPanel] = useState(false);
  const [showFollowingUsers, setShowFollowingUsers] = useState(false);
  const [showFavoriteServices, setShowFavoriteServices] = useState(false);
  const [showProfileInfo, setShowProfileInfo] = useState(false);
  const [chatRecipient, setChatRecipient] = useState(null);
  const [minimizedChat, setMinimizedChat] = useState(false);
  const dropdownRef = useRef(null);
  
  // Connect to WebSocket
  useEffect(() => {
    const socket = WebSocketService.connect();
    
    // Listen for new messages to update unread count
    socket.on('new_message', (message) => {
      if (message.receiverId === user?.id && !message.read) {
        setUnreadMessages(prev => prev + 1);
      }
    });
    
    return () => {
      WebSocketService.disconnect();
    };
  }, [user?.id]);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  const handleOpenChatPanel = () => {
    setShowChatPanel(true);
    setShowFollowingUsers(false);
    setShowFavoriteServices(false);
    setShowProfileInfo(false);
    setDropdownOpen(false);
  };
  
  const handleOpenFollowingUsers = () => {
    setShowFollowingUsers(true);
    setShowChatPanel(false);
    setShowFavoriteServices(false);
    setShowProfileInfo(false);
    setDropdownOpen(false);
  };
  
  const handleOpenFavoriteServices = () => {
    setShowFavoriteServices(true);
    setShowChatPanel(false);
    setShowFollowingUsers(false);
    setShowProfileInfo(false);
    setDropdownOpen(false);
  };
  
  const handleOpenProfileInfo = () => {
    setShowProfileInfo(true);
    setShowChatPanel(false);
    setShowFollowingUsers(false);
    setShowFavoriteServices(false);
    setDropdownOpen(false);
  };
  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">{t('marketplace')}</h1>
          <div className="flex items-center space-x-4 relative" ref={dropdownRef}>
            <div 
              className="flex items-center cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <div className="relative">
                <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                  {user?.name?.charAt(0) || user?.email?.charAt(0) || '?'}
                </div>
                {unreadMessages > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadMessages}
                  </span>
                )}
              </div>
              <span className="ml-2">{user?.name || user?.email}</span>
            </div>
            
            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 top-12 w-56 bg-white rounded-md shadow-lg z-20">
                <div className="py-1">
                  <button
                    onClick={handleOpenChatPanel}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center justify-between"
                  >
                    <span>{t('messages')}</span>
                    {unreadMessages > 0 && (
                      <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {unreadMessages}
                      </span>
                    )}
                  </button>
                  <button
                    onClick={handleOpenFollowingUsers}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    {t('following_users')}
                  </button>
                  <button
                    onClick={handleOpenFavoriteServices}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    {t('favorite_services')}
                  </button>
                  <button
                    onClick={handleOpenProfileInfo}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    {t('profile_information')}
                  </button>
                  <hr className="my-1" />
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                  >
                    {t('logout')}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search and categories section */}
          <div className="mb-8">
            <SearchBar 
              searchQuery={searchQuery} 
              setSearchQuery={setSearchQuery} 
            />
            <ServiceCategories 
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </div>
          
          {/* Services list */}
          <ServiceList 
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
          />
          
          {/* Post Service Button - Fixed position */}
          <div className="fixed bottom-8 right-8">
            <button
              onClick={() => setShowPostForm(true)}
              className="bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              {t('post_service')}
            </button>
          </div>
          
          {/* Post Service Modal */}
          {showPostForm && (
            <PostServiceModal 
              onClose={() => setShowPostForm(false)} 
            />
          )}
          
          {/* Chat Panel */}
          {showChatPanel && (
            <div className="fixed top-16 right-0 h-[calc(100vh-4rem)] w-80 bg-white shadow-lg z-40 border-l border-gray-200">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="font-medium">{t('messages')}</h2>
                <button 
                  onClick={() => setShowChatPanel(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="overflow-y-auto h-full pb-16">
                {/* Mock conversation list */}
                {[1, 2, 3].map(id => (
                  <div 
                    key={id}
                    className="p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                    onClick={() => {
                      setChatRecipient({ id, name: `User ${id}` });
                      setMinimizedChat(false);
                    }}
                  >
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center font-bold text-gray-600">
                        U{id}
                      </div>
                      <div className="ml-3">
                        <p className="font-medium">User {id}</p>
                        <p className="text-sm text-gray-500 truncate">Last message preview...</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Following Users Panel */}
          {showFollowingUsers && (
            <div className="fixed top-16 right-0 h-[calc(100vh-4rem)] w-80 bg-white shadow-lg z-40 border-l border-gray-200">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="font-medium">{t('following_users')}</h2>
                <button 
                  onClick={() => setShowFollowingUsers(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="overflow-y-auto h-full">
                {/* Mock following users list */}
                {[1, 2, 3].map(id => (
                  <div key={id} className="p-4 border-b border-gray-200 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center font-bold text-gray-600">
                          U{id}
                        </div>
                        <div className="ml-3">
                          <p className="font-medium">User {id}</p>
                          <p className="text-sm text-gray-500">Service Provider</p>
                        </div>
                      </div>
                      <button className="text-blue-600 hover:text-blue-800">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Favorite Services Panel */}
          {showFavoriteServices && (
            <div className="fixed top-16 right-0 h-[calc(100vh-4rem)] w-80 bg-white shadow-lg z-40 border-l border-gray-200">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="font-medium">{t('favorite_services')}</h2>
                <button 
                  onClick={() => setShowFavoriteServices(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="overflow-y-auto h-full">
                {/* Mock favorite services list */}
                {[1, 2, 3].map(id => (
                  <div 
                    key={id} 
                    className="p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                    onClick={() => navigate(`/service/${id}`)}
                  >
                    <div className="flex">
                      <div className="h-16 w-16 bg-gray-200 rounded"></div>
                      <div className="ml-3">
                        <p className="font-medium">Service {id}</p>
                        <p className="text-sm text-gray-500 line-clamp-2">Service description...</p>
                        <p className="text-blue-600 font-bold mt-1">$50</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Profile Information Panel */}
          {showProfileInfo && (
            <div className="fixed top-16 right-0 h-[calc(100vh-4rem)] w-80 bg-white shadow-lg z-40 border-l border-gray-200">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="font-medium">{t('profile_information')}</h2>
                <button 
                  onClick={() => setShowProfileInfo(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-4">
                <div className="flex flex-col items-center mb-6">
                  <div className="h-24 w-24 rounded-full bg-blue-600 flex items-center justify-center text-white text-3xl font-bold mb-3">
                    {user?.name?.charAt(0) || user?.email?.charAt(0) || '?'}
                  </div>
                  <h3 className="text-xl font-medium">{user?.name || user?.email}</h3>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('email')}</label>
                    <p className="text-gray-900">{user?.email}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('name')}</label>
                    <p className="text-gray-900">{user?.name || '-'}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('member_since')}</label>
                    <p className="text-gray-900">
                      {new Date().toLocaleDateString()}
                    </p>
                  </div>
                  
                  <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                    {t('edit_profile')}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      {/* Chat Window */}
      {chatRecipient && (
        <ChatWindow 
          recipient={chatRecipient}
          onClose={() => setChatRecipient(null)}
          minimized={minimizedChat}
          setMinimized={setMinimizedChat}
        />
      )}
    </div>
  );
}

export default Dashboard;
