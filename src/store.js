import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    id: 3871336,
    name: "Santiago",
    lon: -70.64827,
    lat: -33.45694,
    scale: { name: "°C", param: "metric" },
    lastFetch: null,
    history: []
  },
  mutations: {
    updateCity(state, city) {
      state.id = city.id;
      state.name = city.name;
      state.lon = city.coord.lon;
      state.lat = city.coord.lat;
      this.dispatch("fetchWeather");
    },
    updateScale(state, scale) {
      state.scale = scale;
      this.dispatch("fetchWeather");
    },
    async fetchWeather(state) {
      const data = await fetch(
        "http://api.openweathermap.org/data/2.5/weather?id=" +
          state.id +
          "&APPID=08763c0f0a8c7b51e8af42c6f38e9a40&units=" +
          state.scale.param
      ).then(data => data.json());
      if (state.lastFetch) {
        state.history.push(state.lastFetch);
      }
      state.lastFetch = data;
    }
  },
  actions: {
    updateCity({ commit }, city) {
      commit("updateCity", city);
    },
    updateScale({ commit }, scale) {
      commit("updateScale", scale);
    },
    fetchWeather({ commit }) {
      commit("fetchWeather");
    }
  }
});
