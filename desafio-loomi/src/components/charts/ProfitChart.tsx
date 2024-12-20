import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const ProfitChart: React.FC = () => {
  const [expectationData, setExpectationData] = useState<
    { month: number; value: number }[]
  >([]);
  const [realData, setRealData] = useState<{ month: number; value: number }[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const [chartOptions, setChartOptions] = useState<any>({});
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const expectationResponse = await axios.get(
          "https://628bf017667aea3a3e387e51.mockapi.io/profit-expectation-per-month"
        );
        const realResponse = await axios.get(
          "https://628bf017667aea3a3e387e51.mockapi.io/profit-per-month"
        );
        setExpectationData(expectationResponse.data);
        setRealData(realResponse.data);
      } catch (error) {
        console.log("Erro ao gerar gráfico.", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (expectationData.length > 0 && realData.length > 0) {
      setChartOptions({
        chart: {
          type: "line",
          height: 400,
          width: 608,
          toolbar: {
            show: false,
          },
        },
        legend: {
          position: "top",
          horizontalAlign: "left",
          fontSize: "14px",
          markers: {
            radius: 12,
          },
          itemMargin: {
            horizontal: 10,
          },
          offsetY: -10,
        },
        series: [
          {
            name: "Real",
            type: "bar",
            data: realData.map((item) => item.value),
          },
          {
            name: "Expectativa",
            type: "bar", // Muda para barra
            data: expectationData.map((item) => item.value),
          },
        ],

        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories: [
            "JAN",
            "FEV",
            "MAR",
            "ABR",
            "MAI",
            "JUN",
            "JUL",
            "AGO",
            "SET",
            "OUT",
            "NOV",
            "DEZ",
          ],
          labels: {
            style: {
              colors: "#4D4141",
            },
          },
          title: {
            style: {
              colors: "#4D4141",
            },
          },
        },
        yaxis: {
          labels: {
            show: false,
            style: {
              colors: "#4D4141",
            },
          },
          title: {
            text: "Lucro (R$)",
            style: {
              colors: "#4D4141",
            },
          },
        },
        colors: ["#9FD8D5", "#E0347D"],
        stroke: {
          curve: "smooth",
        },

        title: {
          text: "Expectativa de Lucro x Lucro Real",
          align: "left",
          style: {
            fontSize: "19px",
            fontWeight: "bold",
            fontFamily: "Ubuntu",
            lineHeight: "23px",
            color: "#333333",
            opacity: 1,
          },
        },

        tooltip: {
          enabled: true,
          style: {
            fontSize: "12px",
            colors: "#5A4CA7",
          },
        },
      });
    }
  }, [expectationData, realData]);

  return (
    <div className="w-[715px] h-[400px] bg-white rounded-[12px] opacity-100">
      <div className="flex justify-end">
        <label htmlFor="year" className="mr-2 text-[#191a19]">
          Ano:
        </label>
        <select
          id="year"
          className="mr-2 text-[#191a19]"
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
        >
          {Array.from(
            { length: 10 },
            (_, i) => new Date().getFullYear() - i
          ).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      {isLoading ? (
        <p className="text-lg font-bold text-[#4E5D66] mb-4">Carregando...</p>
      ) : (
        realData.length && expectationData.length > 0 && (
          <Chart
          options={chartOptions}
          series={chartOptions.series}
          type="line"
          height={400}
        />
        )
      )}
    </div>
  );
};

export default ProfitChart;
