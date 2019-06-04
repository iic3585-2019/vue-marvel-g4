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
  updateWeather(state, weatherData) {
    if (state.lastFetch) {
      state.history.push(state.lastFetch);
    }

    state.lastFetch = weatherData;

    state.fetching = false;
  },
  updateForecast(state, forecastData) {
    state.forecast = forecastData;
    state.fetching = false;
  }
};
