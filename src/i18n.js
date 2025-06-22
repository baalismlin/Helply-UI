import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources
const resources = {
  en: {
    translation: {
      "welcome": "Welcome to our app",
      "login": "Login",
      "register": "Register",
      "email": "Email",
      "password": "Password",
      "confirm_password": "Confirm Password",
      "name": "Name",
      "logging_in": "Logging in...",
      "registering": "Registering...",
      "login_failed": "Login failed. Please check your credentials.",
      "registration_failed": "Registration failed. Please try again.",
      "passwords_dont_match": "Passwords don't match",
      "dont_have_account": "Don't have an account?",
      "already_have_account": "Already have an account?",
      "register_now": "Register now",
      "login_now": "Login now",
      "or_continue_with": "Or continue with",
      "google_login_failed": "Google login failed",
      "facebook_login_failed": "Facebook login failed",
      "dashboard": "Dashboard",
      "logout": "Logout",
      "websocket_messages": "WebSocket Messages",
      "no_messages": "No messages yet",
      "send_ping": "Send Ping",
      "language_settings": "Language Settings"
    }
  },
  es: {
    translation: {
      "welcome": "Bienvenido a nuestra aplicación",
      "login": "Iniciar sesión",
      "register": "Registrarse",
      "email": "Correo electrónico",
      "password": "Contraseña",
      "confirm_password": "Confirmar contraseña",
      "name": "Nombre",
      "logging_in": "Iniciando sesión...",
      "registering": "Registrando...",
      "login_failed": "Error al iniciar sesión. Verifique sus credenciales.",
      "registration_failed": "Error al registrarse. Inténtelo de nuevo.",
      "passwords_dont_match": "Las contraseñas no coinciden",
      "dont_have_account": "¿No tienes una cuenta?",
      "already_have_account": "¿Ya tienes una cuenta?",
      "register_now": "Regístrate ahora",
      "login_now": "Inicia sesión ahora",
      "or_continue_with": "O continúa con",
      "google_login_failed": "Error al iniciar sesión con Google",
      "facebook_login_failed": "Error al iniciar sesión con Facebook",
      "dashboard": "Panel de control",
      "logout": "Cerrar sesión",
      "websocket_messages": "Mensajes WebSocket",
      "no_messages": "Aún no hay mensajes",
      "send_ping": "Enviar Ping",
      "language_settings": "Configuración de idioma"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;
