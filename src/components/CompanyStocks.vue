<template>
  <div class="common-stocks-container">
    <h2>Common Stocks (Press on any stock to retrieve company info)</h2>
    <div class="row" v-for="(stock, i) in groupedStocks" :key="i">
      <div class="col-3 px-5" v-for="(company, i) in stock" :key="i">
        <div
          class="company-card card my-2 pa-2"
          :style="{
            backgroundColor: company.color,
            color: company.fontColor ? company.fontColor : '#000'
          }"
          @click="retrieveStockInfo(company)"
        >
          <div class="card-body mx-auto">
            <div class="card-title">
              <h4>{{ company.name }} ({{ company.ticker }})</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import moment from "moment";

export default {
  data() {
    return {
      stockList: [
        { id: 1, name: "Apple Inc", ticker: "AAPL", color: "#f9f6ef" },
        { id: 2, name: "Amazon", ticker: "AMZN", color: "#ff9900" },
        { id: 3, name: "Microsoft", ticker: "MSFT", color: "#f25022" },
        {
          id: 4,
          name: "Tesla",
          ticker: "TSLA",
          color: "#e82127",
          fontColor: "#FFF"
        },
        {
          id: 5,
          name: "Facebook",
          ticker: "FB",
          color: "#4267B2",
          fontColor: "#FFF"
        },
        {
          id: 6,
          name: "Johnson & Johnson",
          ticker: "JNJ",
          color: "#FFF",
          fontColor: "#F30618"
        },
        {
          id: 7,
          name: "Home Depot",
          ticker: "HD",
          color: "#f96302",
          fontColor: "#FFF"
        },
        {
          id: 8,
          name: "Google",
          ticker: "GOOG",
          color: "#FFF",
          fontColor: "#4285F4"
        },
        {
          id: 9,
          name: "Coca-Cola",
          ticker: "KO",
          color: "#F40009",
          fontColor: "#FFF"
        },
        {
          id: 10,
          name: "Nike",
          ticker: "NKE",
          color: "#000",
          fontColor: "#FFF"
        },
        {
          id: 11,
          name: "Visa",
          ticker: "V",
          color: "#1a1f71",
          fontColor: "#FFF"
        },
        {
          id: 12,
          name: "Disney",
          ticker: "DIS",
          color: "#746bab",
          fontColor: "#FFF"
        },
        {
          id: 13,
          name: "Walmart",
          ticker: "WMT",
          color: "#0072CE",
          fontColor: "#FFF"
        },
        {
          id: 14,
          name: "McDonald's",
          ticker: "MCD",
          color: "#DA291C",
          fontColor: "#FFC72C"
        },
        {
          id: 15,
          name: "Starbucks",
          ticker: "SBUX",
          color: "#00704a",
          fontColor: "#FFF"
        },
        {
          id: 16,
          name: "Proctor & Gamble",
          ticker: "PG",
          color: "#0037B1",
          fontColor: "#FFF"
        },
        {
          id: 17,
          name: "AT&T",
          ticker: "T",
          color: "#00a8e0",
          fontColor: "#FFF"
        },
        {
          id: 18,
          name: "JPMorgan Chase",
          ticker: "JPM",
          color: "#154C8A",
          fontColor: "#FFF"
        },
        {
          id: 19,
          name: "UPS",
          ticker: "UPS",
          color: "#351C15",
          fontColor: "#FFB500"
        },
        {
          id: 20,
          name: "Pepsi",
          ticker: "PG",
          color: "#005cb4",
          fontColor: "#FFF"
        }
      ]
    };
  },

  methods: {
    retrieveStockInfo(company) {
      const payload = {
        ticker: company.ticker.toUpperCase(),
        from: moment()
          .subtract(1, "Y")
          .format("YYYY-MM-DD"),
        to: moment().format("YYYY-MM-DD")
      };
      this.$store.dispatch("retrieveCompanyOverview", payload);
    }
  },

  computed: {
    groupedStocks() {
      return _.chunk(this.stockList, 4);
    }
  }
};
</script>

<style scoped>
.company-card:hover {
  cursor: pointer;
  transform: scale(1.05);
}
</style>
