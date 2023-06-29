type sequence = 'ascending' | 'descending'

export default function sortUuids(array:string[], sequence?:sequence) {
  if(sequence==='ascending') {
    return array.sort((a, b) => (a > b ? 1 : -1));
  } else if(sequence==='descending') {
    return array.sort((a, b) => (a < b ? 1 : -1));
  } else return array;
}