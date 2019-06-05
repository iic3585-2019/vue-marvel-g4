export default {
  cityName(state) {
    return state.name;
  },
  lastFetch(state) {
    return state.lastFetch;
  },
  scaleName(state) {
    return state.scale.name;
  },
  fetching(state) {
    return state.fetching;
  },
  forecast(state) {
    return state.forecast;
  },
  history(state) {
    return state.history;
  }
};
