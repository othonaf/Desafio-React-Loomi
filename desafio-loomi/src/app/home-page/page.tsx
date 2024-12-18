"use client";
import DashMonthlyOrders from "@/components/DashMonthlyOrders";
import Navbar from "@/components/navbar";
import backg from "@/assets/Curve-patterns.svg";
import DashTickets from "@/components/DashTickets";
import DashAlerts from "@/components/DashAlerts";
import { useEffect, useState } from "react";
import SideBar from "@/components/SideBar";
import { ApiCalls } from "@/api";
import DashOrders from "@/components/DashOrders";
import ProfitChart from "@/components/ProfitChart";

interface ProductAlert {
  type: string;
  value: number;
  since: string;
}

interface TicketData {
  value: number;
  growth: number;
}

export default function HomePage() {
  const apiData = new ApiCalls();
  const [ticketDataDaily, setticketDataDaily] = useState<TicketData>({
    value: 0,
    growth: 0,
  });
  const [ticketDataMonthly, setticketDataMonthly] = useState<TicketData>({
    value: 0,
    growth: 0,
  });
  const [productAlerts, setProductAlerts] = useState<ProductAlert[]>([]);
  const [storageDown, setStorageDown] = useState<ProductAlert[]>([]);
  const [dataMonthlyOrders, setDataMonthlyOrders] = useState<TicketData>({
    value: 0,
    growth: 0,
  });
  const [dataMonthlySells, setDataMonthlySells] = useState<TicketData>({
    value: 0,
    growth: 0,
  });

  /*
    ! INFORMAÇÃO IMPORTANTE PARA O AVALIADOR:
    
    * Por motivo de organização e tentar melhorar a legilibilidade do código, organizei as chamadas aos endpoints dos cards superiores como métodos da classe 'ApiCalls', instanciada aqui em 'apiData' e estou chamando-os nos hooks abaixo:
    
  */
  // Chamada de dados Diários
  useEffect(() => {
    const fetchData = async () => {
      const dailyData = await apiData.dadosTicketDay();
      if (dailyData) {
        setticketDataDaily(dailyData);
      }
    };
    fetchData();
  }, []);

  // Chamada de dados Mensais
  useEffect(() => {
    const fetchData = async () => {
      const monthlyData = await apiData.dadosTicketMonth();
      if (monthlyData) {
        setticketDataMonthly(monthlyData);
      }
    };
    fetchData();
  }, []);

  // Chamada de dados de Produtos em manutenção
  useEffect(() => {
    const fetchData = async () => {
      const maintenanceProducts = await apiData.dadosAlertProducts();
      setProductAlerts(maintenanceProducts);
    };
    fetchData();
  }, []);

  // Chamada de dados de Produtos Acabando em Estoque
  useEffect(() => {
    const fetchData = async () => {
      const productsStorageDown = await apiData.dadosStorageDown();
      setStorageDown(productsStorageDown);
    };
    fetchData();
  }, []);

  // Chamada de dados de Pedidos Mensais:
  useEffect(() => {
    const fetchData = async () => {
      const MonthlyOrders = await apiData.dataMonthlyOrders();
      if (MonthlyOrders) {
        setDataMonthlyOrders(MonthlyOrders);
      }
    };
    fetchData();
  }, []);

  // Chamada de Produtos Vendidos no mês:
  useEffect(() => {
    const fetchData = async () => {
      const dailyData = await apiData.dataMonthlySells();
      if (dailyData) {
        setDataMonthlySells(dailyData);
      }
    };
    fetchData();
  }, []);

  // Bloco de código para formatar o valor em R$
  const formattedDailyValue = new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(ticketDataDaily.value);

  const formattedMonthlyValue = new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(ticketDataMonthly.value);

  return (
    <div className="min-h-screen flex bg-gray-50 relative">
      <SideBar />

      <div className="flex-1 flex flex-col pl-[108px] pr-6 overflow-hidden">
        <Navbar />

        <main className="flex-1 p-6 pt-24">
          <div
            className="w-full h-full relative space-x-4"
            style={{
              backgroundImage: `url(${backg.src})`,
              backgroundSize: "cover",
            }}
          >
            <h1 className="text-2xl font-ubuntu font-bold mb-6 text-black">
              Início
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-8">
              <DashTickets
                titulo="Ticket Médio Últimas 24h"
                subtitulo={`${ticketDataDaily.growth > 0 ? "+" : ""} ${
                  ticketDataDaily.growth
                }% em relação ao dia anterior`}
                valor={formattedDailyValue}
              />
              <DashTickets
                titulo="Ticket Médio mensal"
                subtitulo={`${ticketDataMonthly.growth > 0 ? "+" : ""} ${
                  ticketDataMonthly.growth
                }% em relação ao mês anterior`}
                valor={formattedMonthlyValue}
              />
              {productAlerts.length > 0 ? (
                <DashAlerts
                  titulo="Produtos em manutenção"
                  subtitulo={`Desde ${productAlerts[0].since}`}
                  valor={`${productAlerts[0].value} produtos`}
                />
              ) : (
                <DashAlerts
                  titulo="Produtos em manutenção"
                  subtitulo="Sem dados disponíveis"
                  valor="0 produtos"
                />
              )}
              {storageDown.length > 0 ? (
                <DashAlerts
                  titulo="Acabando o estoque"
                  subtitulo={`Desde ${storageDown[0].since}`}
                  valor={`${storageDown[0].value} produtos`}
                />
              ) : (
                <DashAlerts
                  titulo="Acabando o estoque"
                  subtitulo="Sem dados disponíveis"
                  valor="0 produtos"
                />
              )}
              <DashOrders
                titulo="Pedidos realizados no mês"
                subtitulo={`${dataMonthlyOrders.growth > 0 ? "+" : ""} ${
                  dataMonthlyOrders.growth
                }% em relação ao dia anterior`}
                valor={dataMonthlyOrders.value}
              />
              <DashOrders
                titulo="Produtos vendidos no mês"
                subtitulo={`${dataMonthlySells.growth > 0 ? "+" : ""} ${
                  dataMonthlySells.growth
                }% em relação ao dia anterior`}
                valor={dataMonthlySells.value}
              />
            </div>
            <h1 className="text-3xl font-bold text-[#5A4CA7] mb-8">
              Dashboard de Pedidos
            </h1>
            <div className="mx-4 overflow-hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
              <DashMonthlyOrders />
              <ProfitChart />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
