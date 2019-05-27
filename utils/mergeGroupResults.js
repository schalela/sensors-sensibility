import getGroupAverages from './getGroupAverages';

export default (groupData, groupIndex, groupsMetadata) => {
  const totals = getGroupAverages(groupData);
  return {
    metadata: groupsMetadata[groupIndex],
    totals
  };
};
