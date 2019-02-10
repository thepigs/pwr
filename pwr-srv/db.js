const mongoose = require('mongoose');
mongoose.connect('mongodb://192.168.0.128:27017/power', {useNewUrlParser: true});

const PulseSchema = new mongoose.Schema({ date: Date , pulses: Number })
const Pulse = mongoose.model('pulse', PulseSchema);
const GRAN = 2*60*1000

agg = () => Pulse.aggregate([
    {
      '$match': {
        'date': {
          '$gt': new Date('04 Feb 2019 00:00:00 GMT')
        }
      }
    }, {
      '$group': {
        '_id': {
          '$floor': {
            '$divide': [
              {
                '$toLong': '$date'
              }, GRAN
            ]
          }
        }, 
        'sum': {
          '$sum': '$pulses'
        }, 
        'count': {
          '$sum': 1
        }
      }
    }, {
      '$addFields': {
        'date': {
          '$toDate': {
            '$multiply': [
              '$_id', GRAN
            ]
          }
        }
      }
    }, {
      '$sort': {
        'date': -1
      }
    }
  ]).exec()

  module.exports = agg
