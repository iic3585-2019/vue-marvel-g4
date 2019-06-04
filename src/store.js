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
    fetching: false,
    lastFetch: null,
    forecast: null,
    history: []
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
    },
    async fetchWeather(state) {
      state.fetching = true;
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
      state.fetching = false;
    },
    async fetchForecast(state) {
      state.fetching = true;
      const data = await fetch(
        "http://api.openweathermap.org/data/2.5/forecast?id=" +
          state.id +
          "&APPID=08763c0f0a8c7b51e8af42c6f38e9a40&units=" +
          state.scale.param
      ).then(data => data.json());
      let days = [];
      let forecast = [];

      data.list.forEach(element => {
        const day = new Date(element.dt_txt).getDay();
        if (!days.includes(day)) {
          days.push(day);
          forecast.push(element);
        }
      });
      state.forecast = forecast;
      state.fetching = false;
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
    },
    fetchForecast({ commit }) {
      commit("fetchForecast");
    }
  }
});
