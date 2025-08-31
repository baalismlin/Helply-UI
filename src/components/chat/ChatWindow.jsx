import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../contexts/AuthContext";
import WebSocketService from "../../services/websocket";

function ChatWindow({ recipient, onClose, minimized, setMinimized }) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);

  // Fetch chat history on component mount
  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        // In a real app, you would fetch messages from your API
        // For now, we'll use mock data
        await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API delay

        const mockMessages = [
          {
            id: 1,
            senderId: recipient.id,
            receiverId: user?.id,
            content: "Hello there! I saw your service listing.",
            timestamp: new Date(Date.now() - 3600000).toISOString(),
            read: true,
          },
          {
            id: 2,
            senderId: user?.id,
            receiverId: recipient.id,
            content: "Hi! Thanks for reaching out. How can I help you?",
            timestamp: new Date(Date.now() - 3500000).toISOString(),
            read: true,
          },
          {
            id: 3,
            senderId: recipient.id,
            receiverId: user?.id,
            content: "I was wondering if you're available next week?",
            timestamp: new Date(Date.now() - 3400000).toISOString(),
            read: true,
          },
        ];

        setMessages(mockMessages);
      } catch (error) {
        console.error("Error fetching chat history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChatHistory();

    // Connect to WebSocket for real-time messages
    const socket = WebSocketService.connect();

    socket.on("new_message", (message) => {
      if (
        (message.senderId === recipient.id &&
          message.receiverId === user?.id) ||
        (message.senderId === user?.id && message.receiverId === recipient.id)
      ) {
        setMessages((prev) => [...prev, message]);
      }
    });

    return () => {
      // No need to disconnect the socket here as it's managed globally
    };
  }, [recipient.id, user?.id]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!newMessage.trim()) return;

    const message = {
      id: Date.now(),
      senderId: user?.id,
      receiverId: recipient.id,
      content: newMessage,
      timestamp: new Date().toISOString(),
      read: false,
    };

    // Add message to local state
    setMessages((prev) => [...prev, message]);

    // Clear input
    setNewMessage("");

    // Send message via WebSocket
    WebSocketService.emit("send_message", message);
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  if (minimized) {
    return (
      <div className="fixed bottom-0 right-8 w-72 bg-white rounded-t-lg shadow-lg z-50 border border-gray-200">
        <div
          className="p-3 bg-blue-600 text-white rounded-t-lg flex justify-between items-center cursor-pointer"
          onClick={() => setMinimized(false)}
        >
          <h3 className="font-medium truncate">{recipient.name}</h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMinimized(false);
              }}
              className="text-white hover:text-gray-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="text-white hover:text-gray-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed bottom-0 right-8 w-80 bg-white rounded-t-lg shadow-lg z-50 border border-gray-200 flex flex-col"
      style={{ height: "400px" }}
    >
      <div className="p-3 bg-blue-600 text-white rounded-t-lg flex justify-between items-center">
        <h3 className="font-medium truncate">{recipient.name}</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setMinimized(true)}
            className="text-white hover:text-gray-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex-grow overflow-y-auto p-3 bg-gray-50">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.senderId === user?.id ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg px-3 py-2 ${
                    message.senderId === user?.id
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  <p>{message.content}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.senderId === user?.id
                        ? "text-blue-100"
                        : "text-gray-500"
                    }`}
                  >
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <form
        onSubmit={handleSendMessage}
        className="p-3 border-t border-gray-200"
      >
        <div className="flex">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={t("type_a_message")}
            className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChatWindow;
