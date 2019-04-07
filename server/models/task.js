const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;
const cp        = require('./period');
const moment    = require('moment')
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
    console.log(task_id);
    cp.find({ "task":task_id }, (err,docs) => {
        if(err) cb(err);

        temps = 0;
        for (doc of docs) {
            var i = moment(doc.inici)
            var f = moment(doc.fi)
            var d = moment.duration(f.diff(i));
            // console.log(d.seconds());

          temps += d.seconds();
        }
        cb(null, temps);
    });

};



var task = mongoose.model('TASK', Task)
module.exports = task;
