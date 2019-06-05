---
marp: true
---

# Vue

# ![](public/logo.PNG)

### Grupo 4

###### Natalia Barra - Luis Chodiman - Mauricio Ortiz

---

# Pero primero... la demo!

---

# Puntos principales

-

---

# Testing

Instalación de dependencias, el _test runner_ y las utlidades de Vue

```bash
yarn add jest @vue/test-utils
```

Para enseñar a `Jest` a procesar archivos `*.vue`

```bash
yarn add vue-jest
```

Y para que entienda ES5:

```bash
yarn add babel-jest
```

---

Más configuración adicional, ahora en `package.json`:

```
"jest": {
  "moduleFileExtensions": [
    "js",
    "vue"
  ],
  "transform": {
    ".*\\.(vue)$": "vue-jest",
    "^.+\\.js$": "babel-jest"
  },
  "mapCoverage": true
}
```

---

Pero, como nuestros componentes están enlazados a `Vuex`, hay que crear un _mock_ de la `store`.

`src/store/__mocks__/index.js`

```javascript
export const getters = {
  cityName: jest.fn().mockReturnValue("fake-city-name"),
  lastFetch: jest.fn().mockReturnValue({}),
  ...
};
export const mutations = {
  updateCity: jest.fn(),
  ...
};
export const actions = {
  updateCity: jest.fn(),
  ...
};
export const state = {
  id: 3871336,
  ...
};
```

---

```javascript
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
```

---

Y ahora sí ha testear:

```javascript
import Vuex from "vuex";
import { shallow, createLocalVue } from "vue-test-utils";
import { __createMocks as createStoreMocks } from "../store";
import Home from "./Home";
```

```javascript
jest.mock("../store");

const localVue = createLocalVue();

localVue.use(Vuex);
```

---

```javascript
describe("Home", () => {
  let storeMocks;
  let wrapper;

  beforeEach(() => {
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
```

---

Y la `store`? -> Igual que en el caso de `React`!

```javascript
test('"updateCity" changes the city id, name, lon and lat', () => {
  const state = {
    city: {
      id: "original-id",
      name: "original-name",
      lat: "original-lat",
      lon: "original-lon"
    }
  };

  const newCity = {
    id: "new-id",
    name: "new-name",
    lat: "new-lat",
    lon: "new-lon"
  };

  mutations.updateCity(state, newCity);

  expect(state.city).toEqual(newCity);
});
```

---

## Conclusiones del testing

- Menos información (tutoriales, artículos, blogs) en comparación a `React`, en especial en componentes con `Vuex`
- Se puede usar `Jest`
- `Enzyme` es reemplazado por `vue-test-utils`
- Es necesario realizar un _mock_ del `store` para testear componentes con `Vuex`
