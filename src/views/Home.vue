<template>
  <div class="home">
    <img src="http://icons.iconarchive.com/icons/papirus-team/papirus-apps/256/weather-icon.png">
    <h1>El tiempo en {{city}}</h1>
    <h1 v-if="lastFetch" v-text="lastFetch.main.temp + ' ' + scale"></h1>
    <WeatherMain/>
  </div>
</template>

<script>
export default {
  name: "home",
  computed: {
    city: {
      get() {
        return this.$store.state.name;
      }
    },
    lastFetch: {
      get() {
        return this.$store.state.lastFetch;
      }
    },
    scale: {
      get() {
        return this.$store.state.scale.name;
      }
    }
  },
  beforeMount() {
    this.$store.dispatch("fetchWeather");
  }
};
</script>
