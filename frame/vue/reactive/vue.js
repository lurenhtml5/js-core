
/**
 * Vue类
 * 实现：将this.***代理到this.$data.***,
 */
class Vue {
    constructor(options) {
        this.$options = options || {}
        this.$el =
            typeof options.el === 'string' ? document.querySelector(options.el) : options.el
        this.$data = options.data || {}
        this.proxyData(this.$data)
        new Observer(this.$data)
        new Compiler(this)
    }

    proxyData(data) {
        Reflect.ownKeys(data).forEach(key => {
            Object.defineProperty(this, key, {
                enumerable: true,
                configurable: true,
                get() {
                    return data[key]
                },
                set(newValue) {
                    if (newValue === data[key]) { return }
                    data[key] = newValue
                }
            })
        })
    }
}