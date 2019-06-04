<template>
  <div class="citySelector">
    <v-autocomplete
      v-model="inputtext"
      :items="cities"
      item-text="name"
      return-object
      solo
      background-color="#f88643"
      hide-details
      no-data-text="No se encuentra el lugar"
    ></v-autocomplete>
  </div>
</template>

<script>
import cityList from "@/chileanCities.json";
export default {
  name: "cities",
  data() {
    return {
      cities: cityList
    };
  },
  computed: {
    inputtext: {
      get() {
        return this.$store.state.name;
      },
      set(value) {
        this.$store.dispatch("updateCity", value);
      }
    }
  }
};
</script>

<style>
.citySelector {
  width: 70%;
}
</style>