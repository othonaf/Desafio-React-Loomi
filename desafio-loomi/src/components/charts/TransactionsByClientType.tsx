"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const TransactionsByClientType: React.FC = () => {
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://628bf017667aea3a3e387e51.mockapi.io/users-resume"
        );
        const json = await response.json();

        // Aqui, o dado já é um array, então apenas o atribuímos diretamente
        const transactionsData = json["transactions-per-client-type"];
        setData(transactionsData);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const chartOptions: ApexOptions = {
    chart: {
      type: "donut",
    },
    series: data.map((item: { value: number }) => item.value), // Extrai os valores
    labels: data.map((item: { category: string }) => item.category), // Extrai os rótulos
    colors: ["#9FD8D5", "#7BB686"], // Ajuste das cores
    legend: {
      position: "right",
      fontSize: "14px",
      fontFamily: "Ubuntu",
      labels: {
        colors: "#393C56",
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: number) {
        return `R$ ${val.toFixed(2)}`;
      },
      style: {
        fontSize: "14px",
        fontFamily: "Ubuntu",
        colors: ["#eaeaeb"],
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "55%",
        },
      },
    },
    tooltip: {
      y: {
        formatter: function (value: number) {
          return `R$ ${value.toFixed(2)}`;
        },
      },
    },
  };

  return (
    <div className="w-[480px] h-[400px] bg-white rounded-[12px] opacity-100">
      <h2 className="text-lg font-bold text-[#4E5D66] mb-4">
        Transações por tipo de cliente
      </h2>
      {isLoading ? (
        <p className="text-lg font-bold text-[#4E5D66] mb-4">Carregando...</p>
      ) : (
        data.length > 0 && (
          <Chart
            options={chartOptions}
            series={data.map((item: { value: number }) => item.value)}
            type="donut"
            height={350}
          />
        )
      )}
    </div>
  );
};

export default TransactionsByClientType;
