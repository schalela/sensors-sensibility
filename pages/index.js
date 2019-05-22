import React from 'react';

import Map from '../components/map';
import Gauge from '../components/gauge';
import Totals from '../components/totals';
import GlobalStyle from '../global-style.js';
import { groupsMetadata } from '../utils/metadata';
import useSensorsData from '../hooks/useSensorsData';
import sensorsDataStream from '../data/sensors-data';

export default () => {
  const [sensorResults, allGroupsAvg] = useSensorsData(groupsMetadata, sensorsDataStream);

  return (
    <>
      <GlobalStyle />
      <Map sensorData={sensorResults}>
        <Totals>
          <Gauge
            icon={'/static/ambient_temperature.png'}
            maxValue={50}
            value={Number(allGroupsAvg.ambient_temperature.toFixed(1))} />
          <Gauge
            icon={'/static/humidity.png'}
            maxValue={100}
            value={Number(allGroupsAvg.humidity.toFixed(1))} />
          <Gauge
            icon={'/static/radiation_level.png'}
            maxValue={400}
            value={Number(allGroupsAvg.radiation_level.toFixed(1))} />
          <Gauge
            icon={'/static/photosensor.png'}
            maxValue={1000}
            value={Number(allGroupsAvg.photosensor.toFixed(1))} />
        </Totals>
      </Map>
    </>
  );
};
