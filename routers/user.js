const express = require('express')
const User = require('../models/user')
const Pitch = require('../models/pitches')
const router = new express.Router()

const cors = require('cors')

router.use(
  cors({
    origin: '*',
  }),
)

router.get('/user/:id', async (req, res) => {
  const ID = req.params.id

  try {
    const user = await User.findOne({ _id: ID }).select('-messages')

    if (!user) {
      return res.status(404).send({ msg: 'user Not Found' })
    }
    res.send(user)
  } catch (e) {
    res.status(500).send({ error: 'user not found' })
  }
})


router.get('/messages/:id', async (req, res) => {
  const ID = req.params.id

  try {
    const messages = await User.findOne({ _id: ID }).select('messages')

    res.send(messages)
  } catch (e) {
    res.status(500).send({ error: 'user not found' })
  }
})


router.get('/alluser/:id', async (req, res) => {
  const ID = req.params.id
  try {
    const user = await User.find({ _id: { $nin: ID } })
    res.status(200).send(user)
  } catch (e) {
    res.status(500).send({ error: 'user not found' })
  }
})

router.post('/user/follow', async (req, res) => {
  const user = await User.findOne({ _id: req.body.userId })

  const follow = {
    followerId: req.body.followerId,
    followerName: req.body.followerName,
    follwerAvatar: req.body.follwerAvatar,
  }

  user.followers.push(follow)

  try {
    await user.save()
    res.status(201).send(user)
  } catch (e) {
    res.status(400).send(e)
  }
})

router.post('/user/notify', async (req, res) => {
  const user = await User.findOne({ _id: req.body.userId })

  const msg = {
    messagerId: req.body.messagerId,
    messagerName: req.body.messagerName,
    messagerAvatar: req.body.messagerAvatar,
    pitchId: req.body.pitchId,
  }

  user.messages.push(msg)

  try {
    await user.save()
    res.status(201).send({ success: 'success' })
  } catch (e) {
    res.status(400).send(e)
  }
})

router.post('/user/update', async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.id })

    user.name = req.body.name;
    user.phone = req.body.phone;
    user.companyname = req.body.companyname;
    user.avatar = req.body.avatar;

    await Pitch.updateMany({ entrepreneurId: req.body.id }, { entrepreneurName: req.body.name, entrepreneurAvatar: req.body.avatar }, { multi: true });

    await user.save();
    res.status(200).send(user)
  }
  catch (e) {
    res.status(404).send(e)
  }
})

module.exports = router
