export default function getOptionValue(objectOption:ObjectKeyString):string {
  return Object.values(objectOption)[0] as string;
}