/**
 * 发布者类：负责收集观察者，并触发观察者内部的回调函数
 */

class Dep {
    constructor() {
        this.subs = []
    }
    // 收集观察者
    addSub(sub) {
        this.subs.push(sub)
    }
    // 通知观察者更新
    notify() {
        this.subs.forEach(sub => {
            sub.update()
        })
    }
}