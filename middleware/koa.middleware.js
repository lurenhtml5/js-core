// koa中间件原理

class Koa {
    constructor() {
        this.middlewares = []
    }
    use(middleware) { // 注册中间件
        this.middlewares.push(middleware)
    }
    start({ req }) {
        const composed = composedMiddlewares(this.middlewares)
        return composed({
            req,
            res: undefined
        })
    }
}
/**
 * 简单来说 dispatch(n)对应着第 n 个中间件的执行，而 dispatch(n)又拥有执行 dispatch(n + 1)的权力，
 * 所以在真正运行的时候，中间件并不是在平级的运行，而是嵌套的高阶函数：
 * dispatch(0)包含着 dispatch(1)，而 dispatch(1)又包含着 dispatch(2) 在这个模式下，我们很容易联想到try catch的机制，它可以 catch 住函数以及函数内部继续调用的函数的所有error。
 * @param {*} middleware 
 * @returns 
 */

function composedMiddlewares(middlewares) {
    return function wrapMiddlewares(ctx) {
        let indx = -1
        function dispatch(i) {
            index = i
            const fn = middlewares[i]
            if (!fn) {
                return Promise.resolve()
            }
            return Promise.resolve(fn(ctx, () => dispatch(i+1)))
        }
        return dispatch(0)
    }
}

// 错误处理中间件
const app = new Koa()

// 最外层 管控全局错误 插件的回调会在最后阶段执行，洋葱模型
// 在这个错误处理中间件中，我们把 next 包裹在 try catch 中运行，调用了 next 后会进入第二层的中间件：
app.use(async (ctx, next) => {
    try {
        await next()
    } catch (error) {
        console.log(`[koa error]: ${error.message}`)
    }
})

// 第二层 日志中间件
app.use(async (ctx, next) => {
    const { req } = ctx
    console.log(`req is ${JSON.stringify(req)}`)
    await next()
    console.log(`res is ${JSON.stringify(ctx.res)}`)
})

// 第三层 业务逻辑处理中间件
app.use(async (ctx, next) => {
    const { req } = ctx
    console.log(`calculating the res of ${req}...`)
    const res = {
        code: 200,
        result: `req ${req} success`
    }
    ctx.res = res
    await next()
})

// 测试错误处理中间件，最后加一个这个中间件
app.use(async (ctx, next) => {
    throw new Error("oops! error!")
})

// 最后调用启动函数
app.start({
    req: "ssh"
})



