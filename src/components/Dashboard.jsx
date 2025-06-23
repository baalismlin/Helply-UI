import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import WebSocketService from '../services/websocket';
import ServiceCategories from './services/ServiceCategories';
import ServiceList from './services/ServiceList';
import SearchBar from './services/SearchBar';
import PostServiceModal from './services/PostServiceModal';

function Dashboard() {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showPostForm, setShowPostForm] = useState(false);
  
  // Connect to WebSocket
  useEffect(() => {
    const socket = WebSocketService.connect();
    
    return () => {
      WebSocketService.disconnect();
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">{t('marketplace')}</h1>
          <div className="flex items-center space-x-4">
            <span>{user?.name || user?.email}</span>
            <button 
              onClick={logout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              {t('logout')}
            </button>
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
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
