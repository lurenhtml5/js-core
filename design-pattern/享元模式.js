/**
 *  
 * 享元模式是一种优化程序性能的模式, 本质为减少对象创建的个数。
    以下情况可以使用享元模式:
    1.有大量相似的对象, 占用了大量内存
    2.对象中大部分状态可以抽离为外部状态
 */

//demo 某商家有 50 种男款内衣和 50 种款女款内衣, 要展示它们

// 方案一: 造 50 个塑料男模和 50 个塑料女模, 让他们穿上展示, 代码如下:

class Model {

    constructor(gender, underWare) {
        this.gender = gender
        this.underWare = underWare
    }

    takePhoto() {
        console.log(`${this.gender}穿着${this.underwear}`)
    }
}

for (let i = 0; i < 51; i++) {
    const maleModel = new Model('male', `第${i}套衣服`)
    maleModel.takePhoto()
}

for (let i = 0; i < 51; i++) {
    const femaleModel = new Model('female', `第${i}套衣服`)
    femaleModel.takePhoto()
}

//方案二: 造 1 个塑料男模特 1 个塑料女模特, 分别试穿 50 款内衣

class Model {
    constructor(gender) {
        this.gender = gender
    }

    takePhoto() {
        console.log(`${this.gender}穿着${this.underwear}`)
    }
}

const maleModel = new Model('male')
const femaleModel = new Model('female')

for (let i = 0; i < 51; i++) {
    maleModel.underWare(`第${i}套衣服`)
    maleModel.takePhoto()
}

for (let i = 0; i < 51; i++) {
    femaleModel.underWare(`第${i}套衣服`)
    femaleModel.takePhoto()
}

// 改进
class Model {
    constructor(gender) {
        this.gender = gender
    }

    takePhoto() {
        console.log(`${this.gender}穿着${this.underwear}`)
    }
}

const ModelFactory = (function () {
    const modelGender = {}
    return {
        createModel: function (gender) {
            if (modelGender[gender]) {
                return modelGender[gender]
            }
            return new Model(gender)
        }
    }
})()

const ModelManager = (function () {
    const modelObj = {}
    return {
        add: function (gender, i) {
            modelObj[i] = {
                underWare: `第${i}套衣服`
            }
            return ModelFactory.createModel(gender)
        },
        copy: function (model, i) {
            model.underWare = modelObj[i].underWare
        }
    }
})()

for (let i = 1; i < 51; i++) {
    const maleModel = modelManager.add('male', i)
    modelManager.copy(maleModel, i)
    maleModel.takePhoto()
}

for (let i = 1; i < 51; i++) {
    const femaleModel = modelManager.add('female', i)
    modelManager.copy(femaleModel, i)
    femaleModel.takePhoto()
}

// demo 驾照考试

let examCarNum = 0

class ExamCar {
    constructor(carType) {
        examCarNum++
        this.carId = examCarNum
        this.carType = carType ? '自动挡' : '手动挡'
        this.useState = false
    }

    examine (candidateId) {
        return new Promise((resolve) => {
            this.useState = true
            setTimeout(() => {
                this.useState = false
                console.log(`%c考生- ${ candidateId } 在${ this.carType }驾考车-${ this.carId } 上考试完毕`, 'color:#f40')
                resolve()
            }, Math.random() * 2000)
        })
    }
}

const ExamCarManage = {
    _pool: [], // 考车对象池
    _candidateQueue: [], // 考生对象池

    registCandidates: (list) => {
        list.forEach(id => {
            ExamCarManage.registCandidate(id)
        })
    },
     /* 注册手动档考生 */
     registCandidate(candidateId) {
        const examCar = this.getManualExamCar()  // 找一个未被占用的手动档驾考车
        if (examCar) {
            examCar.examine(candidateId) // 开始考试，考完了让队列中的下一个考生开始考试
              .then(() => {
                  const nextCandidateId = ExamCarManage._candidateQueue.length && ExamCarManage._candidateQueue.shift()
                  nextCandidateId && ExamCarManage.registCandidate(nextCandidateId)
              })
        } else ExamCarManage._candidateQueue.push(candidateId)
    },
    // 注册驾车
    initManualExamCar: (manualExamCarNum) => {
        for (let i = 1; i <= manualExamCarNum; i++) {
            ExamCarManage._pool.push(new ExamCar(true))
        }
    },
     /* 获取状态为未被占用的手动档车 */
     getManualExamCar:() =>  {
        return ExamCarManage._pool.find(car => !car.useState)
    }
}
ExamCarManage.initManualExamCar(3) // 3辆车

ExamCarManage.registCandidates([1,2,3,4,5]) // 5个考生