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
        console.log(docs);
        for (doc in docs) {
            console.log(doc.inici, doc.fi);
            var i = moment(doc.inici)
            var f = moment(doc.fi)
            console.log(i, f);
            var d = f.diff(i, 'milliseconds', true);
            console.log(d);

          //temps += mom.utc(mom(doc.inici).diff(mom(doc.fi))).asSeconds();
        }
        cb(null, temps);
    });

};

var task = mongoose.model('TASK', Task)
module.exports = task;
