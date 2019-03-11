import * as API from '../utils/api';

export const GET_INITIAL_WEATHER_CITY = 'GET_INITIAL_WEATHER_CITY';

export const SET_CITY = 'SET_CITY';

export const GET_NEXT_WEATHER_CITY = 'GET_NEXT_WEATHER_CITY';

export const GET_CITIES = 'GET_CITIES';

export const SET_AS_VISITED = 'SET_AS_VISITED';

export const getInitialWeatherCity = (geolocation, city) => (dispatch) => {
  API.fetchWeather(geolocation).then(weather => dispatch(passweatherCity(city, weather)));
};

export const passweatherCity = (cityName, weather) => ({
  type: GET_INITIAL_WEATHER_CITY,
  payload: {
    cityName,
    weather,
    visited: false
  }
});

export const getNextWeatherCity = (
  citiesWeather,
  currentCityName,
  previousCityName,
  geolocation
) => (dispatch) => {
  API.fetchWeather(geolocation)
    .then(
      weather => dispatch(passweatherCityMerged(
        currentCityName,
        weather,
        citiesWeather,
        previousCityName
      ))
    );
};

export const passweatherCityMerged = (
  currentCityName,
  weather,
  citiesWeather,
  previousCityName
) => {
  citiesWeather.push({
    cityName: currentCityName,
    weather,
    visited: false
  });
  const previousCity = citiesWeather.find(city => city.cityName === previousCityName);
  previousCity.visited = true;
  const mergedCities = citiesWeather.filter(city => city.cityName !== previousCityName);
  mergedCities.push(previousCity);
  return {
    type: GET_NEXT_WEATHER_CITY,
    payload: mergedCities
  };
};

export const setAsViseted = (cityName, citiesWeather) => {
  const cityToSetup = citiesWeather.find(city => city.cityName === cityName);
  cityToSetup.visited = true;
  const mergedCities = citiesWeather.filter(city => city.cityName !== cityName);
  mergedCities.push(cityToSetup);
  return {
    type: SET_AS_VISITED,
    payload: mergedCities
  };
};
