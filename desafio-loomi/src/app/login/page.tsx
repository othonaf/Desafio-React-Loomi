"use client";
import Image from "next/image";
import { useState } from "react";
import logo from "../../assets/Grupo 2989.svg";
import backg from "../../assets/Curve-patterns.svg";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative"
      style={{ backgroundImage: `url(${backg.src})`, backgroundSize: "cover" }}
    >
      <div className="min-h-screen max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-center">
          <Image
            src={logo}
            alt="Logo"
            width={264}
            height={226}
            className="object-contain"
          />
        </div>

        {/* Formulário */}
        <form className="space-y-6">
          {/* E-mail */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">E-mail</p>
            <input
              type="email"
              placeholder="E-mail"
              className="block w-full h-[60px] px-4 text-gray-800 bg-gray-100 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Senha */}
          <div className="relative">
            <p className="text-sm font-medium text-gray-700 mb-2">Senha</p>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
              className="block w-full h-[60px] px-4 text-gray-800 bg-gray-100 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 top-0 h-full px-4 text-gray-400 text-2xl"
            >
              {showPassword ? "🙈" : "👁"}
            </button>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-[120px] h-[40px] bg-[#5A4CA7] text-white font-medium text-sm rounded-lg hover:bg-[#4b3e8d] transition"
            >
              Entrar
            </button>
            </div>
            </form>
      </div>
    </div>
  );
}
