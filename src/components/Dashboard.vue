<template>
  <div class="app mt-5 mb-3 pa-5">
    <div class="container">
      <div class="input-group stock-search-field mx-auto">
        <input
          type="text"
          class="form-control"
          placeholder="Search by stock symbol...(ex. HD, LOW, MCD)"
          v-model="stockTicker"
        />
        <button type="button" class="btn btn-info search-btn ml-2" @click="retrieveStockInfo">Search</button>
      </div>
    </div>

    <div v-if="loading" class="loading-bar mx-auto mt-3">
      <div class="progress">
        <div
          class="progress-bar bg-info progress-bar-striped progress-bar-animated"
          role="progressbar"
          style="width: 100%; height: 200px"
          :aria-valuenow="loading"
          aria-valuemin="0"
          aria-valuemax="100"
        >Loading...</div>
      </div>
    </div>

    <div
      id="stock-info-container"
      class="container-fluid mt-5 px-1 shadow-lg rounded stock-info"
      v-if="infoStatus && !loading"
    >
      <div class="row my-2 mx-2">
        <div class="col-5">
          <div class="company-profile">
            <div class="row">
              <div class="col-1">
                <img
                  v-if="this.finnhubProfile && this.finnhubProfile.logo"
                  :src="finnhubProfile.logo"
                  width="80"
                  height="80"
                />
              </div>
              <div class="company-name-exchange col-10 ml-5">
                <h3
                  class="text-left company-name"
                >{{ finnhubProfile.name }} ({{ finnhubProfile.ticker }})</h3>
                <p class="text-left font-weight-light company-exchange">{{ company.Exchange }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-3 text-left my-auto">
          <span>
            <h1>${{ quote.c.toFixed(2) }}</h1>
            <h6>{{ priceChange.priceDiff }} ({{ priceChange.pricePercentage }}%)</h6>
          </span>
        </div>
        <div class="col-3 text-left">
          <div class="row">
            <div class="col-6">
              <span class="price-key">Previous Close:</span>
              <span class="price-value ml-1">${{ quote.pc.toFixed(2) }}</span>
            </div>
            <div class="col-6">
              <span class="price-key">Open:</span>
              <span class="price-value ml-1">${{ quote.o.toFixed(2) }}</span>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-6">
              <span class="price-key">Low:</span>
              <span class="price-value ml-1">${{ quote.l.toFixed(2) }}</span>
            </div>
            <div class="col-6">
              <span class="price-key">High:</span>
              <span class="price-value ml-1">${{ quote.h.toFixed(2) }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="row mx-2 mt-5">
        <div class="col-lg-4 col-xl-5">
          <company-overview />
        </div>
        <div class="col-lg-4 col-xl-5">
          <company-financials />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CompanyOverview from "@/components/CompanyOverview";
import CompanyFinancials from "@/components/CompanyFinancials";

export default {
  components: {
    CompanyOverview,
    CompanyFinancials
  },

  props: {
    msg: {
      type: String
    }
  },

  data() {
    return {
      stockTicker: "",

      loading: false,
      infoStatus: false
    };
  },

  methods: {
    async retrieveStockInfo() {
      this.loading = true;
      const payload = {
        ticker: this.stockTicker.toUpperCase()
      };
      await this.$store.dispatch("retrieveCompanyOverview", payload);
      await this.$store.dispatch("retrieveBalanceSheet", payload);
      await this.$store.dispatch("retrieveIncomeStatement", payload);
      await this.$store.dispatch("retrieveFinnhubProfile", payload);
      await this.$store.dispatch("retrieveQuote", payload);
      this.infoStatus = true;
      this.loading = false;
    }
  },

  computed: {
    ...mapState({
      company: state => state.companyOverview,
      balanceSheet: state => state.balanceSheet,
      incomeStatement: state => state.incomeStatement,
      finnhubProfile: state => state.finnhubProfile,
      quote: state => state.quote
    }),

    priceChange() {
      if (this.quote.pc < this.quote.c) {
        return {
          priceDiff: `+$` + (this.quote.c - this.quote.pc).toFixed(2),
          pricePercentage:
            `+` +
            (((this.quote.c - this.quote.pc) / this.quote.pc) * 100).toFixed(2)
        };
      } else {
        return {
          priceDiff: `-$` + (this.quote.pc - this.quote.c).toFixed(2),
          pricePercentage:
            `-` +
            (((this.quote.pc - this.quote.c) / this.quote.pc) * 100).toFixed(2)
        };
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.loading-bar {
  width: 58vw;
  height: 25vh;
}
.search-btn {
  padding: 0 30px;
}
.stock-search-field {
  width: 80%;
}

.stock-search-field input.form-control {
  height: 50px;
}
.stock-info {
  width: 90vw;
  padding: 1rem;
}
</style>
