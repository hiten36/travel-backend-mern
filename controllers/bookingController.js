const Booking=require('../models/booking');
const Refund=require('../models/refund');
const { removeUndefined } = require('../util/util');
const Bus = require('../models/bus');

const getBookings=async({busName, busFrom, busTo, initialDate, endDate, id, authAdmin})=>{
    var data;

    if(!authAdmin)
    {
        return {success:false, message:"Not Authorised"};
    }

    let and=[];

    if(id && id!=='' && id!=='undefined')
    {
        data = await Booking.findById(id);
        return {success:true, data};
    }
    if(busName && busName!=='' && busName!=='undefined')
    {
        and.push({busName});
    }
    if(busFrom && busFrom!=='' && busFrom!=='undefined')
    {
        and.push({busFrom});
    }
    if(busTo && busTo!=='' && busTo!=='undefined')
    {
        and.push({busTo});
    }
    if(initialDate && initialDate!=='' && initialDate!=='undefined')
    {
        let t1=initialDate-19800000;
        and.push({bookTs:{$gte:t1}});
    }
    if(endDate && endDate!=='' && endDate!=='undefined')
    {
        let t1=endDate+66600000;
        and.push({bookTs:{$lt:t1}});
    }
    if(and.length>0)
    {
        data = await Booking.find({$and:and});
    }
    else
    {
        data = await Booking.find();
    }
    console.log(data);
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

    let userId=authAdmin.id;
    let bookTs=new Date().getTime();
    const addBooking=new Booking({ userId, busId, bookTs, busName, busFrom, busTo, passengerInfo, amount, status:"Success"});
    const saveBooking=await addBooking.save();

    const busInfo=await Bus.findById(busId);
    let busStations=busInfo.busStations;
    // console.log(busInfo);
    // console.log("========================");
    // console.log(busStations);
    let startIndex=busStations.findIndex(x=>x.start.city===busFrom);
    let endIndex=busStations.findIndex(x=>x.end.city===busTo);
    startIndex=busStations[startIndex].start.index;
    endIndex=busStations[endIndex].end.index;
    // console.log(startIndex);
    // console.log(endIndex);

    let seatsToBooked=passengerInfo.length;
    let seatsName=[];
    for(let i of passengerInfo)
    {
        seatsName.push(i.seat);
    }

    let result=busStations.filter((x)=>{
        if(x.start.index<endIndex && x.end.index>startIndex)
        {
            x.filledSeats=x.filledSeats.concat(seatsName);
            x.availableSeats-=seatsToBooked;
            return x;
        }
    });

    // console.log(result);
    let updateBus=await Bus.findByIdAndUpdate(busId, {$set:{busStations:result}},{new:true});
    return {success:true, message:"Booking has been created successfully", data: saveBooking};
};

const updateBooking=async({passengerInfo, authAdmin, id})=>{
    if(!authAdmin)
    {
        return {success:false, message:"Not Authorised"};
    }

    const data=await Booking.findByIdAndUpdate(id, {$set:{passengerInfo}},{new:true});
    console.log(data);

    return {success:true, message:"Booking has been modified successfully", data};
};

const deleteBooking=async (id, refundAmount, authAdmin)=>{
    if(!authAdmin)
    {
        return {success:false, message:"Not Authorised"};
    }

    const booking=await Booking.findById(id);
    await Booking.findByIdAndUpdate(id, {$set:{status:"Cancelled"}}, {new:true});
    const newRefund=new Refund({userId:authAdmin._id, busId: booking.busId, bookingId: id, busName: booking.busName, busFrom: booking.busFrom, busTo: booking.busTo, refundAmount, status: "pending", ts: (new Date().getTime())});
    await newRefund.save();
    return {success:true, message:"Booking cancelled successfully"};
};

module.exports={
    getBookings, getUserBooking, createBooking, updateBooking, deleteBooking
};
