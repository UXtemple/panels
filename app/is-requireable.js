export default function isRequireable(dep) {
  let is = false

  try {
    require(dep)
    is = true
  } catch(err) {
  }

  return is
}
