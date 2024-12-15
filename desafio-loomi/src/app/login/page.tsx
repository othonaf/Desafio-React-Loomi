"use client";
import Image from "next/image";
import { useState } from "react";
import logo from "../../assets/Grupo 2989.svg";
import backg from "../../assets/Curve-patterns.svg";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const url = "https://628bf017667aea3a3e387e51.mockapi.io/login";

  const login = async () => {
    try {
      const response = await axios.get(
        `${url}?email=${encodeURIComponent(
          email
        )}&password=${encodeURIComponent(password)}`
      );
      const token = response.data["access-token"];
      console.log(`Este é o response:`, response);
      console.log(`Este é o token: ${token}`);
      
      if (token) {
        document.cookie = `token=${token}; path=/; secure`
        router.push("/home-page");
      } else {
        console.error("Token não encontrado na resposta.");
        setError("Erro ao obter token.");
      }
    } catch (error) {
      console.error("Erro no login:", error);
      setError("Usuário ou senha inválidos");
    }
  };
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

        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            login();
          }}
        >
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">E-mail</p>
            <input
              type="email"
              placeholder="E-mail"
              value={email || ""}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full h-[60px] px-4 text-gray-800 bg-gray-100 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="relative">
            <p className="text-sm font-medium text-gray-700 mb-2">Senha</p>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
              value={password || ""}
              onChange={(e) => setPassword(e.target.value)}
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

          {error && <p>{error}</p>}
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
