export default function getFileNameFromUrl(url:string) {
  const parts = url.split("/");
  const fileNameWithParams = parts[parts.length - 1];
  const fileNamePath = fileNameWithParams.split("?")[0];
  const fileName = fileNamePath.split("%2F")[2];
  return fileName;
}
