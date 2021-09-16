/**
 * 观察者类
 */

class Watcher {
    constructor(vm, key, cb) {
        // vue实例
        this.vm = vm
        // 对应data中的属性
        this.key = key
        // cb回调函数 更新试图的具体方法
        this.cb = cb
        // 观察者赋值到Dep上
        Dep.target = this
        // 触发observer的25行，将观察者放入到发布者内存放
        this.oldValue = vm[key]
        // 解除绑定当前观察者，为了下一次绑定
        Dep.target = null
    }

    update() {
        // 在前道工序，已经通过set,将vm[key]的值修改成新值
        const newValue = this.vm[this.key]
        if (newValue === this.oldValue) { return }
        this.cb(newValue)
    }
}