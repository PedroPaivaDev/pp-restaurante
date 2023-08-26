export default function getOptionValue(objectOption:ObjectKeyString|OptionsObject)
:string {
  return Object.values(objectOption)[0] as string;
}