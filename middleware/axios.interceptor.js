
/**
 * axios官方的拦截器示例
 */

// 请求拦截器
axios.interceptors.request.use(
    function (config) {
        return config
    },
    function (error) {
        return Promise.reject(error)
    }
)
// 响应拦截器
axios.interceptors.response.use(
    function (config) {
        return config
    },
    function (error) {
        return Promise.reject(error)
    }
)

// 实现
axios.interceptors = {
    request: [],
    response: []
}

// 注册请求拦截器
axios.interceptors.request.use = (resolved, rejected) => {
    axios.interceptors.request.push({
        resolved,
        rejected
    })
}
// 注册响应拦截器
axios.interceptors.response.use = (resolved, rejected) => {
    axios.interceptors.response.push({
        resolved,
        rejected
    })
}
// 运行拦截器
axios.run = config => {
    const chain = [ // 未配置请求/响应拦截器的初始状态
        {
            resolved: axios,
            rejected: undefined
        }
    ]
    // 按洋葱模型进行运行
    // 后注册的请求拦截 先运行
    axios.interceptors.request.forEach(requestInterceptor => {
        chain.unshift(requestInterceptor)
    })
    // 响应拦截 顺序执行
    axios.interceptors.response.forEach(responseInterceptor => {
        chain.push(responseInterceptor)
    })
    
    let promise = Promise.resolve(config)

    while (chain.length) {
        const { resolved, rejected } = chain.shift()
        promise = promise.then(resolved, rejected) // resolved | rejected return后 进入下一次的promise.then, 同时将resolved和rejected的值传递到下一次的promise
        return promise
    }
}

// test
// 请求拦截1
axios.interceptors.request.use(resolved1, rejected1)
// 请求拦截2
axios.interceptors.request.use(resolved2, rejected2)
// 响应拦截1
axios.interceptors.response.use(resolved1, rejected1)
// 响应拦截2
axios.interceptors.response.use(resolved2, rejected2)

// chain结构
// [
//     请求拦截器2，// ↓config
//     请求拦截器1，// ↓config
//     axios请求核心方法, // ↓response
//     响应拦截器1, // ↓response
//     响应拦截器2// ↓response
// ]
axios.useRequestInterceptor(config => {
    return {
        ...config,
        extraParams1: "extraParams1"
    };
    });

    axios.useRequestInterceptor(config => {
    return {
        ...config,
        extraParams2: "extraParams2"
    };
    });

    axios.useResponseInterceptor(
    resp => {
        const {
            extraParams1,
            extraParams2,
            result: { code, message }
        } = resp;
        return `${extraParams1} ${extraParams2} ${message}`;
    },
    error => {
        console.log("error", error);
    }
)
const result = axios.run({
    message: 'success'
})

// if success:  result = `extraParams1 extraParams2 success

