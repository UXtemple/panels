import PromiseWorker from 'promise-worker';

const blob = new Blob([`importScripts(__USEPAGES_WORKER_URL__);`], { type: 'text/javascript' });
const worker = new Worker(URL.createObjectURL(blob));
const promiseWorker = new PromiseWorker(worker);

export default promiseWorker;
