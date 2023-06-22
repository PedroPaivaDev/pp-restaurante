export default function tupleToObject(formDataEntries:FormDataEntries) {
  return formDataEntries.reduce((obj:ObjectKeyString, [key, value]) => {
    obj[key] = value;
    return obj;
  }, {});
}