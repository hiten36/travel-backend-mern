const Bus=require('../models/bus');
const { removeUndefined } = require('../util/util');

const getBuses=async({start, end, date})=>{
    var data;
    if(start)
    {
        if(date)
        {
            let date1=date+66600000;
            data = await Bus.find({busStations: {$elemMatch: {start, end, startTs:{$gte:{date}, $lt:{date1}}}}});
        }
        else
        {
            data = await Bus.find({busStations: {$elemMatch: {start, end}}});
        }
    }
    else
    {
        data = await Bus.find();
    }
};

const createBus=async({busName, busPrice, busStart, busEnd, busStations, busSeats , busWindowSeats, busSpeed, bookedSeats, authAdmin})=>{
    if(!authAdmin)
    {
        return {success:false, message:"Not Authorised"};
    }
    const addBus=new Bus({busName, busPrice, busStart, busEnd, busStations, busSeats , busWindowSeats, busSpeed, bookedSeats});
    const saveBus=await addBus.save();
    return {success:true, message:"Bus has been created successfully", data: saveBus};
};

const updateBus=async({busName, busPrice, busStart, busEnd, busStations, busSeats , busWindowSeats, busSpeed, bookedSeats, authAdmin, id})=>{
    if(!authAdmin)
    {
        return {success:false, message:"Not Authorised"};
    }

    const newObj=removeUndefined({busName, busPrice, busStart, busEnd, busStations, busSeats , busWindowSeats, busSpeed, bookedSeats});

    const data=await Bus.findByIdAndUpdate(id, {$set:newObj},{new:true});

    return {success:true, message:"Bus has been updated successfully", data};
};

const deleteBus=async (id, authAdmin)=>{
    if(!authAdmin)
    {
        return {success:false, message:"Not Authorised"};
    }
    const data = await Bus.findByIdAndDelete(id);
    return {success:true, message:"Bus deleted successfully", data};
};

module.exports={
    getBuses, createBus, updateBus, deleteBus
};
