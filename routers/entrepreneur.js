const express = require('express')
const User = require('../models/user')
const router = new express.Router()

const cors = require('cors')

router.use(
  cors({
    origin: '*',
  }),
)

router.post('/createentrepreneur', async (req, res) => {

  const entrepreneur = new User({
    _id: req.body._id,
    email: req.body.email,
    phone: req.body.phone,
    name: req.body.name,
    companyname: req.body.companyname,
    industry: req.body.industry,
    avatar: req.body.avatar,
    profile: req.body.profile
  })

  try {
    await entrepreneur.save()
    res.status(201).send(entrepreneur)
  } catch (e) {
    res.status(400).send(e)
  }
})

router.get('/entrepreneur/:id', async (req, res) => {
  const ID = req.params.id

  try {
    const entrepreneur = await User.findOne({ _id: ID })

    if (!entrepreneur) {
      return res.status(404).send({ msg: 'Entrepreneur Not Found' })
    }

    res.send(entrepreneur)
  } catch (e) {
    res.status(500).send({ error: 'user not found' })
  }
})

module.exports = router
