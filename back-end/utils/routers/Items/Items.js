var express = require('express')
var router = express.Router()
const { nonAdminAuth, AdminAuth } = require('../../Middleware/Auth')
const Item = require('../../db/Models/Item')



router.post('/saveItem', AdminAuth, async (req, res) => {
  try {
    data = req.body
    stock = {}
    data.sizes.forEach(size => {
      stock[size] = {}
      data.colors.forEach(color => {
        try {
          if (data.stock[size][color] !== undefined) {
            stock[size][color] = data.stock[size][color]
          } else {
            stock[size][color] = true
          }
        } catch (e) {
          stock[size][color] = true
        }
      })
    })
    console.log(data)
    item = new Item({ ...data, author: req.user, stock })
    await item.save()
    res.status(200)
    res.send(item._id)
  } catch (e) {
    console.log(e)
    res.status(400)
    res.send(e)
  }
})

router.post('/update', AdminAuth, async (req, res) => {
  item = await Item.findByIdAndUpdate(req.body.id, {...req.body})
  res.status(200)
  res.send("Stock modified")
  console.log('recieved update request')
})

router.get('/loadItems', async (req, res) => {
  const items = await Item.find({ visible: true })
    .select("-body -__v -views")

  res.send(items)
})

router.get('/fetchItem', async (req, res) => {
  id = req.query.id
  const item = await Item.findOneAndUpdate({ _id: id, visible: true }, { $inc: { 'views': 1 } }).select(" -__v -views -visible -createdAt").exec();
  // const post = await Post.find({_id: id}).select(" -__v -views")
  res.send(item)

})

module.exports = router