import normalise from 'panels-normalise-uri';
import parse from '../router/parse';
import register from 'promise-worker/register';

register(async message => {
  switch (message.type) {
  case 'normalise':
    return normalise(message.uri);
    break;

  case 'parse':
    return parse(message.uri);
    break;

  default: break;
  }
});
