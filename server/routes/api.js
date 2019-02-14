const express = require('express')

const router = express.Router()
const bodyParser = require('body-parser')
const moment = require('moment');

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))

const Score = require('../model/Score')
const Users = require('../model/Users')




//get best scores
router.get('/bestScores', async function (req, res) {
    const user = await Users.find({}).populate('scores')
    let bestScores = []
    user.forEach(u => u.scores.forEach(s => bestScores.push({ name: u.name, score: s.score })))
    bestScores = bestScores.sort((a, b) => { return b.score - a.score; });
    res.send(bestScores.slice(0, 5));
})

//log in
router.post('/login', async function (req, res) {
    const user = await User.findOne({
        email: req.body.name
    }).populate('scores')
    if (user.password === req.body.password) {
        res.send(user._id)
    } else {
        res.send("not corrnt password")
    }

})

//sign in
router.post('/singup', function (req, res) {
    const newUser = req.body
    const user = new Users({
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
        scores: []
    })
    user.save()
    res.send("user saved")
})

//add new score
router.post('/score', function (req, res) {
    Users.findById(req.body.id).exec((err, results) => {
        const score = new Score({
            date: moment().format('LLLL'),
            score: req.body.score
        })
        score.save()

        results.scores.push(score)
        results.save()
        res.send("score saved")
    });
})

module.exports = router