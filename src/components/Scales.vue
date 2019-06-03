<template>
  <div class="scaleSelector">
    <v-select
      id="scales"
      v-model="inputtext"
      :items="scales"
      item-text="name"
      return-object
      background-color= "#f88643"
      hide-details
      solo
    ></v-select>
  </div>
</template>

<script>
export default {
  name: "scales",
  data() {
    return {
      scales: [
        { name: "Fahrenheit", param: "imperial" },
        { name: "Celcius", param: "matric" },
        { name: "Kelvin", param: "" }
      ]
    };
  },
  computed: {
    inputtext: {
      get() {
        return this.$store.state.scale.name;
      },
      set(value) {
        this.$store.dispatch("updateScale", value);
      }
    }
  }
};
</script>

<style>
.scaleSelector {
    width: 25%;
}
</style>
