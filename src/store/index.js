import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(Vuex);

Vue.use(VueAxios, axios);

const baseURL = "https:/finnhub.io/api/v1";
const alphaURL = "https://www.alphavantage.co/query?function=";
const apiKey = process.env.VUE_APP_ALPHAVANTAGE_API_KEY;
const tokenKey = process.env.VUE_APP_FINNHUB_API_KEY;

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    balanceSheet: [],
    companyOverview: [],
    incomeStatement: [],
    finnhubProfile: [],
    quote: []
  },
  actions: {
    retrieveCompanyOverview: ({ commit }, payload) => {
      return new Promise((resolve, reject) => {
        Vue.axios
          .get(`${alphaURL}OVERVIEW&symbol=${payload.ticker}&apikey=${apiKey}`)
          .then(resp => {
            commit("updateCompanyOverview", resp.data);
            resolve();
          })
          .catch(err => {
            console.log(err);
            reject();
          });
      });
    },

    retrieveBalanceSheet: ({ commit }, payload) => {
      return new Promise((resolve, reject) => {
        Vue.axios
          .get(
            `${alphaURL}BALANCE_SHEET&symbol=${payload.ticker}&apikey=${apiKey}`
          )
          .then(resp => {
            commit("updateBalanceSheet", resp.data);
            resolve();
          })
          .catch(err => {
            console.log(err);
            reject();
          });
      });
    },

    retrieveIncomeStatement: ({ commit }, payload) => {
      return new Promise((resolve, reject) => {
        Vue.axios
          .get(
            `${alphaURL}INCOME_STATEMENT&symbol=${payload.ticker}&apikey=${apiKey}`
          )
          .then(resp => {
            commit("updateIncomeStatement", resp.data);
            resolve();
          })
          .catch(err => {
            console.log(err);
            reject();
          });
      });
    },

    retrieveFinnhubProfile: ({ commit }, payload) => {
      return new Promise((resolve, reject) => {
        Vue.axios
          .get(
            `${baseURL}/stock/profile2?symbol=${payload.ticker}&token=${tokenKey}`
          )
          .then(resp => {
            commit("updateFinnhubProfile", resp.data);
            resolve();
          })
          .catch(err => {
            console.log(err);
            reject();
          });
      });
    },

    retrieveQuote: ({ commit }, payload) => {
      return new Promise((resolve, reject) => {
        Vue.axios
          .get(`${baseURL}/quote?symbol=${payload.ticker}&token=${tokenKey}`)
          .then(resp => {
            commit("updateQuote", resp.data);
            resolve();
          })
          .catch(err => {
            // @TODO create proper error response handling
            console.log(err);
            reject();
          });
      });
    }
  },
  mutations: {
    updateCompanyOverview: (state, data) => {
      state.companyOverview = data;
    },

    updateBalanceSheet: (state, data) => {
      state.balanceSheet = data;
    },

    updateIncomeStatement: (state, data) => {
      state.incomeStatement = data;
    },

    updateFinnhubProfile: (state, data) => {
      state.finnhubProfile = data;
    },

    updateQuote: (state, data) => {
      state.quote = data;
    }
  },
  modules: {}
});
