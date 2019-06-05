import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Forecast from "./views/Forecast.vue";
import History from "./views/History.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/forecast",
      name: "forecast",
      component: Forecast
    },
    {
      path: "/history",
      name: "history",
      component: History
    }
  ]
});
