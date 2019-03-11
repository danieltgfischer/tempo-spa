import React from 'react';
import PropTypes from 'prop-types';
import { TempCircle, Label } from './styled-components';

const Temp = (props) => {
  const { children } = props;
  return (
    <TempCircle {...props}>
      <Label margin="0 0 0 5%" {...props}>
        {children}
      </Label>
    </TempCircle>
  );
};

Temp.propTypes = {
  children: PropTypes.node.isRequired
};

export default Temp;
