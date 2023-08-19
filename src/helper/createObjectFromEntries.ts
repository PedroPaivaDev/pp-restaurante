export default function createObjectFromEntries(entriesArray:Array<[string, string]>) {
  let objectWithEntries:ObjectKeyString = {};
  entriesArray.forEach(entry => {
    if(entry[1] !== '') {
      objectWithEntries = {
        ...objectWithEntries,
        [entry[0]]: entry[1]
      }
    }
  });
  return objectWithEntries;
}