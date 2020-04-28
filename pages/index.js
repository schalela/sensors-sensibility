import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import get from 'lodash.get';
import gql from 'graphql-tag';

import MapWithData from '../components/map-with-data';
import Gauge from '../components/gauge';
import Totals from '../components/totals';
import GlobalStyle from '../global-style.js';
import sensorTypes from '../data/sensor-types';

const SENSOR_DATA = gql`
  {
    getIotPocDeviceTable(id: "iot-poc-device") {
      id
      payload
    }
  }
`;

export default () => {
  const { data } = useQuery(SENSOR_DATA, {
    pollInterval: 1000
  });
  const payload = JSON.parse(get(data, 'getIotPocDeviceTable.payload', '{}'));
  const sensorData = get(payload, 'state.reported');

  const getValueFor = sensorType => get(sensorData, `${sensorType}`, 0).toFixed(1);

  return (
    <>
      <GlobalStyle />
      <MapWithData sensorData={[sensorData]}>
        <Totals>
          {sensorTypes.map((sensor, i) => (
            <Gauge
              key={i}
              icon={`/static/${sensor.value}.png`}
              maxValue={sensor.maxValue}
              value={getValueFor(sensor.value)} />
          ))}
        </Totals>
      </MapWithData>
    </>
  );
};
