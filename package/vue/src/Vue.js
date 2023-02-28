import { Watcher } from './Watcher.js';
import { observe, defineReactive } from './Observe.js';

export class Vue {
  constructor(options) {
    this.$options = options;
    this._data = options.data();
    this._initData();
    this._initWatch();
  }
  _initData() {
    let data = this._data;
    let keys = Object.keys(data);
    // 将data代理到this上面
    for (let i = 0; i < keys.length; i++) {
      Object.defineProperty(this, keys[i], {
        enumerable: true,
        configurable: true,
        get() {
          return data[keys[i]];
        },
        set(value) {
          data[keys[i]] = value;
        },
      });
    }
    observe(data);
  }
  _initWatch() {
    let watch = this.$options.watch;
    if (watch) {
      let keys = Object.keys(watch);
      new Watcher(this, keys[i], watch[keys[i]]);
    }
  }
  $watch(key, cb) {
    new Watcher(this, key, cb);
  }
  $set(target, key, value) {
    defineReactive(target, key, value);
    target.__ob__.dep.notify();
  }
}
