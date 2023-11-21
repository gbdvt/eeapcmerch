const express = require('express')
const path = require('path')
const app = express()
const port = process.env.PORT || 5000

// require dependency files
require('dotenv').config()
require('./utils/db/init')

app.use(express.static(path.join(__dirname, '/../front-end/build')));
app.set('trust proxy', 1);

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false, limit: '10mb' }));
app.use(bodyParser.json({ limit: '10mb' }));

const AuthRouter = require('./utils/routers/Auth/Auth')
app.use("/api/auth", AuthRouter)

const OrderRouter = require('./utils/routers/Orders/Orders')
app.use("/api/orders", OrderRouter)

const ItemRouter = require('./utils/routers/Items/Items')
app.use("/api/items", ItemRouter)

const StatsRouter = require('./utils/routers/Stats/Stats')
app.use("/api/stats", StatsRouter)

const MediaRouter = require('./utils/routers/image-upload/Router')
app.use("/api/media", MediaRouter)


app.get('/api/test', (req, res) => {
  console.log("Test request recieved")
  res.send('this text is comming from the back-end')
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../front-end/build/index.html'));
});


// Liste on specified port
app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})