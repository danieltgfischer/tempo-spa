import React, { Fragment } from 'react';
import { Zoom, Fade } from 'react-reveal/';
import PropTypes from 'prop-types';
import moment from 'moment';
import localization from 'moment/locale/pt-br';
import ReactLoading from 'react-loading';
import MainTemp from './Temp';
import '../css/App.css';
import {
  Card,
  Container,
  Title,
  SubTitle,
  Label
} from './styled-components';

const CardComponent = (props) => {
  const { weatherCity, cityName, visible } = props;
  const filterCity = weatherCity.find(city => city.cityName === cityName);

  const translateName = (name) => {
    switch (name) {
      case 'florianopolis':
        return 'Florianópolis';
      case 'saopaulo':
        return 'São Paulo';
      case 'vilavelha':
        return 'Vila Velha';
      default: return null;
    }
  };

  const translateDate = () => {
    const pt = moment().locale('pt-br', localization);
    let date = pt.format('LLLL');
    date = date.replace(` às ${pt.format('HH:mm')}`, '');
    return date;
  };

  if (filterCity !== undefined &&
    filterCity !== false) {
    return (
      <Fragment>
        {
          filterCity.visited
            ? (
              <Card modifiers="shadow">
                <Title>
                  <Fade when={visible}>
                    Tempo já acessado
                  </Fade>
                </Title>
              </Card>
            ) : (
              <Card modifiers="shadow">
                <Container
                  direction="column"
                  justify="flex-end"
                  align="flex-start"
                  alignSelf="flex-start"
                  width="90%"
                  padding="0 0 5% 10%"
                >
                  <Fade cascade big when={visible}>
                    <Title>{translateName(filterCity.cityName)}</Title>
                    <SubTitle>{translateDate()}</SubTitle>
                  </Fade>
                </Container>
                <Container flex={2}>
                  <Zoom cascade big opposite when={visible}>
                    <MainTemp font="4em" size="200px">
                      {parseInt(filterCity.weather.main.temp, 0)}
                      °
                    </MainTemp>
                  </Zoom>
                </Container>
                <Container
                  justify="space-around"
                  align="center"
                  width="80%"
                  padding="0 0 10% 0"
                >
                  <Fade cascade left when={visible}>
                    <Card justify="center">
                      <Label margin="0 0 5% 0">
                        {parseInt(filterCity.weather.main.temp_max, 0)}
                        °
                      </Label>
                      <SubTitle>Máx</SubTitle>
                    </Card>
                    <Card justify="center">
                      <Label margin="0 0 5% 0">
                        {parseInt(filterCity.weather.main.temp_min, 0)}
                        °
                      </Label>
                      <SubTitle>Min</SubTitle>
                    </Card>
                    <Card justify="center">
                      <Label margin="0 0 5% 0">{filterCity.weather.main.humidity}</Label>
                      <SubTitle>Umidade</SubTitle>
                    </Card>
                  </Fade>
                </Container>

              </Card>
            )
        }
      </Fragment>
    );
  }
  return (
    <Card modifiers="shadow">
      <ReactLoading type="balls" color="#ede9ed" height="20%" width="20%" />
    </Card>
  );
};

CardComponent.propTypes = {
  weatherCity: PropTypes.arrayOf(PropTypes.object).isRequired,
  cityName: PropTypes.string.isRequired,
  visible: PropTypes.bool
};

export default CardComponent;
