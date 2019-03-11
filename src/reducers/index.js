import {
  GET_INITIAL_WEATHER_CITY,
  GET_NEXT_WEATHER_CITY,
  SET_AS_VISITED
} from '../actions';

const citiesWeather = (state = [], action) => {
  switch (action.type) {
    case GET_INITIAL_WEATHER_CITY:
      return [...state, action.payload];
    case GET_NEXT_WEATHER_CITY:
      return action.payload;
    case SET_AS_VISITED:
      return action.payload;
    default:
      return state;
  }
};

export default citiesWeather;
