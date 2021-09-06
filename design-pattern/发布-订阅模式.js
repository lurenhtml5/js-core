/**
 * 发布-订阅模式，也叫观察者模式：定义了一种一对多的关系，让多个观察者对象同时监听某一个主题对象，这个主题对象的状态发生变化时就会通知所有的观察者对象，使它们能够自动更新自己，当一个对象的改变需要同时改变其它对象，并且它不知道具体有多少对象需要改变的时候，就应该考虑使用观察者模式
 */

// demo1
/**
 * 发布状态
 */
class Subject {
    constructor() {
        this.state = 0
        this.observers = []
    }

    getState() {
        return this.state
    }

    setState(state) {
        this.state = state
        this.notifyAllObservers()
    }

    notifyAllObservers() {
        this.observers.forEach(ob => {
            ob.update()
        })
    }

    attachOb(observer) {
        this.observers.push(observer)
    }
    
}

/**
 * 订阅状态改变
 */
class Observer {
    constructor(name, subject) {
        this.name = name
        this.subject = subject
        this.subject.attachOb(this)
    }
    update() {
        console.log(`${this.name} update, state: ${this.subject.getState()}`)
    }
}

// 测试
let s = new Subject()
let o1 = new Observer('o1', s)
let o2 = new Observer('02', s)
s.setState(12)

// demo2: event dispatch

class EventEmitter {
    listeners = {}
    getListeners() {
        return this.listeners
    }

    on(type, cb) {
        let cbs = this.listeners[type]
        if (cbs === null || cbs === undefined) {
            cbs = []
        }
        cbs.push(cb)
        this.listeners[type] = cbs
    }

    dispatch(type, ...args) {
        if (this.listeners[type] && Array.isArray(this.listeners[type]) && this.listeners[type].length) {
            this.listeners[type].forEach(cb => {
                if (typeof cb === 'function') {
                    cb(args)
                }
            })
        }
    }

    remove(type, cb) {
        if (cb !== undefined) {
            const cbs = this.listeners[type]
            if (cbs === null || cbs === undefined) {
                return
            }
            const index = cbs.findIndex(c => c === cb)
            cbs.splice(index, 1)
            this.listeners[type] = cbs
        } else {
            this.listeners[type] = null
            delete this.listeners[type]
        }
    }
}