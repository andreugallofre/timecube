const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var Period = new Schema({
    inici: {
        type: Date,
        required: true
    },
    fi: Date,
    acabada: {
        required: true,
        type: Boolean,
        default: false
    },
    task: {
        type: Schema.Types.ObjectId,
        ref: 'TASK',
        required: true
    }
})

var period = mongoose.model('PERIOD', Period)
module.exports = period;