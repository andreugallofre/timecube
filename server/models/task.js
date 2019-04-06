const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var Task = new Schema({
    name: {type: String, required: true},
    desc: String,
    color: String,
    duradaEsperada: Number,
    cube: {
        type: Schema.Types.ObjectId,
        ref: 'CUBE',
        required: true
    }
})

var task = mongoose.model('TASK', Task)
module.exports = task;