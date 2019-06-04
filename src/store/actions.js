export default {
  updateCity({ commit }, city) {
    commit("updateCity", city);
  },
  updateScale({ commit }, scale) {
    commit("updateScale", scale);
  },
  async fetchWeather({ commit }, id, scale) {
    const weatherData = await fetch(
      "http://api.openweathermap.org/data/2.5/weather?id=" +
        id +
        "&APPID=08763c0f0a8c7b51e8af42c6f38e9a40&units=" +
        scale
    ).then(data => data.json());

    commit("updateWeather", weatherData);
  },
  async fetchForecast({ commit }, id, scale) {
    const weatherData = await fetch(
      "http://api.openweathermap.org/data/2.5/forecast?id=" +
        id +
        "&APPID=08763c0f0a8c7b51e8af42c6f38e9a40&units=" +
        scale
    ).then(data => data.json());

    let days = [];
    let forecastData = [];
    let objDay = {};
    let currentDay = -1;

    weatherData.list.forEach(element => {
      const date = new Date(element.dt_txt);
      const day = date.getDay();
      const hour = date.getHours();

      if (!days.includes(day)) {
        days.push(day);
        currentDay = day;
        // forecast.push(element);
      }
      if (currentDay == day) {
        if (hour > 5 && hour < 13 && Object.keys(objDay).length == 0) {
          objDay.minT = parseInt(element.main.temp);
          objDay.minIcon = element.weather[0].icon.slice(-3, -1);
        }
        if (hour == 18) {
          objDay.maxT = parseInt(element.main.temp);
          objDay.maxIcon = element.weather[0].icon.slice(-3, -1);
        }
        if (hour == 21) {
          objDay.date = date;
          forecastData.push(objDay);
          objDay = {};
        }
      }
    });

    commit("fetchForecast", forecastData);
  }
};
