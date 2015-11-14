export default function isRequireable(dep) {
  let is = false;

  try {
    require(dep);
    is = true;
  } catch(err) {
    console.error(`Failed to require ${dep}`);
    console.error(err.stack);
  }

  return is;
}
