import React, { useState } from 'react';
import styled from 'styled-components';
import { Map, Marker, InfoWindow, GoogleApiWrapper } from 'google-maps-react';
import get from 'lodash.get';

import mapStyles from './map-style';

const GroupTitle = styled.div`
  font-family: sans-serif;
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 20px;
`;

const SensorInfo = styled.div`
  display: flex;
  align-items: center;
  margin: 5px;
`;

const SensorLogo = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

const InfoWrapper = styled.div`
  background: grey;
  color: white;
  padding: 15px;
  border-radius: 5px;
`;

const MapContainer = ({ google, sensorData = [], children }) => {
  const [selectedMarker, setSelectedMarker] = useState('');
  const { groupIndex } = selectedMarker;

  const getValueFor = sensorType => get(sensorData, `[${groupIndex}].totals.${sensorType}`, 0).toFixed(1);

  return (
    <Map
      styles={mapStyles}
      mapTypeControl={false}
      streetViewControl={false}
      initialCenter={{
        lat: -23,
        lng: 133
      }}
      google={google}
      zoom={4}>
      {sensorData.map(({ metadata: { name, position } }, groupIndex) => (
        <Marker
          key={`marker-${groupIndex}`}
          icon={'/static/sensor.png'}
          onClick={({ name }, marker) => setSelectedMarker({ marker, name, groupIndex })}
          name={name}
          position={position}
        />
      ))}
      <InfoWindow
        marker={selectedMarker.marker}
        visible={!!selectedMarker}>
        <InfoWrapper>
          <GroupTitle>{selectedMarker.name}</GroupTitle>
          <SensorInfo>
            <SensorLogo src={'/static/ambient_temperature.png'} />
            {getValueFor('ambient_temperature')} C
          </SensorInfo>
          <SensorInfo>
            <SensorLogo src={'/static/humidity.png'} />
            {getValueFor('humidity')} %
          </SensorInfo>
          <SensorInfo>
            <SensorLogo src={'/static/radiation_level.png'} />
            {getValueFor('radiation_level')} millirads/hour
          </SensorInfo>
          <SensorInfo>
            <SensorLogo src={'/static/photosensor.png'} />
            {getValueFor('photosensor')} w/m2
          </SensorInfo>
        </InfoWrapper>
      </InfoWindow>
      {children}
    </Map>
  );
};

export default GoogleApiWrapper({ apiKey: 'AIzaSyDaTGtdbWrYAp5PNlPIuRgnmHBR2hCb1Tk' })(MapContainer);
