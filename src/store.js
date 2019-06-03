import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    id: 3871336,
    name: "Santiago",
    lon: -70.64827,
    lat: -33.45694,
    scale: { name: "°C", param: "metric" }
  },
  mutations: {
    updateCity(state, city) {
      state.id = city.id;
      state.name = city.name;
      state.lon = city.coord.lon;
      state.lat = city.coord.lat;
    },
    updateScale(state, scale) {
      state.scale = scale;
    }
  },
  actions: {
    updateCity({ commit }, city) {
      commit("updateCity", city);
    },
    updateScale({ commit }, scale) {
      commit("updateScale", scale);
    }
  }
});
