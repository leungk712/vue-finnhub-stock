<template>
  <div class="card stock-info-card" style="width: 100%">
    <div class="card-body text-left">
      <h5 class="card-title">Company Overview</h5>
      <div class="row mt-2">
        <div class="col-6">
          <span class="financial-key">Sector:</span>
          <span class="financial-value ml-1">{{ company.Sector }}</span>
        </div>
        <div class="col-6">
          <span class="financial-key">Industry:</span>
          <span class="financial-value ml-1">{{ company.Industry }}</span>
        </div>
      </div>
      <div class="company-description mt-4">{{ company.Description }}</div>
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
    })
  }
};
</script>

<style scoped></style>
