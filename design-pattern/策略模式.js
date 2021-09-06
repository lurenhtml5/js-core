/**
 * 策略模式：根据不同的条件，设置各种不同的算法逻辑；避免过长的if else嵌套；常见的业务场景：比如前端的输入框校验：邮箱、手机号、网址等等
 */

const regexMap = {
    'email': /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/g,
    'phone': /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/g,
    'id': /^[1-9]\\d{7}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])\\d{3}$/g
}

const inputValidate = function (type, input) {
    return regexMap[type].test(input)
}

inputValidate('phone', '122121212121')
inputValidate('id', '2121212121')


// 策略对象
const strategies = {
    isNoEmpty: function (value, errorMsg) {
      if (value === '') {
        return errorMsg;
      }
    },
    isNoSpace: function (value, errorMsg) {
      if (value.trim() === '') {
        return errorMsg;
      }
    },
    minLength: function (value, length, errorMsg) {
      if (value.trim().length < length) {
        return errorMsg;
      }
    },
    maxLength: function (value, length, errorMsg) {
      if (value.length > length) {
        return errorMsg;
      }
    },
    isMobile: function (value, errorMsg) {
      if (!/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|17[7]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(value)) {
        return errorMsg;
      }                
    }
}

// 验证类
class Validator {
    constructor() {
        this.cache = []
    }

    add(dom, rules) {
        for (let i = 0, rule; rule = rules[i++];) {
            if (!rule) { return }
            let strategyAry = rule.strategy.split(':')
            let errorMsg = rule.errorMsg
            this.cache.push(() => {
                let strategy = strategyAry.shift()
                strategyAry.unshift(dom.value)
                strategyAry.push(errorMsg)
                return strategies[strategy].apply(dom, strategyAry)
            })
        }
    }

    start() {
        for (let i = 0, validatorFunc; validatorFunc = this.cache[i++];) {
            let errorMsg = validatorFunc && validatorFunc()
            if (errorMsg) {
                return errorMsg
            }
        }
    }
}

let validataFunc = function() {
    let validator = new Validator()
    validator.add(registerForm.userName, [{
      strategy: 'isNoEmpty',
      errorMsg: '用户名不可为空'
    }, {
      strategy: 'isNoSpace',
      errorMsg: '不允许以空白字符命名'
    }, {
      strategy: 'minLength:2',
      errorMsg: '用户名长度不能小于2位'
    }])
    validator.add(registerForm.password, [ {
      strategy: 'minLength:6',
      errorMsg: '密码长度不能小于6位'
    }])
    validator.add(registerForm.phoneNumber, [{
      strategy: 'isMobile',
      errorMsg: '请输入正确的手机号码格式'
    }])
    return validator.start()
}

validataFunc()

// 优点

// 利用组合、委托、多态等技术和思想，可以有效的避免多重条件选择语句
// 提供了对开放-封闭原则的完美支持，将算法封装在独立的strategy中，使得它们易于切换，理解，易于扩展
// 利用组合和委托来让Context拥有执行算法的能力，这也是继承的一种更轻便的代替方案

// 缺点

// 会在程序中增加许多策略类或者策略对象
// 要使用策略模式，必须了解所有的strategy，必须了解各个strategy之间的不同点，这样才能选择一个合适的strategy
