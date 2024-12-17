import { useState, useEffect } from "react";
import axios from "axios";

export default function NotificationBell() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<string[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const linkAlertsEndpoint =
        "https://628bf017667aea3a3e387e51.mockapi.io/alerts";
      try {
        const response = await axios.get(linkAlertsEndpoint);
        setNotifications(response.data.map((alert: any) => alert.type));
      } catch (error) {
        console.error("Erro ao buscar alertas:", error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="relative">
      <button
        onClick={() => setShowNotifications(!showNotifications)}
        className="relative"
      >
        <svg
          className="w-6 h-6 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        <span className="absolute top-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white bg-green-400"></span>
      </button>
      {showNotifications && (
        <div className="absolute right-0 mt-9 w-[651px] h-[757px] bg-[#4E5D66] text-white border border-gray-700 rounded-lg shadow-lg notification">
          <div className="p-4 relative">
            <div className="triangle"></div>
            <div className="flex items-center justify-between">
              <div className="relative">
                <p className="text-left font-poppins font-semibold text-[24px] leading-[35px] tracking-[0.48px] text-[#F6F6F6] opacity-100">
                  Notificações
                  <span className="inline-block ml-2 w-2 h-2 rounded-full bg-[#EDA268]"></span>
                </p>
              </div>
              <p
                onClick={() => setShowNotifications(!showNotifications)}
                className="cursor-pointer"
              >
                X
              </p>
            </div>

            <div className="mt-2 space-y-2">
              {notifications.map((notification, index) => (
                <div
                  key={index}
                  className="w-3/3 h-[104px] bg-[#0E0E17] rounded-tl-lg rounded-bl-lg opacity-100 backdrop-blur-[40px] p-4"
                >
                  <p>{notification}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
