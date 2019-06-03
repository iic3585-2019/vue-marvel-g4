<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <input type="text" v-model="city" list="cities">
    <datalist id="cities">
      <option v-for="city in cities" :key="city.id">{{ city.name }}</option>
    </datalist>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import cityList from "@/chileanCities.json";

export default {
  name: "home",
  data() {
    return {
      city: "",
      cities: cityList
    };
  },
  components: {
    HelloWorld
  }
};
</script>
