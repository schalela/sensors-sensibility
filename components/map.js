import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Map, Marker, InfoWindow, GoogleApiWrapper } from 'google-maps-react';
import get from 'lodash.get';

const GroupTitle = styled.div`
  font-family: sans-serif;
  font-weight: bold;
`;

const SensorInfo = styled.div`
  display: flex;
  align-items: center;
`;

const SensorLogo = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 5px;
`;

const MapContainer = ({ google, sensorData = [] }) => {
  const [selectedMarker, setSelectedMarker] = useState('');
  const [mapHeight, setMapHeight] = useState('70%');
  const { groupIndex } = selectedMarker;

  useEffect(() => {
    if (process.browser && window.innerWidth < 400) {
      setMapHeight('45%');
    }
  }, []);

  return (
    <Map
      style={{
        marginTop: 12,
        width: '98%',
        height: mapHeight
      }}
      initialCenter={{
        lat: -23,
        lng: 133
      }}
      google={google}
      zoom={3}>
      {sensorData.map(({ metadata: { name, position } }, groupIndex) => (
        <Marker
          data-testid={`marker-${groupIndex}`}
          icon={'/static/sensor.png'}
          onClick={({ name }, marker) => setSelectedMarker({ marker, name, groupIndex })}
          name={name}
          position={position}
        />
      ))}
      <InfoWindow
        marker={selectedMarker.marker}
        visible={!!selectedMarker}>
        <>
          <GroupTitle>{selectedMarker.name}</GroupTitle>
          <SensorInfo>
            <SensorLogo src={'/static/ambient_temperature.png'} />
            {get(sensorData, `[${groupIndex}].totals.ambient_temperature`, '-')}
          </SensorInfo>
          <SensorInfo>
            <SensorLogo src={'/static/humidity.png'} />
            {get(sensorData, `[${groupIndex}].totals.humidity`, '-')}
          </SensorInfo>
          <SensorInfo>
            <SensorLogo src={'/static/radiation_level.png'} />
            {get(sensorData, `[${groupIndex}].totals.radiation_level`, '-')}
          </SensorInfo>
          <SensorInfo>
            <SensorLogo src={'/static/photosensor.png'} />
            {get(sensorData, `[${groupIndex}].totals.photosensor`, '-')}
          </SensorInfo>
        </>
      </InfoWindow>
    </Map>
  );
};

export default GoogleApiWrapper({ apiKey: 'AIzaSyDaTGtdbWrYAp5PNlPIuRgnmHBR2hCb1Tk' })(MapContainer);
