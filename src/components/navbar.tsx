"use client";
import React, { useEffect, useState } from "react";
import logo from "../assets/Grupo 2989.svg";
import Image from "next/image";
import axios from "axios";
import NotificationBell from "./NotificationBell";
import UserOptions from "./UserOptions";
import Link from "next/link";

const Navbar: React.FC = () => {
  const [loggedUser, setLoggedUser] = useState<string | null>(null);
  const [showUserOptions, setShowUserOptions] = useState(false);
  const firstChar = "E"
  // [, setFirstChar] = useState<string | null>('');

  useEffect(() => {
    const fetchUser = async () => {
      const linkUserEndpoint = "https://628bf017667aea3a3e387e51.mockapi.io/me";
      try {
        const response = await axios.get(linkUserEndpoint);
        if (response.data && response.data.name) {
          setLoggedUser(response.data.name);
        } else {
          console.error("Dados de resposta inválidos:", response);
        }
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      }
    };

    fetchUser();
  }, []);
  
  // useEffect(() => {
  //   loggedUser ? setFirstChar(loggedUser.charAt(0)?.toUpperCase())  : "U";
  // }, [loggedUser])
   

  return (
    <nav className="fixed top-0 left-0 w-full h-20 bg-white shadow-md z-50 flex items-center justify-between px-4">
      <Link href="/home-page">
        <div className="flex justify-center cursor-pointer">
          <Image
            src={logo}
            alt="Logo"
            width={69}
            height={59}
            className="object-contain"
          />
        </div>
      </Link>

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
          <NotificationBell />

          <div
            className="flex items-center justify-center w-10 h-10 bg-[#5A4CA7] rounded-full opacity-55 cursor-pointer"
            onClick={() => setShowUserOptions(!showUserOptions)}
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
          {showUserOptions && <UserOptions />}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
