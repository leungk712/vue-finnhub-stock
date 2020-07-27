<template>
  <div class="app mt-5 pa-5">
    <div class="container">
      <div class="input-group">
        <div class="input-group-prepend">
          <span class="input-group-text">Hello</span>
        </div>
        <input
          type="text"
          class="form-control"
          placeholder="Search by stock symbol...(ex. HD, LOW, MCD)"
          v-model="stockTicker"
        />
      </div>
      <button
        type="button"
        class="btn btn-outline-info mt-3"
        @click="retrieveStockInfo"
      >
        Search
      </button>
    </div>

    <div
      class="container-fluid mt-5 px-1 shadow-lg rounded stock-info"
      v-if="infoStatus"
    >
      <div class="row my-2">
        <div class="col-5">
          <div class="company-profile">
            <div class="row">
              <div class="col-1">
                <img
                  v-if="this.companyProfile && this.companyProfile.logo"
                  :src="companyProfile.logo"
                  width="80"
                  height="80"
                />
              </div>
              <div class="col-10 ml-5">
                <h3 class="text-left company-name">
                  {{ companyProfile.name }} ({{ companyProfile.ticker }})
                </h3>
                <p class="text-left font-weight-light company-exchange">
                  {{ companyProfile.exchange }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-3 text-left my-auto">
          <span>
            <h1>${{ quote.c.toFixed(2) }}</h1>
            <h6>
              {{ priceChange.priceDiff }} ({{ priceChange.pricePercentage }}%)
            </h6>
          </span>
        </div>
        <div class="col-3 group-3"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    msg: {
      type: String
    }
  },

  data() {
    return {
      testAPI: process.env.VUE_APP_TEST,
      stockTicker: "",

      loading: false,
      infoStatus: false
    };
  },

  methods: {
    retrieveStockInfo() {
      this.infoStatus = true;
      const payload = {
        ticker: this.stockTicker
      };
      this.$store.dispatch("retrieveQuote", payload);
      this.$store.dispatch("retrieveBasicFinancials", payload);
      this.$store.dispatch("retrieveCompanyProfile", payload);
    }
  },

  computed: {
    ...mapState({
      quote: state => state.quote,
      companyProfile: state => state.companyProfile,
      basicFinancials: state => state.basicFinancials
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
.stock-info {
  width: 90vw;
  padding: 1rem;
}
</style>
