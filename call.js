/**
 * fn.call的实现
 */
/**
 * usage
 * @param {*} a 
 * @param {*} b 
 */
const beCalled = function (a, b) {
    this.a = a;
    this.b = b;
    console.log(this.a + this.b)
}
beCalled.call({ a: 1, b: 2 }, 11, 22) // 33

Function.prototype.call = function () {
    const args = [...arguments]
    const context = args.shift(0) // 拿到arguments的第一个参数， this
    const restArgs = args.slice(1) // 拿到需要传递的参数
    context.fn = this; // 调用的时候传递this
    context.fn(restArgs);
    delete context.fn
}
