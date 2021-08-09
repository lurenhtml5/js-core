
const throttle = function (fn, duration) {
    let timeId
    let prevExecuteTime
    return function () {
        if (!prevExecuteTime) {
            fn.apply(null, [...arguments])
            prevExecuteTime = Date.now()
            return
        }
        const nowTime = Date.now()
        if (nowTime - prevExecuteTime <= duration) {
            timeId = setTimeout(() => {
                fn.apply(null, [...arguments])
                prevExecuteTime = Date.now()
            }, duration - (nowTime - prevExecuteTime))
        } else {
            timeId && clearTimeout(timeId)
            timeId = null
            fn.apply(null, [...arguments])
            prevExecuteTime = Date.now()
        }
    }
}