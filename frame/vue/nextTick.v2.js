
import { noop } from 'shared/util'

import { handleError } from './error'

import { isIE, isIOS, isNative } from './env'

// 放回调函数
const callbacks = []
// 状态标志，表示这次的微任务回调是否正在执行
let pending = false

// 依次执行所有的回调 
function flushCallbacks() {
    // 执行回，重置状态位
    pending = false
    const copies = callbacks.slice(0)
    callbacks.length = 0
    for (let i = 0; i < copies.length; i++) {
        copies[i]()
    }
}

// nextTick最后要触发的函数
let timerFunc

// 判断原生Promise是否存在
if (typeof Promise !== 'undefined' && isNative(Promise)) {
    const p = Promise.resolve()
    timerFunc = () => {
        p.then(flushCallbacks)
        if (isIOS) setTimeout(noop)
    }
} else if (!isIE && typeof MutationObserver !== 'undefined' && (isNative(MutationObserver) || MutationObserver.toString() === `[object MutationObserverConstructor]`)) {
    let counter = 1
    // flushCallbacks作为MutationObserver的回调函数
    const observer = new MutationObserver(flushCallbacks)
    // 做一个不展示的dom节点
    const textNode = document.createTextNode(String(counter))
    observer.observe(textNode, {
        characterData: true
    })
    // 借用textNode的更新，触发flushCallbacks
    timerFunc = () => {
        counter = (counter + 1) % 2
        textNode.data = String(counter)
    }
} else {
    timerFunc = setTimeout(flushCallbacks, 0)
}

// 从上可以看出，yyx采用微任务的优先级是promise > MutationObserver, 当promise和MutationObserver都不支持的情况下，会用setTimeout

export function nextTick(cb, ctx) {
    // 用来处理未传cb的情况
    let _resolve
    callbacks.push(() => {
        if (cb) {
            try {
                cb.call(ctx)
            } catch (e) {
                handleError(e, ctx, 'nextTick')
            }
        } else if (_resolve){
            _resolve(ctx)
        }
    })
    if (!pending) {
        pending = true
        // 触发微任务的执行
        timerFunc()
    }
    // 不传cb的时候，返回promise，来标志其他callbacks的回调是否执行完成
    if (!cb && typeof Promise !== undefined) {
        return new Promise(resolve => {
            _resolve = resolve
        })
    }
}

// 以上是vue2.6版本的nextTick实现，其中做了大量的兼容，可以对比下vue3中nextTick的实现，vue3中就直接采用了promise实现