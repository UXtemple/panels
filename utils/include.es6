export default function include(thing, list) {
  return list.indexOf(thing) === -1 ? [...list, thing] : list;
}
