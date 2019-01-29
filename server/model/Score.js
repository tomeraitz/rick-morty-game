const mongoose = require('mongoose')
const Schema = mongoose.Schema

const scoreSchema = new Schema({
    date: Date,
    score: Number
})

const Score = mongoose.model("Score", scoreSchema)

module.exports = Score