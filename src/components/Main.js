import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Fade } from 'react-reveal/';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  getInitialWeatherCity,
  getNextWeatherCity,
  setAsViseted
} from '../actions';
import { citiesNames } from '../utils/api';
import { isInStore, getCurrentIndexCity, getNextCity } from '../utils';
import Card from './Card';
import {
  Button,
  MainDiv,
  Container
} from './styled-components';

class Main extends Component {
  state = { visible: false };

  componentDidMount () {
    const { match, firstCity } = this.props;
    const currentCity = match.params.city;
    firstCity(citiesNames[currentCity], currentCity);
    this.setState({ visible: true });
  }

  componentDidUpdate (prevProps) {
    const { match, citiesWeather, nextCity } = this.props;
    const currentCity = match.params.city;
    const previousCityName = prevProps.match.params.city;
    if (currentCity !== previousCityName) {
      this.setState({ visible: true });
      if (isInStore(currentCity, citiesWeather)) return;
      nextCity(citiesWeather, currentCity, previousCityName, citiesNames[currentCity]);
    }
  }

  nextCity = (way) => {
    const {
      match,
      history,
      citiesWeather,
      setCityWeather
    } = this.props;
    const currentCity = match.params.city;
    const { visible } = this.state;
    this.setState({ visible: !visible });
    if (getCurrentIndexCity(currentCity, citiesNames) === 2 ||
      getCurrentIndexCity(currentCity, citiesNames) === 0 ||
      isInStore(currentCity, citiesWeather)
    ) {
      setCityWeather(currentCity, citiesWeather);
    }
    history.push(getNextCity(currentCity, citiesNames, way));
  }

  render () {
    const { match, citiesWeather } = this.props;
    const currentCity = match.params.city;
    const currentIndex = getCurrentIndexCity(currentCity, citiesNames);
    const { visible } = this.state;
    return (
      <MainDiv>
        <Container justify="flex-end">
          {currentIndex > 0 &&
            (
              <Fade big when={currentIndex > 0}>
                <Button
                  type="button"
                  onClick={() => this.nextCity(-1)}
                >
                  Anterior
                </Button>
              </Fade>
            )
          }
        </Container>
        <Card weatherCity={citiesWeather} cityName={currentCity} {...visible} />
        <Container
          justify="flex-start"
        >
          {currentIndex < 2 &&
            (
              <Fade big>
                <Button
                  type="button"
                  onClick={() => this.nextCity(1)}
                >
                  Próxima
                </Button>
              </Fade>
            )
          }
        </Container>
      </MainDiv>
    );
  }
}

Main.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      city: PropTypes.string
    })
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired,
  citiesWeather: PropTypes.arrayOf(PropTypes.object),
  firstCity: PropTypes.func,
  nextCity: PropTypes.func,
  setCityWeather: PropTypes.func
};

Main.defaultProps = {
  citiesWeather: [],
  firstCity: getInitialWeatherCity,
  nextCity: getNextWeatherCity,
  setCityWeather: setAsViseted
};

const mapStateToProps = citiesWeather => ({ citiesWeather });

const mapDispatchToProps = dispatch => bindActionCreators({
  firstCity: getInitialWeatherCity,
  nextCity: getNextWeatherCity,
  setCityWeather: setAsViseted
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Main);
