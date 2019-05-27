import { Subject } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import filterUsingRegex from './filterUsingRegex';

export default (groupsMetadata, groupNumber, addRecordToArray) => {
  const subject = new Subject();
  const filterRegex = groupsMetadata[groupNumber].regex;

  subject.pipe(
    filter(filterUsingRegex(filterRegex)),
    tap(addRecordToArray(groupNumber))
  ).subscribe();

  return subject;
};
