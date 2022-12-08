const mongoose=require('mongoose');

const schema=mongoose.Schema({
    userId:String,
    busId:String,
    bookingId:String,
    busName:String,
    busFrom:String,
    busTo:String,
    refundAmount:String,
    status:String,
    ts:String
});

const refund=mongoose.model('Refund', schema);

module.exports=refund;
