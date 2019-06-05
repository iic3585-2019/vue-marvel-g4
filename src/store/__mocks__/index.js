import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const getters = {
  cityName: jest.fn().mockReturnValue("fake-city-name"),
  lastFetch: jest.fn().mockReturnValue({}),
  scaleName: jest.fn().mockReturnValue("C"),
  fetching: jest.fn().mockReturnValue(false),
  forecast: jest.fn().mockReturnValue([])
};

export const mutations = {
  updateCity: jest.fn(),
  updateScale: jest.fn(),
  updateWeather: jest.fn(),
  updateForecast: jest.fn()
};

export const actions = {
  updateCity: jest.fn(),
  updateScale: jest.fn(),
  fetchWeather: jest.fn(),
  fetchForecast: jest.fn()
};

export const state = {
  id: 3871336,
  name: "Santiago",
  lon: -70.64827,
  lat: -33.45694,
  scale: { name: "°C", param: "metric" },
  fetching: true,
  lastFetch: {},
  forecast: [],
  history: []
};

// eslint-disable-next-line no-underscore-dangle
export function __createMocks(
  custom = { getters: {}, mutations: {}, actions: {}, state: {} }
) {
  const mockGetters = Object.assign({}, getters, custom.getters);
  const mockMutations = Object.assign({}, mutations, custom.mutations);
  const mockActions = Object.assign({}, actions, custom.actions);
  const mockState = Object.assign({}, state, custom.state);

  return {
    getters: mockGetters,
    mutations: mockMutations,
    actions: mockActions,
    state: mockState,
    store: new Vuex.Store({
      getters: mockGetters,
      mutations: mockMutations,
      actions: mockActions,
      state: mockState
    })
  };
}

export const store = __createMocks().store;
