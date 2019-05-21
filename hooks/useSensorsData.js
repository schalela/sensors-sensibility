import { useState, useEffect, useRef } from 'react';
import { Subject } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

import {
  filterUsingRegex,
  mergeGroupResults,
  divideValuesBy,
  addObjects
} from '../utils/helpers';

const initialResults = { ambient_temperature: 0, humidity: 0, radiation_level: 0, photosensor: 0 };

export default (groupsMetadata, sensorDataStream, rollingWindow = 50) => {
  const dataStream = useRef(null);
  const [sensorsData, setSensorsData] = useState(Array(groupsMetadata.length).fill([]));
  const [totalProcessed, setTotalProcessed] = useState(0);

  const calculateAveragesFor = divideValuesBy(groupsMetadata.length);
  const buildGroupResults = (groupData, groupIndex) => mergeGroupResults(groupData, groupIndex, groupsMetadata);
  const totalsReducer = (result, { totals }) => addObjects(result, totals);

  const addRecordToDataArray = (groupNumber) => sensorRecord => {
    const newGroupData = sensorsData[groupNumber].slice(0);
    newGroupData.push(sensorRecord);
    setSensorsData(currentState => {
      currentState[groupNumber] = newGroupData;
      if (currentState[groupNumber].length > rollingWindow) {
        currentState[groupNumber].shift();
      }
      return currentState;
    });
  };

  const updateDataForGroup = (groupNumber) => {
    const subject = new Subject();
    const filterRegex = groupsMetadata[groupNumber].regex;

    subject.pipe(
      filter(filterUsingRegex(filterRegex)),
      tap(addRecordToDataArray(groupNumber))
    ).subscribe();

    return subject;
  };

  useEffect(() => {
    if (dataStream.current) {
      return;
    }

    dataStream.current = new Subject();

    sensorDataStream.addListener({
      message: ({ message }) => {
        setTotalProcessed(currentState => currentState + 1);
        dataStream.current.next(message);
      }
    });

    sensorDataStream.subscribe({
      channels: ['pubnub-sensor-network']
    });

    for (let groupIndex = 0; groupIndex < groupsMetadata.length; groupIndex++) {
      dataStream.current.subscribe(updateDataForGroup(groupIndex));
    }
  }, []);

  const sensorResults = sensorsData.map(buildGroupResults);
  const allGroupsTotals = sensorResults.reduce(totalsReducer, initialResults);
  const allGroupsAvg = calculateAveragesFor(allGroupsTotals);

  return [sensorResults, allGroupsAvg, totalProcessed];
};
