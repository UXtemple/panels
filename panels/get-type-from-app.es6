export default function getTypeFromApp(app, type) {
  return require(app).types[type];
}
