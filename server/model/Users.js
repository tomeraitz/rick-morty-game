const mongoose = require('mongoose')
const Schema = mongoose.Schema

const usersSchema = new Schema({
    name: String,
    email: String,
    password: String,
    scores: [{
        type: Schema.Types.ObjectId,
        ref: 'Score'
    }],

})

const Users = mongoose.model("Users", usersSchema)

module.exports = Users