"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const SectionsByGender: React.FC = () => {
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("https://628bf017667aea3a3e387e51.mockapi.io/users-resume");
        const json = await response.json();

        const sessionsData = Object.entries(json["sessions-per-sex"]).map(([category, value]) => ({
          category,
          value,
        }));
        setData(sessionsData);
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
    series: data.map((item: { value: number }) => item.value),
    labels: data.map((item: { category: string }) => item.category),
    colors: ["#F6C881", "#393C56"],
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
        return `${val.toFixed(2)}%`;
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
          return `${value.toFixed(2)}%`;
        },
      },
    },
  };

  return (
    <div className="w-[480px] h-[400px] bg-white rounded-[12px] opacity-100">
      <h2 className="text-lg font-bold text-[#4E5D66] mb-4">
        Seções por gênero
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

export default SectionsByGender;
