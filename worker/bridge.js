import PromiseWorker from 'promise-worker';

const uri = process.env.NODE_ENV === 'development' ?
  '/panels-worker.js' :
  'https://cdn.uxtemple.com/panels-worker.js';

const worker = new Worker(uri);
const promiseWorker = new PromiseWorker(worker);

export default promiseWorker;
