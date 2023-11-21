const express = require('express')
const router = express.Router()
const isEmail = require('validator/lib/isEmail');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const User = require('../../db/Models/User')


router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email})
        if (await bcrypt.compare( req.body.password, user.password )) {
            token = jwt.sign({
                data: user._id
              }, process.env.JWT_SECRET, { expiresIn: '3h' });

            return res.json({staus: "Ok", token: token, isAdmin: user.isAdmin, name: user.name, email: user.email})
        } else {
            res.status = 400
            return res.json({error: "Password not valid"})
        }
    } catch (e) {
        res.status = 400
        return res.json({error: e})
    }
})

router.post('/signup', async (req, res) => {
    try {
        if (!isEmail(req.body.email)) {
            throw new Error("The provided email is not an email")
        } else if (req.body.password.length < 1) {
            throw new Error("Invalid password")
        }

        req.body.password = await bcrypt.hash(req.body.password, 10)
        const user = new User(req.body)
        await user.save()

        token = jwt.sign({
            data: user._id
          }, process.env.JWT_SECRET, { expiresIn: '24h' });

        return res.json({staus: "Ok", token: token, isAdmin: user.isAdmin, name: user.name, email: user.email})
    } catch (e) {
        console.log(e)
        res.status = 400
        res.json({error: e})
    }
})

router.get('/fetchUserInfo', async (req, res) => {
    // try {
        user = await User.findOne({_id: req.query.id})
        res.send(user)
    // } catch (e) {
    //     res.status(400)
    //     res.json({error: e})
    // }
})



  
module.exports = router