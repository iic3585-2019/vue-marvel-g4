export default {
  updateCity(state, city) {
    state.id = city.id;
    state.name = city.name;
    state.lon = city.coord.lon;
    state.lat = city.coord.lat;
  },
  updateScale(state, scale) {
    state.scale = scale;
  },
  fetchingContent(state) {
    state.fetching = true;
  },
  updateWeather(state, weatherData) {
    state.lastFetch = weatherData;

    state.lastFetch._id = state.fetchCounter;
    state.lastFetch.scale = state.scale.name;
    state.lastFetch.time = new Date();
    state.history.unshift(state.lastFetch);
    state.fetchCounter += 1;

    state.fetching = false;
  },
  updateForecast(state, forecastData) {
    state.forecast = forecastData;
    state.fetching = false;
  }
};
