import { useState, useEffect, useRef } from 'react';
import { Subject } from 'rxjs';

import mergeGroupResults from '../utils/mergeGroupResults';
import updateGroup from '../utils/updateGroup';
import addObjects from '../utils/addObjects';
import divideObjectValuesBy from '../utils/divideObjectValuesBy';

const initialResults = { ambient_temperature: 0, humidity: 0, radiation_level: 0, photosensor: 0 };

export default (groupsMetadata, sensorsDataStream, rollingWindow = 50) => {
  const dataStream = useRef(null);
  const [sensorsData, setSensorsData] = useState(Array(groupsMetadata.length).fill([]));
  const [totalProcessed, setTotalProcessed] = useState(0);

  const calculateAveragesFor = divideObjectValuesBy(groupsMetadata.length);
  const addRecordToArray = groupIndex => sensorRecord => {
    const newGroupData = sensorsData[groupIndex].slice(0);
    newGroupData.push(sensorRecord);

    setSensorsData(currentState => {
      currentState[groupIndex] = newGroupData;
      if (currentState[groupIndex].length > rollingWindow) {
        currentState[groupIndex].shift();
      }
      return currentState;
    });
  };
  const updateDataForGroup = groupIndex => updateGroup(groupsMetadata, groupIndex, addRecordToArray);

  useEffect(() => {
    dataStream.current = new Subject();
    groupsMetadata.forEach((_, groupIndex) => dataStream.current.subscribe(updateDataForGroup(groupIndex)));

    sensorsDataStream.init({
      message: ({ message }) => {
        setTotalProcessed(currentState => currentState + 1);
        dataStream.current.next(message);
      }
    });
  }, []);

  const sensorResults = sensorsData.map((groupData, groupIndex) => mergeGroupResults(groupData, groupIndex, groupsMetadata));
  const totalResults = sensorResults.reduce((result, { totals }) => addObjects(result, totals), initialResults);
  const allGroupsAvg = calculateAveragesFor(totalResults);

  return [sensorResults, allGroupsAvg, totalProcessed];
};
