import PromiseWorker from 'promise-worker';

const blob = new Blob([
`try {
  importScripts(__USEPAGES_WORKER_URL__);
} catch(err) {
  console.error(err);
}`], { type: 'text/javascript' });
const worker = new Worker(URL.createObjectURL(blob));
const promiseWorker = new PromiseWorker(worker);

export default promiseWorker;
