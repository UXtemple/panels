export default function prepare(panel, getState) {
  let { background, title, width, ...rest } = panel;

  background = typeof background === 'function' ? background(getState, rest.props) : background;
  title = (typeof title === 'function' ? title(getState, rest.props) : title) || rest.type;
  width = width || 360;

  return {
    ...rest,
    background,
    title,
    width
  };
}
