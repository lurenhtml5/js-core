/**
 * fn.bind的实现
 */
/**
 * usage
 * @param {*} a 
 * @param {*} b 
 */
const beBinded = function (a, b ) {
    console.log(a+b)
}
const fn = beBinded.bind(1,2)
fn() // 3

Function.prototype.bind = function () {
    const args = [...arguments]
    const context = this
    return function () {
        context.apply(args[0], args.slice(1)) // 参照apply的实现
    }
}
