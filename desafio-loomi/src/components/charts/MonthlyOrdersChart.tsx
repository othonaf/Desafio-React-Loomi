import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const DashMonthlyOrders: React.FC = () => {
  const [data, setData] = useState<{ month: number; value: number }[]>([]);
  const [chartOptions, setChartOptions] = useState<any>({});
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData(year: number) {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://628bf017667aea3a3e387e51.mockapi.io/sells-per-month?year=${year}`
        );
        setData(response.data);
      } catch (error) {
        console.log("Erro ao gerar gráfico", error)
      } finally {
        setIsLoading(false);
      }
      
    }

    fetchData(selectedYear);
  }, [selectedYear]);

  useEffect(() => {
    if (data.length > 0) {
      setChartOptions({
        chart: {
          type: "bar",
          height: 400,
          width: 608,
          toolbar: {
            show: false,
            autoSelected: 'zoom'
          },
        },
        series: [
          {
            name: "Pedidos",
            data: data.map((item) => item.value),
          },
        ],
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
              colors: "#1b1a1a",
            },
          },
          title: {
            style: {
              colors: "#1b1a1a",
            },
          },
        },
        yaxis: {
          labels: {
            style: {
              colors: "#1b1a1a",
            },
          },
          title: {
            style: {
              colors: "#1b1a1a",
            },
          },
        },
        colors: ["#393C56"],
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        title: {
          text: "Pedidos por Mês",
          align: "left",
          style: {
            colors: "#1b1a1a",
          },
        },
        tooltip: {
          style: {
            fontSize: "12px",
            colors: "#1d1c1c",
          },
        },
      });
    }
  }, [data]);

  return (
    <div className="w-[460px] h-[400px] bg-white rounded-[12px] opacity-100">

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
        data.length > 0 && (
          <Chart
          options={chartOptions}
          series={chartOptions.series}
          type="bar"
          height={400}
        />
        )
      )}
    </div>
  );
};

export default DashMonthlyOrders;
