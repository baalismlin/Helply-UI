import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import WebSocketService from '../services/websocket';

function Dashboard() {
  const { t, i18n } = useTranslation();
  const { user, logout } = useAuth();
  const [message, setMessage] = useState('');
  
  useEffect(() => {
    // Connect to WebSocket
    const socket = WebSocketService.connect();
    
    // Listen for messages
    WebSocketService.on('message', (data) => {
      setMessage(data.message);
    });
    
    // Cleanup on unmount
    return () => {
      WebSocketService.disconnect();
    };
  }, []);
  
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">{t('dashboard')}</h1>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* WebSocket panel */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">{t('websocket_messages')}</h2>
              <div className="bg-gray-50 p-4 rounded mb-4 min-h-[100px]">
                {message || t('no_messages')}
              </div>
              <button 
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={() => WebSocketService.emit('ping', { text: 'Hello server' })}
              >
                {t('send_ping')}
              </button>
            </div>
            
            {/* Language panel */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">{t('language_settings')}</h2>
              <div className="flex flex-wrap gap-2">
                <button 
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  onClick={() => changeLanguage('en')}
                >
                  English
                </button>
                <button 
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  onClick={() => changeLanguage('es')}
                >
                  Español
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;