import React from 'react';
import PubNub from 'pubnub';
import { createGlobalStyle } from 'styled-components';

import Map from '../components/map';
import Gauge from '../components/gauge';
import Totals from '../components/totals';
import { groupsMetadata } from '../utils/metadata';
import useSensorsData from '../hooks/useSensorsData';

const sensorDataStream = new PubNub({
  subscribeKey: 'sub-c-5f1b7c8e-fbee-11e3-aa40-02ee2ddab7fe'
});

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
  .segment-value {
    font-size: 10px !important;
    fill: white !important;
  }
  .current-value {
    fill: white !important;
  }
`;

export default () => {
  const [sensorResults, allGroupsAvg] = useSensorsData(groupsMetadata, sensorDataStream);

  return (
    <>
      <GlobalStyle />
      <Map sensorData={sensorResults}>
        <Totals>
          <Gauge
            icon={'/static/ambient_temperature.png'}
            maxValue={50}
            value={Math.round(allGroupsAvg.ambient_temperature)} />
          <Gauge
            icon={'/static/humidity.png'}
            maxValue={100}
            value={Math.round(allGroupsAvg.humidity)} />
          <Gauge
            icon={'/static/radiation_level.png'}
            maxValue={400}
            value={Math.round(allGroupsAvg.radiation_level)} />
          <Gauge
            icon={'/static/photosensor.png'}
            maxValue={1000}
            value={Math.round(allGroupsAvg.photosensor)} />
        </Totals>
      </Map>
    </>
  );
};
