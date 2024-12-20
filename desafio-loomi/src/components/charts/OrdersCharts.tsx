import React, { useState, useEffect } from "react";
import axios from "axios";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const OrdersCharts: React.FC = () => {
  const [expectationData, setExpectationData] = useState<
    { month: number; value: number }[]
  >([]);
  const [canceledOrders, setCanceledOrders] = useState<
    { month: number; value: number }[]
  >([]);
  const [chartOptions, setChartOptions] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const expectationResponse = await axios.get(
          "https://628bf017667aea3a3e387e51.mockapi.io/orders-per-month"
        );
        const canceledResponse = await axios.get(
          "https://628bf017667aea3a3e387e51.mockapi.io/canceled-orders-per-month"
        );
        setExpectationData(expectationResponse.data);
        setCanceledOrders(canceledResponse.data);
      } catch (error) {
        console.log("Erro ao gerar gráfico.", error);
      } finally {
        setIsLoading(false);
      }
      
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (expectationData.length > 0 && canceledOrders.length > 0) {
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
            data: canceledOrders.map((item) => item.value),
          },
          {
            name: "Expectativa",
            type: "bar",
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
        colors: ["#109E8E", "#F18F7F"],
        stroke: {
          curve: "smooth",
        },

        title: {
          text: "Pediddos realizados x pedidos cancelados",
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
  }, [expectationData, canceledOrders]);

  return (
    <div className="w-[640px] h-[400px] bg-white rounded-[12px] opacity-100">
      {isLoading ? (
        <p className="text-lg font-bold text-[#4E5D66] mb-4">Carregando...</p>
      ) : (
        expectationData.length && canceledOrders.length > 0 && (
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

export default OrdersCharts;
