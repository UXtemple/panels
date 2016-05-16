export default function prepare(panel, getState) {
  let { styleBackground, title, width, ...rest } = panel;

  styleBackground = typeof styleBackground === 'function' ? styleBackground(getState, rest.props) : styleBackground;
  title = (typeof title === 'function' ? title(getState, rest.props) : title) || rest.type;
  width = width || 360;

  return {
    ...rest,
    styleBackground,
    title,
    width
  };
}
