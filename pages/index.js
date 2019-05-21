import React from 'react';
import PubNub from 'pubnub';

import Map from '../components/map';
import Gauge from '../components/gauge';
import Github from '../components/github';
import Header from '../components/header';
import Totals from '../components/totals';
import { groupsMetadata } from '../utils/metadata';
import useSensorsData from '../hooks/useSensorsData';

const sensorDataStream = new PubNub({
  subscribeKey: 'sub-c-5f1b7c8e-fbee-11e3-aa40-02ee2ddab7fe'
});

export default () => {
  const [sensorResults, allGroupsAvg] = useSensorsData(groupsMetadata, sensorDataStream);

  return (
    <>
      <Header>Shokunin May Challenge <Github /></Header>
      <Map sensorData={sensorResults} />
      <Totals>
        <Gauge
          icon={'/static/ambient_temperature.png'}
          startColor={'green'}
          endColor={'red'}
          maxValue={50}
          value={allGroupsAvg.ambient_temperature}
          height={'150px'} />
        <Gauge
          icon={'/static/humidity.png'}
          startColor={'#ffdb68'}
          endColor={'#003c75'}
          maxValue={100}
          value={allGroupsAvg.humidity}
          height={'150px'} />
        <Gauge
          icon={'/static/radiation_level.png'}
          startColor={'green'}
          endColor={'red'}
          maxValue={400}
          value={allGroupsAvg.radiation_level} />
        <Gauge
          icon={'/static/photosensor.png'}
          startColor={'black'}
          endColor={'white'}
          maxValue={1000}
          value={allGroupsAvg.photosensor} />
      </Totals>
    </>
  );
};
