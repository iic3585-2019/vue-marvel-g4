import Vuex from "vuex";
import { shallow, createLocalVue } from "vue-test-utils";
import { __createMocks as createStoreMocks } from "../store";

import Home from "./Home";

// Tell Jest to use the mock
// implementation of the store.
jest.mock("../store");

const localVue = createLocalVue();

localVue.use(Vuex);

describe("Home", () => {
  let storeMocks;
  let wrapper;

  beforeEach(() => {
    // Create a fresh store and wrapper
    // instance for every test case.
    storeMocks = createStoreMocks();
    wrapper = shallow(Home, {
      store: storeMocks.store,
      localVue
    });
  });

  test("It should fetch the weather.", () => {
    expect(storeMocks.actions.fetchWeather).toBeCalled();
  });
});
