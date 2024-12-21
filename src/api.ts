import axios from "axios";

export class ApiCalls {
  // Código para receber dados Diários
  async dadosTicketDay() {
    const url = "https://628bf017667aea3a3e387e51.mockapi.io/avg-ticket-day";
    try {
      const response = await axios.get(url);
      const dailyData = response.data;

      if (!dailyData) {
        console.log("dados diários vazio.");
        return;
      }
      return dailyData;
    } catch (error) {
      console.log(`Erro ao tentar acessar dados diários: ${error}`);
      return error;
    }
  }

  // Código para receber dados Mensais
  async dadosTicketMonth() {
    const url = "https://628bf017667aea3a3e387e51.mockapi.io/avg-ticket-month";
    try {
      const response = await axios.get(url);
      const monthlyData = response.data;

      if (!monthlyData) {
        console.log("dados mensais vazio.");
        return;
      }
      return monthlyData;
    } catch (error) {
      console.log(`Erro ao tentar acessar dados mensais: ${error}`);
      return error;
    }
  }

  // Código para receber dados de Produtos em manutenção
  async dadosAlertProducts() {
    const url = "https://628bf017667aea3a3e387e51.mockapi.io/alerts";
    try {
      const response = await axios.get(url);
      const productsAlert = response.data;

      if (!productsAlert) {
        console.log("dados de alerta de produtos vazio.");
        return [];
      }

      const maintenanceProducts = productsAlert
        .filter((p: { type: string }) => p.type === "Produtos em manutenção")
        .map((p: { type: string; value: number; since: string }) => ({
          ...p,
          since: this.formatDate(p.since),
        }));

      return maintenanceProducts;
    } catch (error) {
      console.log(
        `Erro ao tentar acessar dados de alertas de produtos: ${error}`
      );
      return [];
    }
  }

  // Código para receber dados de Produtos Acabando em Estoque
  async dadosStorageDown() {
    const url = "https://628bf017667aea3a3e387e51.mockapi.io/alerts";
    try {
      const response = await axios.get(url);
      const productsAlert = response.data;

      if (!productsAlert) {
        console.log("dados de alerta de produtos vazio.");
        return [];
      }

      const productsStorageDown = productsAlert
        .filter((p: { type: string }) => p.type === "Acabando o estoque")
        .map((p: { type: string; value: number; since: string }) => ({
          ...p,
          since: this.formatDate(p.since),
        }));

      return productsStorageDown;
    } catch (error) {
      console.log(
        `Erro ao tentar acessar dados de alertas de produtos: ${error}`
      );
      return [];
    }
  }

  // Código para receber Dados de Pedidos Realizados no mês:
  async dataMonthlyOrders() {
    const url = "https://628bf017667aea3a3e387e51.mockapi.io/orders-month";
    try {
      const response = await axios.get(url);
      const dataMonthly = response.data;

      if (!dataMonthly) {
        console.log("dados diários vazio.");
        return;
      }
      return dataMonthly;
    } catch (error) {
      console.log(`Erro ao tentar acessar dados diários: ${error}`);
      return error;
    }
  }

  // Código para receber Dados de Vendas Realizadas no mês:
  async dataMonthlySells() {
    const url = "https://628bf017667aea3a3e387e51.mockapi.io/sells-month";
    try {
      const response = await axios.get(url);
      const dataMonthly = response.data;

      if (!dataMonthly) {
        console.log("dados diários vazio.");
        return;
      }
      return dataMonthly;
    } catch (error) {
      console.log(`Erro ao tentar acessar dados diários: ${error}`);
      return error;
    }
  }

  // Código para receber Dados de conversões:
  async conversionsPerDay() {
    const url = "https://628bf017667aea3a3e387e51.mockapi.io/conversions-resume";
    try {
      const response = await axios.get(url);
      const data = response.data;

      if (!data) {
        console.log("dados diários vazio.");
        return;
      }
      const conversions = data["total-per-day"]
      return data;
    } catch (error) {
      console.log(`Erro ao tentar acessar dados diários: ${error}`);
      return error;
    }
  }

  // Função para formatar a data
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("pt-BR").format(date);
  }
}
