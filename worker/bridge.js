import PromiseWorker from 'promise-worker';

const worker = new Worker('/panels-worker.js');
const promiseWorker = new PromiseWorker(worker);

export default promiseWorker;
