
/**
 * 对对象进行深度响应式
 */
class Observer {
    constructor(data) {
        this.observer(data)
    }

    observer(data) {
        if (!data || typeof data !== 'object') { return }
        Reflect.ownKeys(data).forEach(key => {
            this.defineReactive(data, key, data[key])
        })
    }

    defineReactive(data, key, value) {
        this.observer(value)
        const self = this
        // 每次深度响应式，都定义一个发布者类
        const dep = new Dep()
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: true,
            get() {
                // 获取值的时候，就建立了订阅关系，例如v-model = {{name}}
                Dep.target && dep.addSub(Dep.target)
                return value
            },
            set(newValue) {
                if (data[key] === newValue) { return }
                value = newValue
                self.observer(newValue)
                // 触发更新
                dep.notify()
            }
        })
    }
}