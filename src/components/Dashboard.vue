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
        <button
          type="button"
          class="btn btn-info search-btn ml-2"
          @click="retrieveStockInfo"
        >
          Search
        </button>
      </div>
    </div>

    <div v-show="!infoStatus && !loading" class="container-flex px-5 mx-5 mt-5">
      <CompanyStocks />
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
        >
          Loading...
        </div>
      </div>
    </div>

    <div
      id="stock-info-container"
      class="container-fluid mt-5 px-1 shadow-lg rounded stock-info"
      v-if="infoStatus && !loading"
    >
      <company-header />

      <div class="row mx-2 mt-5">
        <div class="col-lg-4 col-xl-5">
          <company-overview />
        </div>
        <div class="col-lg-4 col-xl-5">
          <company-financials />
          <company-news class="my-4" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";
import CompanyHeader from "@/components/CompanyHeader";
import CompanyOverview from "@/components/CompanyOverview";
import CompanyFinancials from "@/components/CompanyFinancials";
import CompanyNews from "@/components/CompanyNews";
import CompanyStocks from "@/components/CompanyStocks";

export default {
  components: {
    CompanyHeader,
    CompanyOverview,
    CompanyFinancials,
    CompanyNews,
    CompanyStocks
  },

  data() {
    return {
      stockTicker: ""
    };
  },

  methods: {
    async retrieveStockInfo() {
      const payload = {
        ticker: this.stockTicker.toUpperCase(),
        from: moment()
          .subtract(1, "Y")
          .format("YYYY-MM-DD"),
        to: moment().format("YYYY-MM-DD")
      };
      await this.$store.dispatch("retrieveCompanyOverview", payload);
    }
  },

  computed: {
    ...mapState({
      company: state => state.companyOverview,
      companyNews: state => state.companyNews,
      balanceSheet: state => state.balanceSheet,
      incomeStatement: state => state.incomeStatement,
      finnhubProfile: state => state.finnhubProfile,
      quote: state => state.quote,
      loading: state => state.loading,
      infoStatus: state => state.infoStatus
    })
  }
};
</script>

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
