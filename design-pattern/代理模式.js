/**
 * 代理模式：是为一个对象提供一个代用品或占位符，以便控制对它的访问
 */

/**
 * a送花给女神c，但是不好意思；只能通过女神c的闺蜜b，来给c送花；也就是把送花的工作，完全交给闺蜜b来控制，送不送，何时送
 */
const Flower = function () { }

let a = {
    sendFlower: function (target) {
        const flw = new Flower()
        target.receiveFlower(flw)
    }
}

let b = {
    flower: null, 
    receiveFlower: function (flower) {
        this.flower = flower
    },
    watchCMoodHandler: function (mood) {
        if (mood === 'happy') {
            c.receiveFlower(this.flower)
        }
    }
}

let c = {
    mood: 'bad',
    receiveFlower: function (flower) {
        console.log(`收到${flower.name}了，很开心`)
    },
    changeMood: function (mood) {
        this.mood = mood
        watchCMoodHandler(this.mood)
    }
}
a.sendFlower(b)

c.changeMood('happy') // 收到玫瑰了，很开心


/**
 * 缓存代理实现乘积计算
 */

 const multi = function() {
    let a = 1
    for (let i = 0, l; l = arguments[i++];) {
      a = a * l
    }
    return a
 }
  
const proxyMulti = (function () {
    const cache = {}
    return function () {
        const tag = [].prototype.join.call(arguments, ',')
        if (cache[tag]) {
            return cache[tag]
        }
        cache[tag] = multi.apply(this, arguments)
        return cache[tag]
    }
})()

proxyMulti(1, 2, 3, 4)