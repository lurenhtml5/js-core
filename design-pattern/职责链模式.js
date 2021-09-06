/**
 * 场景：领券购买的场景
 */

/**
 *  实现1：if else 太多，代码逻辑不够清晰，不利于维护
 * @param {*} orderType 
 * @param {*} pay 
 * @param {*} stock 
 */
const order = function (orderType, pay, stock) {
    if (orderType === 1) { // 500元定金
        if (pay) { // 已支付
            console.log('500元定金预购，得到100元优惠券')
        } else { // 未支付
            if (stock > 0) {
                console.log('普通购买，无法使用优惠券')
            } else {
                console.log('库存不足')
            }
        }
    } else if (orderType === 2) { // 200元定金
        if (pay) { // 已支付
            console.log('200定金预购，得到50元优惠券')
        } else { // 未支付
            if (stock > 0) {
                console.log('普通购买，无法使用优惠券')
            } else {
                console.log('库存不足')
            }
        }
    } else if (orderType === 1) { // 无定金
        if (stock > 0) {
            console.log('普通购买，无法使用优惠券')
        } else {
            console.log('库存不足')
        }
    }
}

// order(1, true, 500)

/**
 * 实现2: 将结构和逻辑分离，不同价格的优惠券，逻辑单独处理;也不利于维护，如果后续推出新的购物券，怎么整？还是需要修改源代码，代码耦合太高
 * @param {*} orderType 
 * @param {*} pay 
 * @param {*} stock 
 */
const order_500 = function (orderType, pay, stock) {
    if (orderType === 1 && pay) {
        console.log('500元定金预购，得到100元优惠券')
    } else {
        order_200(orderType, pay, stock)
    }
}

const order_200 = function (orderType, pay, stock) {
    if (orderType === 2 && pay) {
        console.log('200元定金预购，得到50元优惠券')
    } else {
        order_Normal(orderType, pay, stock)
    }
}

const order_Normal = function (orderType, pay, stock) {
    if (stock > 0) {
        console.log('普通购买，无法使用优惠券')
    } else {
        console.log('库存不足')
    }
}
/**
 * 实现3：
 */

const orderFor500 = function (orderType, pay, stock) {
    if (orderType === 1 && pay) {
        console.log('500元定金预购，得到100元优惠券')
    } else {
        return 'next' // 不知道下一步做什么处理，只知道需要往下传递流程
    }
}

const orderFor300 = function (orderType, pay, stock) {
    if (orderType === 2 && pay) {
        console.log('300元定金预购，得到50元优惠券')
    } else {
        return 'next'
    }
}

const orderForNormal = function (orderType, pay, stock) {
    if (stock > 0) {
        console.log('普通购买，无法使用优惠券')
    } else {
        console.log('库存不足')
    }
}

// 声明链路类，用于暂存order500这种逻辑方法和建立链式调用关系

class Chain {
    constructor(fn) {
        this.fn = fn
        this.nextStepFn = null
    }

    setNextStep (nextFn) {
        return this.nextStepFn = nextFn
    }

    stepCalling() {
        let result = this.fn.apply(this, arguments)
        if (result === 'next') {
            result = this.nextStepFn && this.nextStepFn.stepCalling.apply(this.nextStepFn, arguments)
        }
        return result
    }
}

const order500Chain = new Chain(orderFor500)
const order300Chain = new Chain(orderFor300)
const orderNormalChain = new Chain(orderForNormal)

order500Chain.setNextStep(order300Chain)
order300Chain.setNextStep(orderNormalChain)

order500Chain.stepCalling(1, true, 100)
order500Chain.stepCalling(2, false, 100)


// 例如 需要新增一个100-10的优惠券
const orderFor100 = function (orderType, pay, stock) {
    if (orderType === 3 && pay) {
        console.log('100元定金预购，得到10元优惠券')
    } else {
        return 'next'
    }
}
// 修改上面的依赖关系即可
const order100Chain = new Chain(orderFor100)
order500Chain.setNextStep(order300Chain)
order300Chain.setNextStep(order100Chain)
order100Chain.setNextStep(orderNormalChain)

// 以上是同步的职责链模式，异步的处理方式：新增next方法，在异步函数内部手动调next


class AsyncChain {
    constructor(fn) {
        this.fn = fn
        this.nextStepFn = null
    }

    setNextStep (nextFn) {
        return this.nextStepFn = nextFn
    }

    stepCalling() {
        let result = this.fn.apply(this, arguments)
        if (result === 'next') {
            result = this.nextStepFn && this.nextStepFn.stepCalling.apply(this.nextStepFn, arguments)
        }
        return result
    }

    next() {
        return this.nextStepFn && this.nextStepFn.stepCalling.apply(this.nextStepFn, arguments)
    }
}


const fn1 = new AsyncChain(function () {
    console.log('fn1')
    return 'next'
})

const fn2 = new AsyncChain(function () {
    console.log('fn2')
    const self = this
    setTimeout(() => {
        self.next()
    }, 1000)
})

const fn3 = new AsyncChain(function () {
    console.log('fn3')
    return 'next'
})

fn1.setNextStep(fn2).setNextStep(fn3)
fn1.stepCalling()