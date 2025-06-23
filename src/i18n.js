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
      "sign_in_with_facebook": "Sign in with Facebook",
      "dashboard": "Dashboard",
      "logout": "Logout",
      "websocket_messages": "WebSocket Messages",
      "no_messages": "No messages yet",
      "send_ping": "Send Ping",
      "language_settings": "Language Settings",
      // Marketplace translations
      "marketplace": "Service Marketplace",
      "categories": "Categories",
      "all": "All Services",
      "errands": "Errands",
      "pet_care": "Pet Care",
      "photography": "Photography",
      "driving": "Driving",
      "design": "Design",
      "writing": "Writing",
      "translation": "Translation",
      "remote_assistance": "Remote Assistance",
      "search_services": "Search for services...",
      "no_services_found": "No services found matching your criteria",
      "contact": "Contact",
      "post_service": "Post a Service",
      "title": "Title",
      "description": "Description",
      "category": "Category",
      "price": "Price",
      "city": "City",
      "images": "Images",
      "upload_multiple_images": "You can upload multiple images (max 5)",
      "cancel": "Cancel",
      "post": "Post",
      "posting": "Posting...",
      "select_category": "Select a category",
      "image_previews": "Image Previews"
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
      "sign_in_with_facebook": "Inicia sesión con Facebook",
      "dashboard": "Panel de control",
      "logout": "Cerrar sesión",
      "websocket_messages": "Mensajes WebSocket",
      "no_messages": "Aún no hay mensajes",
      "send_ping": "Enviar Ping",
      "language_settings": "Configuración de idioma",
      // Marketplace translations
      "marketplace": "Mercado de Servicios",
      "categories": "Categorías",
      "all": "Todos los Servicios",
      "errands": "Recados",
      "pet_care": "Cuidado de Mascotas",
      "photography": "Fotografía",
      "driving": "Conducción",
      "design": "Diseño",
      "writing": "Escritura",
      "translation": "Traducción",
      "remote_assistance": "Asistencia Remota",
      "search_services": "Buscar servicios...",
      "no_services_found": "No se encontraron servicios que coincidan con sus criterios",
      "contact": "Contactar",
      "post_service": "Publicar un Servicio",
      "title": "Título",
      "description": "Descripción",
      "category": "Categoría",
      "price": "Precio",
      "city": "Ciudad",
      "images": "Imágenes",
      "upload_multiple_images": "Puede cargar varias imágenes (máximo 5)",
      "cancel": "Cancelar",
      "post": "Publicar",
      "posting": "Publicando...",
      "select_category": "Seleccione una categoría",
      "image_previews": "Vista previa de imágenes"
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
