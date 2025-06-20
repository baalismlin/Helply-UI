import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './i18n';
import './App.css';
import WebSocketService from './services/websocket';

function App() {
  const { t, i18n } = useTranslation();
  const [message, setMessage] = useState('');
  
  // Handle responsive design with Tailwind classes
  
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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">{t('welcome')}</h1>
        
        {/* Responsive layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded">
            <h2 className="font-semibold mb-2">WebSocket</h2>
            <p>{message || 'No messages yet'}</p>
            <button 
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => WebSocketService.emit('ping', { text: 'Hello server' })}
            >
              Send Ping
            </button>
          </div>
          
          <div className="bg-green-50 p-4 rounded">
            <h2 className="font-semibold mb-2">Language</h2>
            <div className="flex space-x-2">
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
    </div>
  );
}

export default App;