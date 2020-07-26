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
    company: []
  },
  actions: {
    retrieveCompanyOverview: ({ commit }, payload) => {
      return new Promise((resolve, reject) => {
        Vue.axios
          .get(
            `${baseURL}/stock/metric?symbol=${payload.ticker}&metric=all&token=${tokenKey}`
          )
          .then(resp => {
            commit("updateCompanyOverview", resp.data);
            console.log(resp.data);
            resolve();
          })
          .catch(err => {
            console.log(err);
            reject();
          });
      });
    }
  },
  mutations: {
    updateCompanyOverview: (state, data) => {
      state.company = data;
    }
  },
  modules: {}
});
