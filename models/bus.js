const mongoose=require('mongoose');

const schema=mongoose.Schema({
    busName:String,
    busPrice:String,
    busStart:String,
    busEnd:String,
    busStations:[{
        start:String,
        end:String,
        km:String,
        fare:String,
        startTs:String,
        endTs:String
    }],
    busSeats:String,
    busWindowSeats:String,
    busSpeed:String,
    bookedSeats:Array
});

const user=mongoose.model('Bus', schema);

module.exports=user;
