"use client";
import React, { useEffect, useState } from "react";
import logo from "../assets/Grupo 2989.svg";
import Image from "next/image";
import axios from "axios";

const Navbar: React.FC = () => {
  const [loggedUser, setLoggedUser] = useState<string | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<string[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      const linkUserEndpoint = "https://628bf017667aea3a3e387e51.mockapi.io/me";
      try {
        const response = await axios.get(linkUserEndpoint);
        setLoggedUser(response.data.name);
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      }
    };

    fetchUser();
  }, []);

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

  const handleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const firstChar = loggedUser ? loggedUser.charAt(0).toUpperCase() : "";

  return (
    <nav className="fixed top-0 left-0 w-full h-20 bg-white shadow-md z-50 flex items-center justify-between px-4">
      <div className="flex justify-center">
        <Image
          src={logo}
          alt="Logo"
          width={69}
          height={59}
          className="object-contain"
        />
      </div>
      {loggedUser && (
        <div className="flex items-center space-x-4 relative">
          <span
            className="text-xl font-medium"
            style={{
              font: "normal normal medium 16px/18px Ubuntu",
              color: "#4E5D66",
            }}
          >
            {loggedUser}
          </span>
          <div
            className="flex items-center justify-center w-10 h-10 bg-[#5A4CA7] rounded-full opacity-55 cursor-pointer"
            onClick={handleNotifications}
          >
            <span
              className="text-center text-2xl font-medium"
              style={{
                color: "#1b1c1d",
                font: "normal normal medium 22px/26px Ubuntu",
                letterSpacing: "-0.44px",
              }}
            >
              {firstChar}
            </span>
          </div>
          {showNotifications && (
            <div className="absolute top-24 right-0 mt-2 w-80 bg-[#4E5D66] border border-[#3F3E4B] opacity-100 shadow-lg rounded-lg">
              <h2 className="text-lg font-bold p-4 border-b text-white">
                Notificações
              </h2>
              <ul className="list-none p-4 space-y-2">
                {notifications.map((notification, index) => (
                  <li key={index} className="text-sm text-gray-200">
                    {notification}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
