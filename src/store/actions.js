import { groupBy } from "lodash";

export default {
  updateCity({ commit }, city) {
    commit("updateCity", city);
  },
  updateScale({ commit }, scale) {
    commit("updateScale", scale);
  },
  async fetchWeather(context) {
    const { commit, state } = context;
    commit("fetchingContent");
    const { id, scale } = state;

    const weatherData = await fetch(
      "http://api.openweathermap.org/data/2.5/weather?id=" +
        id +
        "&APPID=08763c0f0a8c7b51e8af42c6f38e9a40&units=" +
        scale.param
    ).then(data => data.json());

    commit("updateWeather", weatherData);
  },
  async fetchForecast(context) {
    const { commit, state } = context;
    commit("fetchingContent");
    const { id, scale } = state;

    const weatherData = await fetch(
      "http://api.openweathermap.org/data/2.5/forecast?id=" +
        id +
        "&APPID=08763c0f0a8c7b51e8af42c6f38e9a40&units=" +
        scale.param
    ).then(data => data.json());

    // let days = [];
    let forecastData = [];

    const byDay = groupBy(weatherData.list, item => {
      const day = new Date(item.dt_txt).getDay();
      return day;
    });
    const firstDay = new Date(weatherData.list[0].dt_txt).getDay();
    const lastDay = new Date(
      weatherData.list[weatherData.list.length - 1].dt_txt
    ).getDay();

    let days = [];

    for (let i = firstDay; i % 7 != lastDay + 1; i++) {
      days.push(i % 7);
    }

    days.forEach(day => {
      const max = byDay[day].reduce((max, data) =>
        max.main.temp > data.main.temp ? max : data
      );
      const min = byDay[day].reduce((min, data) =>
        min.main.temp < data.main.temp ? min : data
      );
      const objDay = {
        minT: Math.round(min.main.temp),
        minIcon: min.weather[0].icon.slice(-3, -1),
        maxT: Math.round(max.main.temp),
        maxIcon: max.weather[0].icon.slice(-3, -1),
        date: new Date(byDay[day][0].dt_txt)
      };
      forecastData.push(objDay);
    });

    commit("updateForecast", forecastData);
  }
};
