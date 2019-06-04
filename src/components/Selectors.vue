<template>
  <div class="selectors">
    <Cities/>
    <Scales/>
  </div>
</template>

<script>
import Scales from "@/components/Scales.vue";
import Cities from "@/components/Cities.vue";

export default {
  name: "selectors",
  components: {
    Scales,
    Cities
  }
};
</script>

<style>
.selectors {
  /* position: absolute; */
  justify-content: space-between;
  display: flex;
  right: 2px;
  top: 2px;
}

.selector {
  margin: 2px;
}
</style>