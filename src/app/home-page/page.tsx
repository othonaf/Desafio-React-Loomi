"use client";
import DashMonthlyOrders from "@/components/charts/MonthlyOrdersChart";
import Navbar from "@/components/navbar";
import backg from "@/assets/Curve-patterns.svg";
import DashTickets from "@/components/DashTickets";
import DashAlerts from "@/components/DashAlerts";
import { useEffect, useState } from "react";
import SideBar from "@/components/SideBar";
import { ApiCalls } from "@/api";
import DashOrders from "@/components/DashOrders";
import ProfitChart from "@/components/charts/ProfitChart";
import OrdersCharts from "@/components/charts/OrdersCharts";
import OrdersByCategory from "@/components/charts/OrdersByCategory";
import TransactionsByAge from "@/components/charts/TransactionsByAge";
import SectionsByGender from "@/components/charts/SectionsByGender";
import TransactionsByClientType from "@/components/charts/TransactionsByClientType";
import ProductList from "@/components/ProductList";

interface ProductAlert {
  type: string;
  value: number;
  since: string;
}

interface TicketData {
  value: number;
  growth: number;
}

export default function HomePage() {
  const apiData = new ApiCalls();
  const [ticketDataDaily, setticketDataDaily] = useState<TicketData>({
    value: 0,
    growth: 0,
  });
  const [ticketDataMonthly, setticketDataMonthly] = useState<TicketData>({
    value: 0,
    growth: 0,
  });
  const [productAlerts, setProductAlerts] = useState<ProductAlert[]>([]);
  const [storageDown, setStorageDown] = useState<ProductAlert[]>([]);
  const [dataMonthlyOrders, setDataMonthlyOrders] = useState<TicketData>({
    value: 0,
    growth: 0,
  });
  const [dataMonthlySells, setDataMonthlySells] = useState<TicketData>({
    value: 0,
    growth: 0,
  });
  const [dataConversions, setDataConversions] = useState<TicketData>({
    value: 0,
    growth: 0,
  });
  const [productsView, setProductsView] = useState<TicketData>({
    value: 0,
    growth: 0,
  });
  const [productsPageConversion, setProductsPageConversion] =
    useState<TicketData>({
      value: 0,
      growth: 0,
    });
  const [productsAddToCart, setProductsAddToCart] = useState<TicketData>({
    value: 0,
    growth: 0,
  });
  const [checkoutEmailPerMonth, setCheckoutEmailPerMonth] =
    useState<TicketData>({
      value: 0,
      growth: 0,
    });
  const [checkoutPaymentsPerMonth, setCheckoutPaymentsPerMonth] =
    useState<TicketData>({
      value: 0,
      growth: 0,
    });
  const [checkoutFreightPerMonth, setCheckoutFreightPerMonth] =
    useState<TicketData>({
      value: 0,
      growth: 0,
    });
  /*
    ! INFORMAÇÃO IMPORTANTE PARA O AVALIADOR:
    
    * Por motivo de organização e tentar melhorar a legilibilidade do código, organizei as chamadas aos endpoints dos cards superiores como métodos da classe 'ApiCalls', instanciada aqui em 'apiData' e estou chamando-os nos hooks abaixo:
    
  */
  // Chamada de dados Diários
  useEffect(() => {
    const fetchData = async () => {
      const dailyData = await apiData.dadosTicketDay();
      if (dailyData) {
        setticketDataDaily(dailyData);
      }
    };
    fetchData();
  }, []);

  // Chamada de dados Mensais
  useEffect(() => {
    const fetchData = async () => {
      const monthlyData = await apiData.dadosTicketMonth();
      if (monthlyData) {
        setticketDataMonthly(monthlyData);
      }
    };
    fetchData();
  }, []);

  // Chamada de dados de Produtos em manutenção
  useEffect(() => {
    const fetchData = async () => {
      const maintenanceProducts = await apiData.dadosAlertProducts();
      setProductAlerts(maintenanceProducts);
    };
    fetchData();
  }, []);

  // Chamada de dados de Produtos Acabando em Estoque
  useEffect(() => {
    const fetchData = async () => {
      const productsStorageDown = await apiData.dadosStorageDown();
      setStorageDown(productsStorageDown);
    };
    fetchData();
  }, []);

  // Chamada de dados de Pedidos Mensais:
  useEffect(() => {
    const fetchData = async () => {
      const MonthlyOrders = await apiData.dataMonthlyOrders();
      if (MonthlyOrders) {
        setDataMonthlyOrders(MonthlyOrders);
      }
    };
    fetchData();
  }, []);

  // Chamada de Produtos Vendidos no mês:
  useEffect(() => {
    const fetchData = async () => {
      const dailyData = await apiData.dataMonthlySells();
      if (dailyData) {
        setDataMonthlySells(dailyData);
      }
    };
    fetchData();
  }, []);

  // Chamada de Dados de Conversões:
  useEffect(() => {
    const fetchData = async () => {
      const conversions = await apiData.conversionsPerDay();
      if (conversions) {
        const totalPerDay = conversions["total-per-day"];
        const productsViewPerMonth = conversions["products-view-per-month"];
        const productsPageConversionsPerMonth =
          conversions["product-page-conversion-per-month"];
        const dataAddToCart = conversions["add-to-cart-per-month"];
        const checkoutEmail = conversions["checkout-email-per-month"];
        const checkoutPayments = conversions["checkout-payment-per-month"];
        const checkoutFreight = conversions["checkout-freight-per-month"];
        setProductsView(productsViewPerMonth);
        setDataConversions(totalPerDay);
        setProductsPageConversion(productsPageConversionsPerMonth);
        setProductsAddToCart(dataAddToCart);
        setCheckoutEmailPerMonth(checkoutEmail);
        setCheckoutPaymentsPerMonth(checkoutPayments);
        setCheckoutFreightPerMonth(checkoutFreight);
      }
    };
    fetchData();
  }, []);

  // Bloco de código para formatar o valor em R$
  const formattedDailyValue = new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(ticketDataDaily.value);

  const formattedMonthlyValue = new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(ticketDataMonthly.value);

  return (
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
            <section>
              <h1 className="text-2xl font-ubuntu font-bold mb-6 text-black">
                Início
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-8">
                <DashTickets
                  titulo="Ticket Médio Últimas 24h"
                  subtitulo={`${ticketDataDaily.growth > 0 ? "+" : ""} ${
                    ticketDataDaily.growth
                  }% em relação ao dia anterior`}
                  valor={formattedDailyValue}
                />
                <DashTickets
                  titulo="Ticket Médio mensal"
                  subtitulo={`${ticketDataMonthly.growth > 0 ? "+" : ""} ${
                    ticketDataMonthly.growth
                  }% em relação ao mês anterior`}
                  valor={formattedMonthlyValue}
                />
                {productAlerts.length > 0 ? (
                  <DashAlerts
                    titulo="Produtos em manutenção"
                    subtitulo={`Desde ${productAlerts[0].since}`}
                    valor={`${productAlerts[0].value} produtos`}
                  />
                ) : (
                  <DashAlerts
                    titulo="Produtos em manutenção"
                    subtitulo="Sem dados disponíveis"
                    valor="0 produtos"
                  />
                )}
                {storageDown.length > 0 ? (
                  <DashAlerts
                    titulo="Acabando o estoque"
                    subtitulo={`Desde ${storageDown[0].since}`}
                    valor={`${storageDown[0].value} produtos`}
                  />
                ) : (
                  <DashAlerts
                    titulo="Acabando o estoque"
                    subtitulo="Sem dados disponíveis"
                    valor="0 produtos"
                  />
                )}
                <DashOrders
                  titulo="Pedidos realizados no mês"
                  subtitulo={`${dataMonthlyOrders.growth > 0 ? "+" : ""} ${
                    dataMonthlyOrders.growth
                  }% em relação ao dia anterior`}
                  valor={dataMonthlyOrders.value}
                />
                <DashOrders
                  titulo="Produtos vendidos no mês"
                  subtitulo={`${dataMonthlySells.growth > 0 ? "+" : ""} ${
                    dataMonthlySells.growth
                  }% em relação ao dia anterior`}
                  valor={dataMonthlySells.value}
                />
              </div>
            </section>

            <section className="w-full">
              <h1 className="text-3xl font-bold text-[#5A4CA7] mb-8">
                Dashboard de vendas
              </h1>
              <div className="flex gap-6 flex-wrap justify-between px-6 overflow-y-hidden mx-auto">
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
            </section>

            <section>
              <h1 className="text-3xl font-ubuntu mt-14 font-bold text-[#5A4CA7] mb-8">
                Funil de conversão
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-8">
                <DashOrders
                  titulo="Seções"
                  subtitulo={`${dataConversions.growth > 0 ? "+" : ""} ${
                    dataConversions.growth
                  }% em relação ao dia anterior`}
                  valor={dataConversions.value}
                />
                <DashOrders
                  titulo="Visualizações de Produto"
                  subtitulo={`${productsView.growth > 0 ? "+" : ""} ${
                    productsView.growth
                  }% em relação ao dia anterior`}
                  valor={productsView.value}
                />
                <DashOrders
                  titulo="Conversão para a página de produtos"
                  subtitulo={`${productsPageConversion.growth > 0 ? "+" : ""} ${
                    productsPageConversion.growth
                  }% em relação ao dia anterior`}
                  valor={productsPageConversion.value}
                />
                <DashOrders
                  titulo="Adições ao carrinho"
                  subtitulo={`${productsAddToCart.growth > 0 ? "+" : ""} ${
                    productsAddToCart.growth
                  }% em relação ao dia anterior`}
                  valor={productsAddToCart.value}
                />
                <DashOrders
                  titulo="Checkout - E-mail"
                  subtitulo={`${checkoutEmailPerMonth.growth > 0 ? "+" : ""} ${
                    checkoutEmailPerMonth.growth
                  }% em relação ao dia anterior`}
                  valor={checkoutEmailPerMonth.value}
                />
                <DashOrders
                  titulo="Checkout - Pagamento"
                  subtitulo={`${
                    checkoutPaymentsPerMonth.growth > 0 ? "+" : "-"
                  } ${
                    checkoutPaymentsPerMonth.growth
                  }% em relação ao dia anterior`}
                  valor={checkoutPaymentsPerMonth.value}
                />
                <DashOrders
                  titulo="Checkout - Entrega"
                  subtitulo={`${
                    checkoutFreightPerMonth.growth > 0 ? "+" : ""
                  } ${
                    checkoutFreightPerMonth.growth
                  }% em relação ao dia anterior`}
                  valor={checkoutFreightPerMonth.value}
                />
              </div>
            </section>

            <section>
              <h1 className="text-3xl font-ubuntu font-bold text-[#5A4CA7] mb-8">
                Perfil do usuário
              </h1>
              <div className="flex gap-6 flex-wrap px-6 overflow-y-hidden mx-auto">
                <div className="w-[580px]">
                  <TransactionsByAge />
                </div>
                <div>
                  <SectionsByGender />
                </div>
                <div>
                  <TransactionsByClientType />
                </div>
              </div>
            </section>

            <div className="ml-2 pl-2">
              <ProductList />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
