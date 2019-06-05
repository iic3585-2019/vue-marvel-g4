import mutations from "./mutations";

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
