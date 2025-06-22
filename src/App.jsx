import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './i18n';
import './App.css';
import WebSocketService from './services/websocket';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

// Facebook SDK initialization
useEffect(() => {
  // Load Facebook SDK
  window.fbAsyncInit = function() {
    window.FB.init({
      appId: 'YOUR_FACEBOOK_APP_ID', // Replace with your Facebook App ID
      cookie: true,
      xfbml: true,
      version: 'v18.0'
    });
  };

  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
}, []);

function App() {
  const { t } = useTranslation();
  
  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID"> {/* Replace with your Google Client ID */}
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Routes>
        </Router>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
