import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(Vuex);

Vue.use(VueAxios, axios);

const baseURL = "https:/finnhub.io/api/v1";
const tokenKey = process.env.VUE_APP_FINNHUB_API_KEY;

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    basicFinancials: [],
    companyProfile: [],
    quote: []
  },
  actions: {
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
    },

    retrieveCompanyProfile: ({ commit }, payload) => {
      return new Promise((resolve, reject) => {
        Vue.axios
          .get(
            `${baseURL}/stock/profile2?symbol=${payload.ticker}&token=${tokenKey}`
          )
          .then(resp => {
            commit("updateCompanyProfile", resp.data);
            resolve();
          })
          .catch(err => {
            // @TODO create proper error response handling
            console.log(err);
            reject();
          });
      });
    },

    retrieveBasicFinancials: ({ commit }, payload) => {
      return new Promise((resolve, reject) => {
        Vue.axios
          .get(
            `${baseURL}/stock/metric?symbol=${payload.ticker}&metric=all&token=${tokenKey}`
          )
          .then(resp => {
            commit("updateBasicFinancials", resp.data);
            resolve();
          })
          .catch(err => {
            // @ TODO create proper error response handling
            console.log(err);
            reject();
          });
      });
    }
  },
  mutations: {
    updateQuote: (state, data) => {
      state.quote = data;
    },

    updateCompanyProfile: (state, data) => {
      state.companyProfile = data;
    },

    updateBasicFinancials: (state, data) => {
      state.basicFinancials = data;
    }
  },
  modules: {}
});
