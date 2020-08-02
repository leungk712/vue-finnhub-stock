<template>
  <div class="header-container row my-2 mx-2">
    <div class="col-5">
      <div class="company-profile">
        <div class="row">
          <div class="col-1">
            <img
              v-if="this.finnhubProfile && this.finnhubProfile.logo.length"
              :src="finnhubProfile.logo"
              width="80"
              height="80"
              alt="Stock company logo"
            />
          </div>
          <div class="company-name-exchange col-10 ml-5">
            <h3 class="text-left company-name">
              {{ finnhubProfile.name }} ({{ finnhubProfile.ticker }})
            </h3>
            <p class="text-left font-weight-light company-exchange">
              {{ company.Exchange }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="col-3 text-left my-auto">
      <span>
        <h1>${{ quote.c.toFixed(2) }}</h1>
        <h6 :class="priceColor">
          {{ priceChange.priceDiff }} ({{ priceChange.pricePercentage }}%)
        </h6>
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
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },

  methods: {},

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
    },

    priceColor() {
      return this.priceChange.priceDiff.charAt(0) === "-"
        ? "text-danger"
        : "text-success";
    }
  }
};
</script>

<style scoped>
.header-container {
  border-bottom: 2px solid #f4f6f6;
}
</style>
