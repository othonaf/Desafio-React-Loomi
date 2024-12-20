// components/TransactionChart.tsx
'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface TransactionData {
  category: string;
  value: number;
}

export default function TransactionChart() {
  const [chartData, setChartData] = useState<TransactionData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://628bf017667aea3a3e387e51.mockapi.io/users-resume');
        const data = await response.json();
        setChartData(data['transactions-per-age']);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };

    fetchData();
  }, []);

  const chartOptions: ApexOptions = {
    chart: {
      type: 'bar',
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: {
          position: 'right'
        }
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function(val: number) {
        return `${val.toFixed(0)} mil`;
      },
      style: {
        fontSize: '12px'
      }
    },
    xaxis: {
      categories: chartData.map(item => item.category),
      labels: {
        formatter: function(val: string) {
          return `${val} mil`;
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          fontSize: '12px'
        }
      }
    },
    colors: ['#2E3A59'],
    grid: {
      borderColor: '#f1f1f1',
      xaxis: {
        lines: {
          show: true
        }
      }
    },
    tooltip: {
      enabled: true,
      style: {
        fontSize: '12px',
      },
      y: {
        formatter: function(val: number) {
          return `${val} mil`;
        }
      }
    }
  };

  const series = [{
    data: chartData.map(item => item.value)
  }];

  return (
    <div className="w-full max-w-[560px]">
        <h2 className="text-lg text-[#2E3A59] font-medium mb-4">Transações por idade</h2>
      {chartData.length > 0 && (
        <Chart
          options={chartOptions}
          series={series}
          type="bar"
          height={350}
        />
      )}
    </div>
  );
}
