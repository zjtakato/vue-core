export class Dep {
  constructor() {
    this.subs = [];
  }
  depend() {
    if (Dep.target) {
      this.subs.push(Dep.target); // 存放所依赖的watcher实例
    }
  }
  notify() {
    this.subs.forEach((watcher) => {
      watcher.update();
    });
  }
}