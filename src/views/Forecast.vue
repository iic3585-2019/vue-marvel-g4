<template>
  <div class="forecast">
    <img src="http://icons.iconarchive.com/icons/papirus-team/papirus-apps/256/weather-icon.png">
    <h1>Pronóstico para {{city}}</h1>

    <div class="weather" v-for="day in forecast" :key="day.dt">
      <span v-if="!fetching">
        {{ getDateInfo(day.date) + ': '+ day.minT + ' '+ scale }}
        <img :src="getUrl(day.minIcon)">
        {{' / '+ day.maxT + ' '+ scale }}
        <img :src="getUrl(day.maxIcon)">
      </span>
    </div>
    <h3 v-if="fetching">Cargando...</h3>
  </div>
</template>

<style>
.weather {
  vertical-align: middle;
  margin: 2px 0px;
}

img {
  vertical-align: middle;
}
</style>


<script>
import { mapGetters } from "vuex";

export default {
  name: "forecast",
  methods: {
    getUrl: day => "http://openweathermap.org/img/w/" + day + "d.png",
    getDateInfo: date => {
      const weekday = [
        "Domingo",
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado"
      ];
      return weekday[date.getDay()] + " " + date.getDate();
    }
  },
  computed: {
    ...mapGetters({
      city: "cityName",
      lastFetch: "lastFetch",
      scale: "scaleName",
      fetching: "fetching",
      forecast: "forecast"
    })
  },
  watch: {
    city() {
      this.$store.dispatch("fetchForecast");
    },
    scale() {
      this.$store.dispatch("fetchForecast");
    }
  },
  beforeMount() {
    this.$store.dispatch("fetchForecast");
  }
};
</script>