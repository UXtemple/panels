// TODO make it smarter, cleanup and support more complex teleports
export default function getUnslicedUri({context, path}, uri) {
  return `..${path}`;
}

  // const shouldCloseSlice = context.indexOf('(') > -1;
  // return `..${shouldCloseSlice ? ')' : ''}${path}`;


  // const afterContext = uri.replace(context, '');
  // const start = afterContext.indexOf('(');
  // const end = afterContext.indexOf(')');

  // let unslicedUri;
  // if (end === 0) {
  //   unslicedUri = afterContext.substr(1);
  // } else {
  //   if (start === -1) {
  //     unslicedUri = `..${path}/${afterContext}`;
  //   }
  // }