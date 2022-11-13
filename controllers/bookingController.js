const Booking=require('../models/booking');
const Refund=require('../models/refund');
const { removeUndefined } = require('../util/util');

const getBookings=async({busName, busFrom, busTo, initialDate, endDate, id, authAdmin})=>{
    var data;

    if(!authAdmin)
    {
        return {success:false, message:"Not Authorised"};
    }

    if(id)
    {
        data = await Booking.findById(id);
        return {success:true, data};
    }

    let and=[];

    if(busName)
    {
        and.push({busName});
    }
    if(busFrom)
    {
        and.push({busFrom});
    }
    if(busTo)
    {
        and.push({busTo});
    }
    if(initialDate)
    {
        let t1=initialDate-19800000;
        and.push({bookTs:{$gte:t1}});
    }
    if(endDate)
    {
        let t1=endDate+66600000;
        and.push({bookTs:{$lt:t1}});
    }

    data = Booking.find({$and:and});
    return {success:true, data};
};

const getUserBooking=async(id)=>{
    const data = await Booking.findById(id);
    return {success:true, data};
};

const createBooking=async({busId, busName, busFrom, busTo, passengerInfo, amount, authAdmin})=>{
    if(!authAdmin)
    {
        return {success:false, message:"Not Authorised"};
    }
    let userId=req.user.id;
    let bookTs=new Date().getTime();
    const addBooking=new Booking({ userId, busId, bookTs, busName, busFrom, busTo, passengerInfo, amount, status:"Success"});
    const saveBooking=await addBooking.save();
    return {success:true, message:"Booking has been created successfully", data: saveBooking};
};

const updateBooking=async({passengerInfo, authAdmin, id})=>{
    if(!authAdmin)
    {
        return {success:false, message:"Not Authorised"};
    }

    const data=await Booking.findByIdAndUpdate(id, {$set:{passengerInfo}},{new:true});

    return {success:true, message:"Booking has been modified successfully", data};
};

const deleteBooking=async (id, refundAmount, authAdmin)=>{
    if(!authAdmin)
    {
        return {success:false, message:"Not Authorised"};
    }
    const booking=await Booking.findById(id);
    await Booking.findByIdAndUpdate(id, {$set:{status:"Cancelled"}}, {new:true});
    const newRefund=new Refund({userId:req.user._id, busId: booking.busId, bookingId: id, busName: booking.busName, busFrom: booking.busFrom, busTo: booking.busTo, refundAmount, status: "pending", ts: (new Date().getTime())});
    await newRefund.save();
    return {success:true, message:"Booking cancelled successfully"};
};

module.exports={
    getBookings, getUserBooking, createBooking, updateBooking, deleteBooking
};
