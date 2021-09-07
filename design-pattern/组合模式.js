/**
 * 组合模式：将对象组合成树形结构，以表示“整体-部分”的层次结构。通过对象的多态表现，使得用户对单个对象和组合对象的使用具有一致性。
 */

// demo: 订车票
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


// demo: 万能遥控器开关

const MacroCommand = function () {
    return {
        lists: [],
        add: function (task) {
            this.lists.push(task)
        },
        excute: function () {
            for (let i = 0; i < this.lists.length; i++) {
                this.lists[i].excute()
            }
        }
    }
}

const command1 = MacroCommand()
command1.add({
    excute: () => {
        console.log('煮咖啡')
    }
})

const command2 = MacroCommand()
command2.add({
    excute: () => {
        console.log('打开电视')
    }
})
command2.add({
    excute: () => {
        console.log('打开音响')
    }
})

const command3 = MacroCommand()
command3.add({
    excute: () => {
        console.log('打开空调')
    }
})

const command = MacroCommand()

command.add(command1)
command.add(command2)
command.add(command3)
command.excute()

// demo: 扫描文件夹

const Folder = function (folder) {
    this.folder = folder
    this.lists = []
}

class Folder {
    constructor(folder) {
        this.folder = folder
        this.lists = []
    }

    add(resource) {
        this.lists.push(resource)
        return this
    }

    scan () {
        for (let i = 0; i < this.lists.length; i++) {
            this.lists[i].scan()
        }
    }
}

class File {
    constructor(file) {
        this.file = file
    }
    add() {
        throw Error('文件下不能添加其他文件')
    }

    scan() {
        console.log('开始扫描文件：' + thi.file.name)
    }
}

const folder = new Folder('根文件夹')
const folder1 = new Folder('JS')
const folder2 = new Folder('CSS')

const file1 = new File('深入React技术栈.pdf')
const file2 = new File('JavaScript权威指南.pdf')
const file3 = new File('CSS门指南.pdf')

folder1.add(file1).add(file2)
folder2.add(file3)

folder.add(folder1).add(folder2)
folder.scan()