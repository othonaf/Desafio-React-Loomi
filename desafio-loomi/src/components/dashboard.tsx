"use client";
import React from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { useRouter } from "next/navigation";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const Dashboard: React.FC = () => {
  const router = useRouter();

  const seriesPedidosPorMes = [
    {
      name: "Pedidos",
      data: [10, 15, 8, 12, 20, 18, 25],
    },
  ];

  const optionsPedidosPorMes: ApexOptions = {
    chart: {
      type: "bar",
    },
    title: {
      text: "Pedidos por Mês",
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    },
  };

  const seriesLucro = [
    {
      name: "Lucro Real",
      data: [5000, 7000, 8000, 9000, 10000, 11000, 12000],
    },
    {
      name: "Expectativa",
      data: [6000, 8000, 9000, 10000, 12000, 13000, 14000],
    },
    {
      name: "Expectativa Anterior",
      data: [4500, 6500, 7500, 8500, 9500, 10500, 11500],
    },
  ];

  const optionsLucro: ApexOptions = {
    chart: {
      type: "line",
    },
    title: {
      text: "Expectativa de Lucro x Lucro Real",
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    },
  };

  const seriesPedidosRealizadosCancelados = [
    {
      name: "Pedidos Realizados",
      data: [10, 20, 30, 40, 50, 60, 70], // Exemplo de dados
    },
    {
      name: "Pedidos Cancelados",
      data: [5, 10, 15, 20, 25, 30, 35], // Exemplo de dados
    },
  ];

  const optionsPedidosRealizadosCancelados: ApexOptions = {
    chart: {
      type: "bar",
    },
    title: {
      text: "Pedidos Realizados x Pedidos Cancelados",
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    },
  };

  return (
    <div className="dashboard">
      <div className="charts">
        <Chart
          options={optionsPedidosPorMes}
          series={seriesPedidosPorMes}
          type="bar"
          height={350}
        />
        <Chart
          options={optionsLucro}
          series={seriesLucro}
          type="line"
          height={350}
        />
        <Chart
          options={optionsPedidosRealizadosCancelados}
          series={seriesPedidosRealizadosCancelados}
          type="bar"
          height={350}
        />
      </div>
    </div>
  );
};

export default Dashboard;
