const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;
const cp        = require('./period');
const mom       = require('moment')
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

});

Task.statics.task_time = (task_id, cb) => {
    cp.find({ "task":task_id }, (err,docs) => {
        temps = 0;
        for (doc in docs) {
          console.log(doc.inici)
          console.log(doc.fi)
            temps += int(moment.utc(moment(doc.inici).diff(moment(doc.fi))).asSeconds());
        }
        cb(null, temps);
    });
};

var task = mongoose.model('TASK', Task)
module.exports = task;
