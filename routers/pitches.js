
const express = require('express')
const Pitch = require('../models/pitches')
const router = new express.Router()
const cors = require('cors');

router.use(cors({
    origin: "*"
}));

router.post('/createpitch', async (req, res) => {

    const pitch = new Pitch({
        entrepreneurId: req.body.entrepreneurId,
        entrepreneurName: req.body.entrepreneurName,
        entrepreneurAvatar: req.body.entrepreneurAvatar,
        pitchTitle: req.body.pitchTitle,
        pitchIdea: req.body.pitchIdea,
        pitchImage: req.body.pitchImage,
        askAmount: req.body.askAmount,
        equity: req.body.equity,
    })

    try {
        await pitch.save()
        res.status(201).send(pitch)
    } catch (e) {
        res.status(400).send(e);
    }

})

router.post('/pitches/offer', async (req, res) => {

    
    const pitch = await Pitch.findOne({ _id: req.body.pitchId })

    const Offer = {
        investorId: req.body.investorId,
        investorName: req.body.investorName,
        avatar: req.body.avatar,
        amount: req.body.amount,
        equity: req.body.equity,
        comment: req.body.comment
    }

    pitch.offers.push(Offer)

    try {
        await pitch.save()
        res.status(201).send('Done')
    }
    catch (e) {
        res.status(400).send(e);
    }

})

router.get('/findoffers/:id', async (req, res) => {
    
    try {
        const pitch = await Pitch.findOne({ _id: req.params.id });
        res.send(pitch.offers);
    }
    catch (e) {
        res.send({ msg : "something wrong while getting offer" });
    }

})


router.get('/findpitches/:id', async (req, res) => {
    
    try {
        const pitches = await Pitch.find({ entrepreneurId: req.params.id });
        res.send(pitches);
    }
    catch (e) {
        res.send({ msg : "something wrong while getting offer" });
    }

})

router.get('/singlepitche/:id', async (req, res) => {
    
    try {
        const pitch = await Pitch.findOne({ _id: req.params.id });
        res.send(pitch);
    }
    catch (e) {
        res.send({ msg : "something wrong while getting offer" });
    }

})

router.post('/pitches/like', async (req, res) => {

    const pitch = await Pitch.findOne({ _id: req.body.pitchId })

    const like = {
        likerId: req.body.likerId
    }

    pitch.likes.push(like)

    try {
        await pitch.save()
        res.status(201).send(pitch)
    }
    catch (e) {
        res.status(400).send(e);
    }

})

router.post('/pitches/comment', async (req, res) => {

    const pitch = await Pitch.findOne({ _id: req.body.pitchId })

    const comment = {
        userId: req.body.userId,
        name: req.body.name,
        avatar: req.body.avatar,
        userType: req.body.userType,
        commentText: req.body.commentText
    }

    pitch.comments.push(comment)

    try {
        await pitch.save()
        res.status(201).send(pitch.comments)
    }
    catch (e) {
        res.status(400).send(e);
    }

})



router.get('/totalpitches', async (req, res) => {

    try {
        const totalpitches = await Pitch.count();
        res.send({ totalpitches });
    }
    catch (e) {
        res.send({ msg : "something wrong while fetching pitchcount" });
    }

})

router.get('/findcomment/:id', async (req, res) => {
    // console.log(req.params.id);
    try {
        const pitch = await Pitch.findOne({ _id: req.params.id });
        
        res.send(pitch.comments);
    }
    catch (e) {
        res.send({ msg : "something wrong while getting error" });
    }

})

router.get('/pitches', async (req, res) => {

    const allPitches = await Pitch.find({}).sort({ $natural: -1 });
    res.send(allPitches);

})

router.get('/pitchlimit', async (req, res) => {

    const query = req.query
    console.log(query)

    const allPitches = await Pitch.find({}).sort({ $natural: -1 }).limit(query.limit).skip(query.skip);

    res.status(200).send(allPitches);
})

module.exports = router;