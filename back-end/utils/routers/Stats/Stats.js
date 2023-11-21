var express = require('express')
var router = express.Router()
const { nonAdminAuth, AdminAuth } = require('../../Middleware/Auth')
const Order = require('../../db/Models/Order')
const Item = require('../../db/Models/Item')
const User = require('../../db/Models/User')




router.get('/', AdminAuth, async (req, res) => {

    

    const docs = await Promise.all([Order.find().exec(), Item.find().exec(), User.find().exec()])

    const orders = docs[0]
    const items = docs[1]
    const users = docs[2]

    const TotalPredictedIncome = orders.reduce((acc, curr) => acc + curr.amount  , 0)


    let stats = {
        overview: {
            nOrders: orders.length,
            nItems: items.length,
            nUsers: users.length,
            TotalPredictedIncome,
        },
        items: {}
    }

    items.forEach(item => {
        ordersBySize = {}
        item.colors.forEach(color => {
            ordersBySize[color] = {}
            item.sizes.forEach(size => {
                ordersBySize[color][size] = {
                    InProgress: 0,
                    Shipped: 0,
                    Cancelled: 0,
                    Returned: 0
                }
            })
        })
        stats.items[item._id] = {
            title: item.title,
            id: item._id,
            thumb: item.thumbnail,
            price: item.price,
            ordersBySize,
        }
    })

    orders.forEach(order => {
        order.order.forEach(item => {
            stats.items[item.item].ordersBySize[item.color][item.size][order.status] = stats.items[item.item].ordersBySize[item.color][item.size][order.status] + item.quantity
        })
    })


  res.send(stats)
})


module.exports = router