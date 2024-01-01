export default class WorkerFactory {
  constructor(worker) {
    const workerCode = worker.toString();
    const workerBlob = new Blob([`(${workerCode})()`]);
    return new Worker(URL.createObjectURL(workerBlob));
  }
}
