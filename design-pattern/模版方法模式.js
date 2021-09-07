
class Drinks {
    firstStep() {
        console.log('烧开水')
    }
    thirdStep() {
        console.log('倒入杯子')
    }
    secondStep() {
        
    }
    fourthStep() {
        
    }
    init() {
        this.firstStep()
        this.secondStep()
        this.thirdStep()
        this.fourthStep()
    }
}

class Tea extends Drinks {
    secondStep() {
        console.log('浸泡茶叶')
    }
    fourthStep() {
        console.log('加柠檬')
    }
}
 
class Coffee extends Drinks {
    secondStep() {
        console.log('冲泡咖啡')
    }
    fourthStep() {
        console.log('加糖')
    }
}
