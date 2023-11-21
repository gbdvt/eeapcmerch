var express = require('express')
var router = express.Router()
const { nonAdminAuth, AdminAuth } = require('../../Middleware/Auth')
const Order = require('../../db/Models/Order')
const Item = require('../../db/Models/Item')
const User = require('../../db/Models/User')
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
const nodemailer = require("nodemailer");
const email = require('../../Mail/Templates/NewOrder')
const moment = require('moment');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MailAddress,
    pass: process.env.MailPassword
  }
});


router.post('/buy', nonAdminAuth, async (req, res) => {
  try {
    const user_id = req.user.data
    const data = req.body
    const docs = await Promise.all([User.findById(user_id).select(" -__v -password").exec(), Item.find({'_id': { $in: data.order.map(order => order.item) }}).exec()])

    const user = docs[0]
    const items = docs[1]

    const amount =  items.reduce((acc, item) => acc + item.price * data.order.find(order => order.item == item._id).quantity, 0)
    const payment = await stripe.charges.create({
      amount: amount,
      currency: "EUR",
      description: "Vendemos camisetas personalizadas",
      // payment_method: data.token.card.id,
      // confirm: true,
      source: data.token.id
    });
    order = new Order({ order: data.order, author: req.user.data, authorData: user, amount, shipment: data.addresses, charge: {id: payment.id, amount: payment.amount, createdAt: payment.created} })
    await order.save()
    res.status(200)
    res.send(order._id)

    const mailData = {
      title: "Tu pedido ha sido creado!",
      description: "Hemos recibido tu pedido, y lo enviaremos cuanto antes, puedes ver el progreso del pedido en la seccion 'Mis Pedidos' de nuestra web",
      shipmentAddress: `${order.shipment.shipping_address_line1}, ${order.shipment.shipping_address_city} (${order.shipment.billing_address_zip})`,
      date: moment(order.createdAt).format('DD-MM-YYYY'),
      id: `#${order._id}`,
      total: `${parseFloat(order.amount / 100)} €`,
      items: items.map((item) => ({
        thumb: item.thumbnail,
        title: item.title,
        quantity: order.order.find(it => it.item == item._id).quantity,
        price: `${parseFloat(item.price / 100)} €`,
        size: order.order.find(it => it.item == item._id).size,
        color: order.order.find(it => it.item == item._id).color
      }))
    }
    let info = await transporter.sendMail({
      from: `"Paula 👻" <${process.env.MailAddress}>`, // sender address
      to: order.authorData.email, // list of receivers
      subject: "Hola ✔, hemos recibido tu pedido!", // Subject line
      html: email(mailData), // html body
    });

  } catch (e) {
    console.log(e)
    res.status(400)
    res.send(e)
  }
})


router.post('/buyInPerson', nonAdminAuth, async (req, res) => {
  try {
    const user_id = req.user.data
    const data = req.body
    const docs = await Promise.all([User.findById(user_id).select(" -__v -password").exec(), Item.find({'_id': { $in: data.order.map(order => order.item) }}).exec()])

    const user = docs[0]
    const items = docs[1]

    const amount =  items.reduce((acc, item) => acc + item.price * data.order.find(order => order.item == item._id).quantity, 0)
    order = new Order({ order: data.order, author: req.user.data, authorData: user, amount, shipment: "In Person", charge: "In Person" })
    await order.save()
    res.status(200)
    res.send(order._id)

    const mailData = {
      title: "Tu pedido ha sido creado!",
      description: "Hemos recibido tu pedido, Cunato antes te contactaremos, para organizar el pago y la entrega",
      shipmentAddress: `En Persona`,
      date: moment(order.createdAt).format('DD-MM-YYYY'),
      id: `#${order._id}`,
      total: `${parseFloat(order.amount / 100)} €`,
      items: items.map((item) => ({
        thumb: item.thumbnail,
        title: item.title,
        quantity: order.order.find(it => it.item == item._id).quantity,
        price: `${parseFloat(item.price / 100)} €`,
        size: order.order.find(it => it.item == item._id).size,
        color: order.order.find(it => it.item == item._id).color
      }))
    }
    let info = await transporter.sendMail({
      from: `"Paula 👻" <${process.env.MailAddress}>`, // sender address
      to: order.authorData.email, // list of receivers
      subject: "Hola ✔, hemos recibido tu pedido!", // Subject line
      html: email(mailData), // html body
    });

  } catch (e) {
    console.log(e)
    res.status(400)
    res.send(e)
  }
})



router.post('/loadMyOrders', nonAdminAuth, async (req, res) => {
  const orders = await Order.find({ author: req.user.data })
    .select(" -__v -author -payment")

  res.send(orders)
})

router.post('/loadAllOrders', AdminAuth, async (req, res) => {

  if (req.body == {}) {
    const orders = await Order.find()
    res.status(200)
    return res.send(orders)

  } else {

    let options = {}

    if (req.body.name) {
      options['authorData.name'] = {$regex: new RegExp(req.body.name, 'i')}
    }

    if (req.body.email) {
      options['authorData.email'] = {$regex: new RegExp(req.body.email, 'i')}
    }

    if (req.body.status) {
      options['status'] = req.body.status
    }
    const orders = await Order.find(options)
    res.status(200)
    return res.send(orders)
  }
})

router.get('/ship', AdminAuth, async (req, res) => {
  const id = req.query.id
  const order = await Order.findByIdAndUpdate(id, { status: "Shipped" })

  res.status(200)
  res.send("Order has been shipped")

  const items = await Item.find({'_id': { $in: order.order.map(order => order.item) }}).exec()

  const mailData = {
    title: "Tu pedido ha sido enviado!",
    description: "Hemos procesado tu pedido, y hemos enviado, puedes esperar que llegue aproximadamente en una semana, esperemos que lo disfrutes.",
    shipmentAddress: `${order.shipment.shipping_address_line1}, ${order.shipment.shipping_address_city} (${order.shipment.billing_address_zip})`,
    date: moment(order.createdAt).format('DD-MM-YYYY'),
    id: `#${order._id}`,
    total: `${parseFloat(order.amount / 100)} €`,
    items: items.map((item) => ({
      thumb: item.thumbnail,
      title: item.title,
      quantity: order.order.find(it => it.item == item._id).quantity,
      price: `${parseFloat(item.price / 100)} €`,
      size: order.order.find(it => it.item == item._id).size,
      color: order.order.find(it => it.item == item._id).color
    }))
  }
  let info = await transporter.sendMail({
    from: `"Paula 👻" <${process.env.MailAddress}>`, // sender address
    to: order.authorData.email, // list of receivers
    subject: "Hola ✔, hemos enviado tu pedido!", // Subject line
    html: email(mailData), // html body
  });

})

router.get('/return', AdminAuth, async (req, res) => {
  try {
    id = req.query.id
  const order = await Order.findById(id)

  if (order.charge != "In Person") {
    await stripe.refunds.create({
      charge: order.charge.id,
    });
  }

  order.status = "Returned"
  await order.save()

  res.status(200)
  res.send("Order has been returned, and the payment has been refunded")

  const items = await Item.find({'_id': { $in: order.order.map(order => order.item) }}).exec()

  const mailData = {
    title: "Tu pedido ha sido devuelto.",
    description: "Hemos procesado tu solicitud de devolucion, tu dinero sera reembolsado en unos dias.",
    shipmentAddress: `${order.shipment.shipping_address_line1}, ${order.shipment.shipping_address_city} (${order.shipment.billing_address_zip})`,
    date: moment(order.createdAt).format('DD-MM-YYYY'),
    id: `#${order._id}`,
    total: `${parseFloat(order.amount / 100)} €`,
    items: items.map((item) => ({
      thumb: item.thumbnail,
      title: item.title,
      quantity: order.order.find(it => it.item == item._id).quantity,
      price: `${parseFloat(item.price / 100)} €`,
      size: order.order.find(it => it.item == item._id).size,
      color: order.order.find(it => it.item == item._id).color
    }))
  }
  let info = await transporter.sendMail({
    from: `"Paula 👻" <${process.env.MailAddress}>`, // sender address
    to: order.authorData.email, // list of receivers
    subject: "Hola ✔, hemos devuelto tu pedido!", // Subject line
    html: email(mailData), // html body
  });

  } catch (e) {
    console.log(e)
    res.status(400)
    res.send("There was a problem processing the return")
  }
})

router.get('/cancel', nonAdminAuth, async (req, res) => {
  try {
    user_id = req.user.data
    id = req.query.id

  const [user, order] = await Promise.all([User.findById(user_id), Order.findById(id)])
  

  if (order.author !== user_id && !user.isAdmin) {
    res.status(400)
    res.send("Not Authorized")
  }

  if (order.charge != "In Person") {
    await stripe.refunds.create({
      charge: order.charge.id,
    });
  }

  order.status = "Cancelled"
  await order.save()

  res.status(200)
  res.send("Cancelled Order, and refunded the aount paid")

  const items = await Item.find({'_id': { $in: order.order.map(order => order.item) }}).exec()

  const mailData = {
    title: "Tu pedido ha sido devuelto.",
    description: "Hemos procesado tu solicitud de devolucion, tu dinero sera reembolsado en unos dias.",
    shipmentAddress: `${order.shipment.shipping_address_line1}, ${order.shipment.shipping_address_city} (${order.shipment.billing_address_zip})`,
    date: moment(order.createdAt).format('DD-MM-YYYY'),
    id: `#${order._id}`,
    total: `${parseFloat(order.amount / 100)} €`,
    items: items.map((item) => ({
      thumb: item.thumbnail,
      title: item.title,
      quantity: order.order.find(it => it.item == item._id).quantity,
      price: `${parseFloat(item.price / 100)} €`,
      size: order.order.find(it => it.item == item._id).size,
      color: order.order.find(it => it.item == item._id).color
    }))
  }
  let info = await transporter.sendMail({
    from: `"Paula 👻" <${process.env.MailAddress}>`, // sender address
    to: order.authorData.email, // list of receivers
    subject: "Hola ✔, hemos cancelado tu pedido.", // Subject line
    html: email(mailData), // html body
  });

  console.log(info)

  } catch (e) {
    console.log(e)
    res.status(400)
    res.send("There was a problem processing the cancellation")
  }
})


router.get('/fetchOrder', nonAdminAuth, async (req, res) => {
  user_id = req.user.data
  id = req.query.id
  const order = await Order.findById(id).select(" -__v -payment").exec();
  if (order.author == req.user.data) {
    res.status(200)
    return res.send(order)
  }
  const user = await User.findById(user_id)

  if (user.isAdmin) {
    res.status(200)
    return res.send(order)
  } else {
    res.status(401)
    res.send("Not authorized to fetch this order")
  }
})



module.exports = router