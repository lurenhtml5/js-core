/**
 * 单例模式：保证始终有一个实例存在，如果已经有了实例，那么直接返回；如果没有那么重新创建
 */

/**
 * 例如创建弹窗
 */
class CreatorWin {
    constructor (options) {
        this.title = options.title
        this.isShow = options.isShow
    }
    close () {
        this.isShow = false
    }
}

const ProxyMode = (function () {
    let instance = null
    return function (options) {
        if (!instance) {
            instance = new CreatorWin(options);
        }
        return instance
    }
})()

const a = ProxyMode('win1')

const b = ProxyMode('win2')

a === b