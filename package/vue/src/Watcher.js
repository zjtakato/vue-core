import { Dep } from "./Dep.js";

let watcherId = 0;
let watcherQueue = [];

export class Watcher {
  constructor(vm, exp, cb) {
    this.vm = vm;
    this.exp = exp;
    this.cb = cb;
    this.id = ++watcherId;
    this.get();
  }
  // 求值
  get() {
    Dep.target = this;
    this.vm[this.exp];
    Dep.target = null;
  }
  run() {
    if (watcherQueue.indexOf(this.id) !== -1) return;
    watcherQueue.push(this.id);
    Promise.resolve().then(() => {
      let index = watcherQueue.length - 1;
      this.cb.call(this.vm);
      watcherQueue.splice(index, 1);
    });
  }
}
