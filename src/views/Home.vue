<template>
  <div class="home">
    <img src="http://icons.iconarchive.com/icons/papirus-team/papirus-apps/256/weather-icon.png" />
    <h1>Pronóstico para {{city}}</h1>
  </div>
  
</template>

<script>

export default {
  name: "home",
  computed : {
    city : {
      get () {
        return this.$store.state.name;
      },
    },
  },
};
</script>
