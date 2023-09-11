export default function getIdFrom(string) {
  let id = string.replace(/\W/g, "_"); // removes non-letter characters
  id = id.replace(/_{2,}/g, "_"); // remove sequences of underscores
  return id;
}
