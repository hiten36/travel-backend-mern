const mongoose=require('mongoose');

const schema=mongoose.Schema({
    userId:String,
    busId:String,
    bookTs:String,
    busName:String,
    busFrom:String,
    busTo:String,
    passengerInfo:Array,
    amount:String,
    status:String
});

const booking=mongoose.model('Booking', schema);

module.exports=booking;
