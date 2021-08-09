

/**
 * 截流函数的实现: 保证两次函数执行的时间间隔不小于timeDuration
 */
/**
 * @param {*} fn 待执行函数
 * @param {*} timeDuration 时间间隔
 * @param {*} immediate 是否立马触发函数执行
 * @returns 可执行函数
 */
 const throttle = function (fn, timeDuration = 200, immediate) {
    let timeId
    return function () {
        const args = [...arguments]
        timeId && clearTimeout(timeId)
        if (immediate) {
            if (!timeId) {
                fn.apply(null, args)
            }
            timeId = setTimeout(() => {
                timeId = null
            }, timeDuration)
        } else {
            setTimeout(() => {
                fn.apply(null, args)
            }, timeDuration)
        }
    }
}