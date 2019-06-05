<template>
  <div class="history">
    <div class="weather" v-for="f in history" :key="f._id">
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <span v-on="on">
            <v-icon small>access_time</v-icon>
          </span>
        </template>
        <span>{{f.time.toString()}}</span>
      </v-tooltip>
      <span class="title" v-text="f.name+': '+f.main.temp + ' ' + f.scale"></span>
      <img :src="'http://openweathermap.org/img/w/'+f.weather[0].icon+'.png'">
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "history",
  computed: {
    ...mapGetters({
      history: "history"
    })
  }
};
</script>

<style scoped>
</style>
