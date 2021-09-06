/**
 * 组合模式：将对象组合成树形结构，以表示“整体-部分”的层次结构。通过对象的多态表现，使得用户对单个对象和组合对象的使用具有一致性。
 */

class TrainOrder {
    create() {
        console.log('创建火车票')
    }
}

class HotelOrder {
    create() {
        console.log('创建酒店订单')
    }
}

class TotalOrder {
	constructor () {
		this.orderList = []
	}
	addOrder (order) {
		this.orderList.push(order)
		return this
	}
	create () {
		this.orderList.forEach(item => {
			item.create()
		})
		return this
	}
}

const train = new TrainOrder()
const hotel = new HotelOrder()
const total = new TotalOrder()

total.addOrder(train).addOrder(hotel).create()