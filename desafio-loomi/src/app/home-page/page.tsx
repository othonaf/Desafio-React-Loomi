"use client";
import Dashboard from "@/components/dashboard";
import Navbar from "@/components/navbar";
import backg from "@/assets/Curve-patterns.svg";
import DashCards from "@/components/DashCards";
import axios from "axios";
import { useEffect, useState } from "react";
import SideBar from "@/components/SideBar";

export default function HomePage() {
  const [ticketData, setTicketData] = useState({ value: 0, growth: 0 });

  const dadosTicketDay = async () => {
    const url = "https://628bf017667aea3a3e387e51.mockapi.io/avg-ticket-day";
    try {
      const response = await axios.get(url);
      console.log(response.data);
      const dailyData = response.data;

      if (!dailyData || dailyData == null) {
        console.log("dados diários vazio.")
        return;

      }
      setTicketData(dailyData);
    } catch (error) {
      console.log(`Erro ao tentar acessar dados diários: ${error}`)
    }
  }
  useEffect(() => {
    dadosTicketDay();
  }, []);

  const formattedValue = new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(ticketData.value);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-gray-50 pt-20 py-12 px-4 sm:px-6 lg:px-8 relative"
      style={{ backgroundImage: `url(${backg.src})`, backgroundSize: "cover" }}
    >
      <Navbar />
      <SideBar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-ubuntu font-bold mb-4 text-black">
          Início
        </h1>
        
        <div className="flex flex-wrap justify-between space-y-8 sm:space-y-0 sm:space-x-2">
          <DashCards
            titulo="Ticket Médio Últimas 24h"
            subtitulo={`${ticketData.growth > 0 ? '+' : ''} ${ticketData.growth}% em relação ao dia anterior`}
      valor={formattedValue}
          />
          <DashCards
            titulo="Ticket Médio mensal"
            subtitulo="+ 15% em relação a julho"
            valor="129.292,00"
          />
          <DashCards
            titulo="Ticket Médio Últimas 24h"
            subtitulo="+ 15% em relação ao dia anterior"
            valor="9.292,00"
          />
          <DashCards
            titulo="Ticket Médio mensal"
            subtitulo="+ 15% em relação a julho"
            valor="129.292,00"
          />
          <DashCards
            titulo="Ticket Médio Últimas 24h"
            subtitulo="+ 15% em relação ao dia anterior"
            valor="9.292,00"
          />
          <DashCards
            titulo="Ticket Médio mensal"
            subtitulo="+ 15% em relação a julho"
            valor="129.292,00"
          />
        </div>
        <Dashboard />
      </div>
    </div>
  );
}
