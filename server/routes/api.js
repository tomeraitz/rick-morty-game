const express = require('express')

const router = express.Router()
const bodyParser = require('body-parser')
const moment = require('moment');

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))

const Score = require('../model/Score')
const Users = require('../model/Users')

router.get('/bestScores', function (req, res) {
    Users.find({}).populate({ path: 'scores' })
        .exec((err, results) => {
            let users = []
            results.forEach(u => u.scores.forEach(s => users.push({ name: u.name, score: s.score })))
            let bestScores = users.sort((a, b) => { return b.score - a.score; });
            res.send(bestScores);
        })
})

router.post('/user', function (req, res) {
    let newUser = req.body
    let user = new Users({
        name: newUser.name,
        email: newUser.email,
        scores: []
    })
    user.save()
    res.send("user saved")
})

router.post('/score', function (req, res) {
    Users.findById(req.body.id).exec((err, results) => {
        let score = new Score({
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