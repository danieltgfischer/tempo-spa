export const citiesNames = {
  florianopolis: {
    lat: -27.594870,
    lon: -48.548222
  },
  saopaulo: {
    lat: -23.550520,
    lon: -46.633308
  },
  vilavelha: {
    lat: -20.336840,
    lon: -40.291931
  }
};

const header = {
  Accept: 'application/json'
};

const url = param => `https://fcc-weather-api.glitch.me/api/current?lat=${param.lat}&lon=${param.lon}`;

export const fetchWeather = city => fetch(url(city), { ...header })
  .then(res => res.json())
  .then(res => res);
