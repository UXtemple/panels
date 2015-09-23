// TODO This should be part of the state as its a value that can be calculated when the panel is
// being created. It got a bit tricky with the server so I'm leaving it as is for now.
export default function prepare(panel, getState) {
  let { background, title, ...rest } = panel;

  background = typeof background === 'function' ? background(getState, rest.props) : background;
  title = typeof title === 'function' ? title(getState, rest.props) : title;

  return {
    ...rest,
    background,
    title
  };
}

