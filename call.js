/**
 * fn.call的实现
 */
/**
 * usage
 * @param {*} a 
 * @param {*} b 
 */
const beCalled = function (a, b, c) {
    this.a = a;
    this.b = b;
    console.log(this.a + this.b + c)
}
beCalled.call({ a: 1, b: 2 }, 11, 22) // 33

Function.prototype.call = function () {
    const args = [...arguments]
    const context = args.shift(0) // 拿到arguments的第一个参数， this
    context.fn = this; // 调用的时候传递this
    // context.fn(restArgs);
    const params = []
    args.forEach(a => {
        params.push(`${a}`)
    })
    eval(`context.fn(${params})`)
    delete context.fn
}
