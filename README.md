# Desadio Next.js Loomi

## Descrição:

Uma aplicação de interface Web criada em Next.js com tela de login, Dashboards, cadastro de produtos e visualização de vendas por região.

## :warning: Observação importante para o avaliador:

* Os dados da Api que deveriam alimentar o gráfico "Transações por aparelho" não existem no response do link informado. Por isso não criei este gráfico.
  
## Detalhes técnicos:

* Aplicação web SSR construída em Next.js.
* Gráficos dinâmicos criados com a biblioteca Apexcharts.js.
* Mapas interativos criados com geoJson. 
* Criei o arquivo 'middleware.ts' na raiz do projeto (src) para proteger páginas que devem ser acessadas apenas por usuários autenticados.
* O arquivo 'api.ts' também na pasta src contém uma classe com métodos de chamada aos endpoints que são importados e instanciados para serem usados em outros arquivos.

### Para instalar e iniciar localmente:

```bash
git clone https://github.com/othonaf/Desafio-React-Loomi.git

cd Desafio-React-Loomi/desafio-loomi

npm install
```

* Você poderá testar localmente através do comando:

```bash
npm run dev
```

* A aplicação estará disponível em http://localhost:3000