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
  const [chartOptions, setChartOptions] = useState<any>({});

  useEffect(() => {
    async function fetchData() {
      const expectationResponse = await axios.get(
        "https://628bf017667aea3a3e387e51.mockapi.io/profit-expectation-per-month"
      );
      const realResponse = await axios.get(
        "https://628bf017667aea3a3e387e51.mockapi.io/profit-per-month"
      );
      setExpectationData(expectationResponse.data);
      setRealData(realResponse.data);
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
            show: false, // Desativa o menu de ferramentas
          },
        },
        legend: {
            position: 'top', // Move a legenda para cima
            horizontalAlign: 'left',
            fontSize: '14px',
            markers: {
              radius: 12,
            },
            itemMargin: {
              horizontal: 10
            },
            offsetY: -10 // Ajusta o espaçamento vertical da legenda
          },
          series: [
            {
              name: "Real",
              type: "bar", // Muda para barra
              data: realData.map(item => item.value)
            },
            {
              name: "Expectativa",
              type: "bar", // Muda para barra
              data: expectationData.map(item => item.value)
            }
          ],
          
          dataLabels: {
            enabled: false
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
              colors: "#5A4CA7",
            },
          },
          title: {
            style: {
              color: "#5A4CA7",
            },
          },
        },
        yaxis: {
          labels: {
            style: {
              colors: "#5A4CA7",
            },
          },
          title: {
            text: "Lucro (R$)",
            style: {
              color: "#5A4CA7",
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
    <div className="min-w-[300px] p-2 bg-white rounded-[12px] shadow-md">
      {chartOptions.series ? (
        <Chart
          options={chartOptions}
          series={chartOptions.series}
          type="line"
          height={400}
        />
      ) : null}
    </div>
  );
};

export default ProfitChart;
