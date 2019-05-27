import React from 'react';

import MapWithData from '../components/map-with-data';
import Gauge from '../components/gauge';
import Totals from '../components/totals';
import GlobalStyle from '../global-style.js';
import groupsMetadata from '../data/metadata';
import sensorTypes from '../data/sensor-types';
import useSensorsData from '../hooks/useSensorsData';
import sensorsDataStream from '../data/sensors-data';

export default () => {
  const [sensorResults, allGroupsAvg] = useSensorsData(groupsMetadata, sensorsDataStream);

  const getValueFor = sensorType => !allGroupsAvg[sensorType] ? 0 : Number(allGroupsAvg[sensorType].toFixed(1));

  return (
    <>
      <GlobalStyle />
      <MapWithData sensorData={sensorResults}>
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
