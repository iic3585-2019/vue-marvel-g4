import Vue from "vue";
import Vuex from "vuex";
import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    id: 3871336,
    name: "Santiago",
    lon: -70.64827,
    lat: -33.45694,
    scale: { name: "°C", param: "metric" },
    fetching: true,
    lastFetch: {},
    forecast: [],
    history: [],
    fetchCounter: 0
  },
  getters,
  mutations,
  actions
});
