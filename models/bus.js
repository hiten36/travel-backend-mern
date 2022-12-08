const mongoose=require('mongoose');

const schema=mongoose.Schema({
    busName:String, //Name of the bus
    busPrice:String, //Price of the bus
    busStart:String, //Bus starts from
    busEnd:String, //Bus last stop
    busStations:[{
        start:Object, // from with index
        end:Object, // to with index
        km:String, // distance in kilometer
        fare:String, // fare
        startTs:String, // arrival time
        endTs:String, // destination time,
        filledSeats:Array, //Array of Booked seats till that perticular trip
        availableSeats:String //Number of available seats to that trip
    }],
    busSeats:String, // Number of seats
    busWindowSeats:String, // Number of window seats
    busSpeed:String, // speed of bus 
    bookedSeats:Array // Array of booked seats
});

const bus=mongoose.model('Bus', schema);

module.exports=bus;
