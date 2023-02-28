import { Dep } from './Dep.js';

export function observe(data) {
  if (typeof data !== 'object' || typeof data === null) return;
  new Observer(data);
}

export class Observer {
  constructor(data){
    this.walk(data);
  }
  walk(data){
    if (typeof data !== 'object' || typeof data === null) return;
    let keys = Object.keys(data);
    for (let i = 0; i < keys.length; i++) {
      defineReactive(data, keys[i], data[keys[i]]);
    }
  }
}

function defineReactive(target, key, value) {
  observe(target[key]); // 递归调用
  let dep = new Dep();
  Object.defineProperty(target, key, {
    enumerable: true,
    configurable: true,
    get() {
      dep.depend();
      return value;
    },
    set(val) {
      dep.notify();
      if (val === value) return;
      value = val;
    },
  });
}