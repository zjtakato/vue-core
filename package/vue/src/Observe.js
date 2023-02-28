import { Dep } from './Dep.js';

export function observe(data) {
  if (typeof data !== 'object' || typeof data === null) return;
  if (data.__ob__) return data.__ob__;
  return new Observer(data);
}

export class Observer {
  constructor(data) {
    this.dep = new Dep();
    this.walk(data);
    Object.defineProperty(data, '__ob__', {
      value: this,
      enumerable: false,
      configurable: true,
      writable: true,
    });
  }
  walk(data) {
    if (typeof data !== 'object' || typeof data === null) return;
    let keys = Object.keys(data);
    for (let i = 0; i < keys.length; i++) {
      defineReactive(data, keys[i], data[keys[i]]);
    }
  }
}

export function defineReactive(target, key, value) {
  let childOb = observe(target[key]); // 递归调用
  let dep = new Dep();
  Object.defineProperty(target, key, {
    enumerable: true,
    configurable: true,
    get() {
      dep.depend();
      console.log(`~~~~~${key}被访问了~~~~~`);
      if (childOb) childOb.dep.depend();
      return value;
    },
    set(val) {
      dep.notify();
      console.log(`~~~~~${key}发生了变化~~~~~`);
      if (val === value) return;
      value = val;
    },
  });
}
