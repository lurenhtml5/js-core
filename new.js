// 模拟new的实现

// newFactory(fn, params)

const newFactory = () => {
    const args = [...arguments]
    const obj = new Object()
    const constructor = args.shift()
    obj.__proto__ = constructor.prototype
    constructor.apply(obj, args)
    return obj
}