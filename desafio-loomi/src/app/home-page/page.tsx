"use client";
import Dashboard from "@/components/dashboard";
import Navbar from "@/components/navbar";
import backg from "@/assets/Curve-patterns.svg";
import DashCards from "@/components/DashCards";
import axios from "axios";
import { useEffect, useState } from "react";
import SideBar from "@/components/SideBar";

export default function HomePage() {
  const [ticketDataDaily, setticketDataDaily] = useState({ value: 0, growth: 0 });
  const [ticketDataMonthly, setticketDataMonthly] = useState({ value: 0, growth: 0 });
  const [productAlerts, setproductAlerts] = useState({value: 0, growth: 0 });
  const [storageDown, setStorageDown] = useState({value: 0, growth: 0 });

  //Código para receber dados Diários:
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
      setticketDataDaily(dailyData);
    } catch (error) {
      console.log(`Erro ao tentar acessar dados diários: ${error}`)
    }
  }
  useEffect(() => {
    dadosTicketDay();
  }, []);

  //Código para receber dados Mensais:
  const dadosTicketMonth = async () => {
    const url = "https://628bf017667aea3a3e387e51.mockapi.io/avg-ticket-month";
    try {
      const response = await axios.get(url);
      console.log(response.data);
      const monthlyData = response.data;

      if (!monthlyData || monthlyData == null) {
        console.log("dados diários vazio.")
        return;

      }
      setticketDataMonthly(monthlyData);
    } catch (error) {
      console.log(`Erro ao tentar acessar dados diários: ${error}`)
    }
  }
  useEffect(() => {
    dadosTicketMonth();
  }, []);

  //Código para receber dados de Produtos em manutenção:
  const dadosAlertProducts = async () => {
    const url = "https://628bf017667aea3a3e387e51.mockapi.io/alerts";
    try {
      const response = await axios.get(url);
      console.log(response.data);
      const productsAlert = response.data;

      if (!productsAlert || productsAlert == null) {
        console.log("dados diários vazio.")
        return;

      }
      setproductAlerts(productsAlert);
    } catch (error) {
      console.log(`Erro ao tentar acessar dados diários: ${error}`)
    }
  }
  useEffect(() => {
    dadosAlertProducts();
  }, []);

  //Bloco de código para formatar o valor em R$:
  const formattedDailyValue = new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(ticketDataDaily.value);

  const formattedMonthlyValue = new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(ticketDataMonthly.value);

  return (
    <div className="min-h-screen flex bg-gray-50 relative">
      <SideBar />
      
      <div className="flex-1 flex flex-col pl-[108px] pr-6 overflow-x-hidden">
        <Navbar />
        
        <main className="flex-1 p-6 pt-24">
          <div 
            className="w-full h-full relative space-x-4"
            style={{ backgroundImage: `url(${backg.src})`, backgroundSize: "cover" }}
          >
            <h1 className="text-2xl font-ubuntu font-bold mb-6 text-black">
              Início
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-8 ">
              <DashCards
                titulo="Ticket Médio Últimas 24h"
                subtitulo={`${ticketDataDaily.growth > 0 ? '+' : ''} ${ticketDataDaily.growth}% em relação ao dia anterior`}
                valor={formattedDailyValue}
              />
              <DashCards
                titulo="Ticket Médio mensal"
                subtitulo={`${ticketDataMonthly.growth > 0 ? '+' : ''} ${ticketDataMonthly.growth}% em relação ao dia anterior`}
                valor={formattedMonthlyValue}
              />
              <DashCards
                titulo="Produtos em manutenção"
                subtitulo="+ 15% em relação ao dia anterior"
                valor="9.292,00"
              />
              <DashCards
                titulo="Acabando o estoque"
                subtitulo="+ 15% em relação a julho"
                valor="129.292,00"
              />
              <DashCards
                titulo="Pedidos realizados no mês"
                subtitulo="+ 15% em relação ao dia anterior"
                valor="9.292,00"
              />
              <DashCards
                titulo="Pedidos vendidos no mês"
                subtitulo="+ 15% em relação a julho"
                valor="129.292,00"
              />
            </div>
            
            <Dashboard />
          </div>
        </main>
      </div>
    </div>
  );
  
}
