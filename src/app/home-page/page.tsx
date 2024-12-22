"use client";
import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
  createContext,
  useContext,
} from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/navbar";
import backg from "@/assets/Curve-patterns.svg";
import DashTickets from "@/components/DashTickets";
import DashAlerts from "@/components/DashAlerts";
import SideBar from "@/components/SideBar";
import { ApiCalls } from "@/api";
import DashOrders from "@/components/DashOrders";
import ProductList from "@/components/ProductList";

// Componentes com carregamento dinâmico
const DashMonthlyOrders = dynamic(
  () => import("@/components/charts/MonthlyOrdersChart"),
  {
    loading: () => <p>Carregando gráfico de pedidos mensais...</p>,
  }
);
const ProfitChart = dynamic(() => import("@/components/charts/ProfitChart"), {
  loading: () => <p>Carregando gráfico de lucro...</p>,
});
const OrdersCharts = dynamic(() => import("@/components/charts/OrdersCharts"), {
  loading: () => <p>Carregando gráficos de pedidos...</p>,
});
const OrdersByCategory = dynamic(
  () => import("@/components/charts/OrdersByCategory"),
  {
    loading: () => <p>Carregando gráfico de pedidos por categoria...</p>,
  }
);
const TransactionsByAge = dynamic(
  () => import("@/components/charts/TransactionsByAge"),
  {
    loading: () => <p>Carregando gráfico de transações por idade...</p>,
  }
);
const SectionsByGender = dynamic(
  () => import("@/components/charts/SectionsByGender"),
  {
    loading: () => <p>Carregando gráfico de seções por gênero...</p>,
  }
);
const TransactionsByClientType = dynamic(
  () => import("@/components/charts/TransactionsByClientType"),
  {
    loading: () => (
      <p>Carregando gráfico de transações por tipo de cliente...</p>
    ),
  }
);

// Interfaces
interface TicketData {
  value: number;
  growth: number;
}

interface ProductAlert {
  type: string;
  value: number;
  since: string;
}

interface DashboardData {
  ticketDataDaily: TicketData;
  ticketDataMonthly: TicketData;
  productAlerts: ProductAlert[];
  storageDown: ProductAlert[];
  dataMonthlyOrders: TicketData;
  dataMonthlySells: TicketData;
  dataConversions: TicketData;
  productsView: TicketData;
  productsPageConversion: TicketData;
  productsAddToCart: TicketData;
  checkoutEmailPerMonth: TicketData;
  checkoutPaymentsPerMonth: TicketData;
  checkoutFreightPerMonth: TicketData;
}

// Criação do contexto
const DashboardContext = createContext<DashboardData | null>(null);

// Hook personalizado para usar o contexto
const useDashboardContext = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error(
      "useDashboardContext deve ser usado dentro de um DashboardProvider"
    );
  }
  return context;
};

// Componente principal
export default function HomePage() {
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    ticketDataDaily: { value: 0, growth: 0 },
    ticketDataMonthly: { value: 0, growth: 0 },
    productAlerts: [],
    storageDown: [],
    dataMonthlyOrders: { value: 0, growth: 0 },
    dataMonthlySells: { value: 0, growth: 0 },
    dataConversions: { value: 0, growth: 0 },
    productsView: { value: 0, growth: 0 },
    productsPageConversion: { value: 0, growth: 0 },
    productsAddToCart: { value: 0, growth: 0 },
    checkoutEmailPerMonth: { value: 0, growth: 0 },
    checkoutPaymentsPerMonth: { value: 0, growth: 0 },
    checkoutFreightPerMonth: { value: 0, growth: 0 },
  });

  const apiData = useMemo(() => new ApiCalls(), []);

  const fetchDashboardData = useCallback(async () => {
    try {
      const [
        dailyTicket,
        monthlyTicket,
        alertProducts,
        storageDownProducts,
        monthlyOrders,
        monthlySells,
        conversions,
      ] = await Promise.all([
        apiData.dadosTicketDay(),
        apiData.dadosTicketMonth(),
        apiData.dadosAlertProducts(),
        apiData.dadosStorageDown(),
        apiData.dataMonthlyOrders(),
        apiData.dataMonthlySells(),
        apiData.conversionsPerDay(),
      ]);

      setDashboardData({
        ticketDataDaily: dailyTicket,
        ticketDataMonthly: monthlyTicket,
        productAlerts: alertProducts,
        storageDown: storageDownProducts,
        dataMonthlyOrders: monthlyOrders,
        dataMonthlySells: monthlySells,
        dataConversions: conversions["total-per-day"],
        productsView: conversions["products-view-per-month"],
        productsPageConversion:
          conversions["product-page-conversion-per-month"],
        productsAddToCart: conversions["add-to-cart-per-month"],
        checkoutEmailPerMonth: conversions["checkout-email-per-month"],
        checkoutPaymentsPerMonth: conversions["checkout-payment-per-month"],
        checkoutFreightPerMonth: conversions["checkout-freight-per-month"],
      });
    } catch (error) {
      console.error("Erro ao buscar dados do dashboard:", error);
    }
  }, [apiData]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const formattedDailyValue = useMemo(() => {
    return new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(dashboardData.ticketDataDaily.value);
  }, [dashboardData.ticketDataDaily.value]);

  const formattedMonthlyValue = useMemo(() => {
    return new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(dashboardData.ticketDataMonthly.value);
  }, [dashboardData.ticketDataMonthly.value]);

  return (
    <DashboardContext.Provider value={dashboardData}>
      <div className="min-h-screen flex bg-gray-50 relative overflow-x-auto mx-auto">
        <SideBar />
        <div className="flex-1 flex flex-col min-w-[1920px] pl-[108px] pr-6 overflow-y-hidden mx-auto">
          <Navbar />
          <main className="flex-1 p-6 pt-24 min-w-fit">
            <div
              className="w-full h-full relative space-x-4 min-w-fit"
              style={{
                backgroundImage: `url(${backg.src})`,
                backgroundSize: "cover",
              }}
            >
              <h3 className="text-gray-700 text-3xl font-ubuntu">Início</h3>
              <div className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-8">
                  <DashTickets
                    titulo="Ticket médio diário"
                    subtitulo={`${
                      dashboardData.ticketDataDaily.growth >= 0 ? "+" : ""
                    }${
                      dashboardData.ticketDataDaily.growth
                    }% em relação ao dia anterior`}
                    valor={formattedDailyValue}
                  />
                  <DashTickets
                    titulo="Ticket médio mensal"
                    subtitulo={`${
                      dashboardData.ticketDataMonthly.growth >= 0 ? "+" : ""
                    }${
                      dashboardData.ticketDataMonthly.growth
                    }% em relação ao mês anterior`}
                    valor={formattedMonthlyValue}
                  />
                  {dashboardData.productAlerts.length > 0 ? (
                    <DashAlerts
                      titulo="Produtos em manutenção"
                      dados={dashboardData.productAlerts}
                    />
                  ) : null}
                  {dashboardData.storageDown.length > 0 ? (
                    <DashAlerts
                      titulo="Produtos acabando em estoque"
                      dados={dashboardData.storageDown}
                    />
                  ) : null}
                  <DashOrders
                    titulo="Pedidos no mês"
                    subtitulo={`${
                      dashboardData.dataMonthlyOrders.growth >= 0 ? "+" : ""
                    }${
                      dashboardData.dataMonthlyOrders.growth
                    }% em relação ao dia anterior`}
                    valor={dashboardData.dataMonthlyOrders.value}
                  />
                  <DashOrders
                    titulo="Produtos vendidos no mês"
                    subtitulo={`${
                      dashboardData.dataMonthlySells.growth >= 0 ? "+" : ""
                    }${
                      dashboardData.dataMonthlySells.growth
                    }% em relação ao dia anterior`}
                    valor={dashboardData.dataMonthlySells.value}
                  />
                </div>
              </div>
              <h3 className="text-gray-700 text-3xl font-ubuntu mt-8">
                Dashboard de vendas
              </h3>
              <div className="flex flex-col mt-8">
                <div className="flex gap-6 overflow-x-auto px-6 overflow-y-hidden mx-auto">
                  <div className="w-[400px] mr-14">
                    <DashMonthlyOrders />
                  </div>
                  <div className="w-[715px]">
                    <ProfitChart />
                  </div>
                  <div className="w-[400px]">
                    <OrdersCharts />
                  </div>
                  <div className="w-[350px] pt-6">
                    <OrdersByCategory />
                  </div>
                </div>
              </div>
              <h3 className="text-gray-700 text-3xl font-medium mt-8">
                Funil de conversão
              </h3>
              <div className="flex flex-wrap -mx-6 mt-4">
                <ConversionFunnelItem
                  data={dashboardData.dataConversions}
                  title="Conversões por dia"
                />
                <ConversionFunnelItem
                  data={dashboardData.productsView}
                  title="Visualizações de produtos"
                />
                <ConversionFunnelItem
                  data={dashboardData.productsPageConversion}
                  title="Conversões na página do produto"
                />
                <ConversionFunnelItem
                  data={dashboardData.productsAddToCart}
                  title="Adições ao carrinho"
                />
                <ConversionFunnelItem
                  data={dashboardData.checkoutEmailPerMonth}
                  title="E-mails no checkout"
                />
                <ConversionFunnelItem
                  data={dashboardData.checkoutPaymentsPerMonth}
                  title="Pagamentos no checkout"
                />
                <ConversionFunnelItem
                  data={dashboardData.checkoutFreightPerMonth}
                  title="Fretes no checkout"
                />
              </div>
              <h3 className="text-gray-700 text-3xl font-medium mt-8">
                Perfil do usuário
              </h3>
              <div className="flex flex-wrap -mx-6 mt-4">
                <div className="w-full px-6 sm:w-1/2 xl:w-1/3">
                  <TransactionsByAge />
                </div>
                <div className="w-full px-6 sm:w-1/2 xl:w-1/3">
                  <SectionsByGender />
                </div>
                <div className="w-full px-6 sm:w-1/2 xl:w-1/3">
                  <TransactionsByClientType />
                </div>
              </div>
              <ProductList />
            </div>
          </main>
        </div>
      </div>
    </DashboardContext.Provider>
  );
}

// Componente auxiliar para itens do funil de conversão
const ConversionFunnelItem = ({
  data,
  title,
}: {
  data: TicketData;
  title: string;
}) => {
  return (
    <DashOrders
      titulo={title}
      subtitulo={`${data.growth >= 0 ? "+" : ""}${
        data.growth
      }% em relação ao dia anterior`}
      valor={data.value}
    />
  );
};
