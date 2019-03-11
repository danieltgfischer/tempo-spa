import styled from 'styled-components';
import { applyStyleModifiers } from 'styled-components-modifiers';

const MODIFIER_CONFIG = {
  shadow: () => `
    box-shadow: 0 0 25px 0.5px rgba(0, 0, 0, 0.1);
  `
};

export const TempCircle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  height: ${({ size }) => (size || '100px')};
  width: ${({ size }) => (size || '100px')};
  background-color: #f9f9f9;
`;

export const Label = styled.h1`
  font-family: 'Roboto Regular', sans-serif;
  font-size: ${({ font }) => (font || '2em')};
  color: #040404;
  font-weight: 300;
  margin: ${({ margin }) => (margin && margin)};
`;

export const Title = styled.h2`
  font-family: 'Roboto Regular', sans-serif;
  font-size: ${({ font }) => (font || '2em')};
  color: #040404;
  font-weight: 500;
  padding: ${({ padding }) => (padding && padding)};
  margin-bottom: 0.2em;
`;

export const SubTitle = styled.p`
  font-family: 'Roboto Bold', sans-serif;
  font-size: ${({ font }) => (font || '1em')};
  color: #aeaeae;
  font-weight: 400;
  margin: 0;
`;

export const MainDiv = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #ede9ed;
  height: 100vh;
  min-height:100vh;
  width:100vw;
`;

export const Container = styled.div`
  display: flex;
  padding: ${({ padding }) => (padding || '5%')};
  align-self: ${({ alignSelf }) => (alignSelf && alignSelf)};
  flex-direction: ${({ direction }) => (direction || 'row')}
  flex: ${({ flex }) => (flex || 1)};
  justify-content: ${({ justify }) => (justify || 'center')};
  align-items: ${({ align }) => (align || 'center')};
  width: ${({ width }) => (width && width)};
`;

export const Button = styled.button`
  color: #ffffff;
  background-color: #eb005a;
  height: 3em;
  width: 8em;
  font-size: 1em;
  border: none;
  outline: none;  
  transition: ease-in-out 0.2s;
  cursor: pointer;
  &:hover{
    transition: 0.5s;
    background-color: #d80054;
  }
  &:active {
    transition: 0.1s;
    background-color: #a70041;
`;

export const Card = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content:${({ justify }) => (justify || 'space-around')};
  align-items: center;
  height: ${({ height }) => (height || ' 80%')};
  width: ${({ width }) => (width || '80%')};
  background-color: #ffffff;
  ${applyStyleModifiers(MODIFIER_CONFIG)};
`;
