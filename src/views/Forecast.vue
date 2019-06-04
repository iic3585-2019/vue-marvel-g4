<template>
  <div class="forecast">
    <img src="http://icons.iconarchive.com/icons/papirus-team/papirus-apps/256/weather-icon.png">
    <h1>Pronóstico para {{city}}</h1>

    <div class="weather" v-for="item in forecast" :key="item.dt">
      <span v-if="!fetching">
        {{ getDateInfo(item.date) +': '+item.minT +' '+scale }}
        <img :src="getUrl(item.minIcon)">
        {{' / '+item.maxT+' '+scale }}
        <img :src="getUrl(item.maxIcon)">
      </span>
      <h1 v-if="fetching">...</h1>
    </div>
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
export default {
  name: "forecast",
  methods: {
    getUrl: item => "http://openweathermap.org/img/w/" + item + "d.png",
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
    city: {
      get() {
        return this.$store.state.name;
      }
    },
    forecast: {
      get() {
        return this.$store.state.forecast;
      }
    },
    scale: {
      get() {
        return this.$store.state.scale.name;
      }
    },
    fetching: {
      get() {
        return this.$store.state.fetching;
      }
    }
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