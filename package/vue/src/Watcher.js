import { Dep } from './Dep.js';

let watcherId = 0;
let watcherQueue = [];

export class Watcher {
  constructor(vm, exp, cb, options = {}) {
    this.dirty = this.lazy = !!options.lazy; // computed的watcher为true
    this.vm = vm;
    this.exp = exp;
    this.cb = cb;
    this.id = ++watcherId;
    if (this.lazy === false) {
      this.get();
    }
  }
  // 求值
  get() {
    Dep.target = this;
    if (typeof this.exp === 'function') {
      this.value = this.exp.call(this.vm);
    } else {
      this.value = this.vm[this.exp];
    }
    Dep.target = null;
  }
  update() {
    if (this.lazy === true) {
      this.dirty = true;
      return;
    } else {
      this.run();
    }
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
