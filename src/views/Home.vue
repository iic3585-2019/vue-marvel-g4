<template>
  <div class="home">
    <img src="http://icons.iconarchive.com/icons/papirus-team/papirus-apps/256/weather-icon.png">
    <h1>El tiempo en {{city}}</h1>
    <span v-if="lastFetch && !fetching">
      <span class="title" v-text="lastFetch.main.temp + ' ' + scale"></span>
      <img :src="getIconUrl(lastFetch)">
    </span>

    <h1 v-else>...</h1>
  </div>
</template>

<style>
.title {
  margin: 0.5em;
}
</style>

<script>
import { mapGetters } from "vuex";

export default {
  name: "home",
  computed: {
    ...mapGetters({
      city: "cityName",
      lastFetch: "lastFetch",
      scale: "scaleName",
      fetching: "fetching"
    })
  },
  methods: {
    getIconUrl: lastFetchData =>
      "http://openweathermap.org/img/w/" +
      lastFetchData.weather[0].icon +
      ".png"
  },
  watch: {
    city() {
      this.$store.dispatch("fetchWeather");
    },
    scale() {
      this.$store.dispatch("fetchWeather");
    }
  },
  beforeMount() {
    this.$store.dispatch("fetchWeather");
  }
};
</script>
