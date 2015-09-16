export default function exclude(thing, from) {
  return from.filter(a => a !== thing);
}
