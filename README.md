# El tiempo en Chile

Aplicación orientada a vista móvil que permite obtener el tiempo meteorológico y el pronóstico semanal para cualquier localidad de Chile. Utiliza la API de [Open Weather Map](https://openweathermap.org/api).

## Instalación

Clonar el repositorio

`git clone https://github.com/iic3585-2019/vue-weather-g4.git`

Ir a la carpeta

`cd vue-weather-g4`

Instalar dependencias

`yarn install`

## Uso
`yarn serve`


## Vuetify

Se utilizó este package para prototipar el estilo.

##### Instalación: 
```batch
yarn add vuetify
```

##### Setup en la aplicación:
`main.js`
```javascript
import Vue from 'vue'

// Importación A-La-Carte
import Vuetify, {
  VApp, // Importar siempre
  VFooter //Componente que se va a ocupar
} from 'vuetify/lib'

import 'vuetify/dist/vuetify.min.css' //Css

Vue.use(Vuetify, {
  components: {
    VApp,
    VFooter
  }
})
```

###### Material Icons
`index.html`
```
<head>
  <link href='https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons' rel="stylesheet">
</head>
```

###### Componente `v-app`
`App.vue`
```
<template>
  <div id="app">
    <v-app>
    ... Componentes
    </v-app>
  </div>
</template>
```

##### Uso:

`components/Cities.vue`
```
<template>
  <div class="citySelector selector">
    <v-autocomplete
      // Atributos
    ></v-autocomplete>
  </div>
</template>
```

## Componentes principales

### Home

Encargado de mostrar el clima actual en la ciudad y escala determinados por el estado de la aplicación. Las computed properties fueron mapeadas desde ele stado con `mapGetters`:

```javascript
computed: {
    ...mapGetters({
      city: "cityName",
      lastFetch: "lastFetch",
      scale: "scaleName",
      fetching: "fetching"
    })
  },
```

Se le agregó la propiedad `watch`, para que ejecute acciones en caso de que ciertas variables cambien:
```javascript
watch: {
    city() {
      this.fetchWeather();
    },
    scale() {
      this.fetchWeather();
    }
  },
```

### Forecast

Muestra el clima para los próximos dias dependiendo de la ciudad y escala determinados en el estado. La estructura interna es similar a `Home`

### History

Muestra el historial, basado en el arreglo `history` del estado global de la aplicación. La estructura interna es similar a `Home`

## Estado

El estado fue divido en actions, getters y mutations. 

### Actions

Acá pusimos las ejecuciones asíncronas, por ejemplo:

```javascript
async fetchWeather(context) {
    const { commit, state } = context;
    commit("fetchingContent");
    const { id, scale } = state;

    const weatherData = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?id=${id}&APPID=${
        process.env.VUE_APP_APP_ID
      }&units=${scale.param}`
    ).then(data => data.json());

    commit("updateWeather", weatherData);
  },
```

El método expuesto es encargado de hacer contacto con la API.

### Mutations

Acá están las modificaciones directas al estado, teniendo en cuenta que dichas modificaciones deben ser **síncronas**


### Getters

Usamos getter para acceder fácilmente al nombre de la escala y no a todo el objeto que guarda la variable `state.scale`:

```javascript
export default {
  scaleName(state) {
      return state.scale.name;
    }
}
```



