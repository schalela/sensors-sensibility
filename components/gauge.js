import React from 'react';
import styled from 'styled-components';
import ReactSpeedometer from 'react-d3-speedometer';

const Wrapper = styled.div`
  height: ${props => props.height || 'auto'};
`;

const Gauge = ({ value, startColor, endColor, maxValue, height, icon }) => {
  return (
    <Wrapper height={height}>
      <img src={icon} />
      <ReactSpeedometer
        segments={25}
        maxSegmentLabels={5}
        startColor={startColor}
        endColor={endColor}
        needleColor={'#380100'}
        maxValue={maxValue}
        width={150}
        height={150}
        ringWidth={20}
        value={value}
      />
    </Wrapper>
  );
};

export default Gauge;
