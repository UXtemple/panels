import 'native-promise-only';
import normalise from 'panels-normalise-uri';
import parse from '../router/parse';
import register from 'promise-worker/register';

register(async message => {
  switch (message.type) {
  case 'normalise':
    return normalise(message.uri);
    break;

  case 'parse':
    let processedWhitelist = message.whitelist.map(r => new RegExp(r));
    return parse(message.uri, processedWhitelist);
    break;

  default: break;
  }
});
