import React from 'react';
import ReactSpeedometer from 'react-d3-speedometer';

const Gauge = ({ value, maxValue, icon }) => {
  return (
    <>
      <img src={icon} />
      <ReactSpeedometer
        segments={25}
        maxSegmentLabels={5}
        startColor={'black'}
        endColor={'white'}
        maxValue={maxValue}
        needleColor={'white'}
        width={100}
        height={100}
        needleHeightRatio={0.7}
        ringWidth={12}
        value={value}
      />
    </>
  );
};

export default Gauge;
