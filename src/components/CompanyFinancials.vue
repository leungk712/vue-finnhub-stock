<template>
  <div class="card stock-info-card" style="width: 140%">
    <div class="card-body text-left">
      <h5 class="card-title">Company Financials</h5>
      <div class="row mt-3">
        <div class="col-12">
          <span class="financial-key">Market Capitalization:</span>
          <span class="financial-value ml-1">
            {{ formatMarketCap(company.MarketCapitalization) }}
          </span>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-4">
          <span class="financial-key">52 Week Low:</span>
          <span class="financial-value ml-1"
            >${{ parseFloat(company["52WeekLow"]).toFixed(2) }}</span
          >
        </div>
        <div class="col-4">
          <span class="financial-key">52 Week High:</span>
          <span class="financial-value ml-1"
            >${{ parseFloat(company["52WeekHigh"]).toFixed(2) }}</span
          >
        </div>
        <div class="col-4">
          <span class="financial-key">Analyst Price Target:</span>
          <span class="financial-value ml-1"
            >${{ company.AnalystTargetPrice }}</span
          >
        </div>
      </div>

      <div class="row mt-3">
        <div class="col-4">
          <span class="financial-key">EPS:</span>
          <span class="financial-value ml-1"
            >${{ parseFloat(company.EPS).toFixed(2) }}</span
          >
        </div>
        <div class="col-4">
          <span class="financial-key">PE Ratio:</span>
          <span class="financial-value ml-1">
            {{ parseFloat(company.PERatio).toFixed(2) }}
          </span>
        </div>
        <div class="col-4">
          <span class="financial-key">PEG Ratio:</span>
          <span class="financial-value ml-1">
            {{ parseFloat(company.PEGRatio).toFixed(2) }}
          </span>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-4">
          <span class="financial-key">Dividend:</span>
          <span
            class="financial-value ml-1"
            v-if="company.DividendPerShare !== 'None'"
            >${{ parseFloat(company.DividendPerShare).toFixed(2) }}</span
          >
          <span v-else class="ml-1">N/A</span>
        </div>
        <div class="col-4">
          <span class="financial-key">Dividend Yield:</span>
          <span class="financial-value ml-1"
            >{{ parseFloat(company.DividendYield * 100).toFixed(1) }}%</span
          >
        </div>
        <div class="col-4">
          <span class="financial-key">Dividend Date:</span>
          <span
            class="financial-value ml-1"
            v-if="company.DividendDate !== 'None'"
            >{{ dateFormat(company.DividendDate) }}</span
          >
          <span v-else class="ml-1">N/A</span>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-4">
          <span class="financial-key">Ex. Dividend Date:</span>
          <span
            class="financial-value ml-1"
            v-if="company.ExDividendDate !== 'None'"
            >{{ dateFormat(company.ExDividendDate) }}</span
          >
          <span v-else class="ml-1">N/A</span>
        </div>
        <div class="col-4">
          <span class="financial-key">Beta:</span>
          <span class="financial-value ml-1">{{
            parseFloat(company.Beta).toFixed(2)
          }}</span>
        </div>
        <div class="col-4">
          <span class="financial-key"></span>
          <span class="financial-value ml-1"></span>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-4">
          <span class="financial-key"></span>
          <span class="financial-value ml-1"></span>
        </div>
        <div class="col-4">
          <span class="financial-key"></span>
          <span class="financial-value ml-1"></span>
        </div>
        <div class="col-4">
          <span class="financial-key"></span>
          <span class="financial-value ml-1"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";

export default {
  data() {
    return {};
  },

  methods: {
    dateFormat(date) {
      return moment(date).format("MM/DD/YYYY");
    },

    formatMarketCap(cap) {
      const marketCap = parseFloat(cap);

      if (marketCap >= 1000000000000) {
        return (marketCap / 1000000000000).toFixed(3) + "T";
      } else if (marketCap >= 1000000000) {
        return (marketCap / 1000000000).toFixed(2) + "B";
      } else if (marketCap / 1000000) {
        return (marketCap / 1000000).toFixed(3) + "M";
      }
    }
  },

  computed: {
    ...mapState({
      company: state => state.companyOverview,
      balanceSheet: state => state.balanceSheet,
      incomeStatement: state => state.incomeStatement,
      finnhubProfile: state => state.finnhubProfile,
      quote: state => state.quote
    })
  }
};
</script>

<style scoped></style>
