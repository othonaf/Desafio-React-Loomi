"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import { ApexOptions } from "apexcharts";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface CategoryData {
  category: string;
  value: number;
}

const OrdersByCategory: React.FC = () => {
  const [data, setData] = useState<CategoryData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "https://628bf017667aea3a3e387e51.mockapi.io/orders-per-category"
        );
        setData(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const chartOptions: ApexOptions = {
    chart: {
      type: "donut",
    },
    series: [44, 55, 41, 17, 15],
    labels: data.map((item) => item.category),
    colors: ["#EC657A", "#393C56", "#7BB686", "#9FD8D5", "#F6C882"],
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
        Pedidos por categorias
      </h2>
      {isLoading ? (
        <p className="text-lg font-bold text-[#4E5D66] mb-4">Carregando...</p>
      ) : (
        data.length > 0 && (
          <Chart
            options={chartOptions}
            series={data.map((item) => item.value)}
            type="donut"
            height={350}
          />
        )
      )}
    </div>
  );
};

export default OrdersByCategory;
