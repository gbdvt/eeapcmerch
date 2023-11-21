const { response } = require('express');
var express = require('express')
const imgbbUploader = require("imgbb-uploader");
var imgur = require('imgur');
var router = express.Router()

const { nonAdminAuth, AdminAuth } = require('../../Middleware/Auth')

// const toS3 = require('./ToS3')


router.post('/upload', AdminAuth, async (req, res) => {

  const url = await imgur.uploadBase64(req.body.image.split(',')[1])
  res.status(200)
  res.send(url.data.link)
})



module.exports = router