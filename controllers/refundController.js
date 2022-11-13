const Refund=require('../models/refund');

const getRefunds=async ({date, status, bookingId, authAdmin})=>{
    if(!authAdmin)
    {
        return {success:false, message:"Not Authorised"};
    }
    let and = [];
    if(date)
    {
        and.push({ts:{$gte:date-19800000, $lt:date + 66600000}});
    }
    if(status)
    {
        and.push({status});
    }
    if(bookingId)
    {
        and.push({bookingId});
    }
    const data= await Refund.find({$and:and});
    return {success:true, data};
};

const updateRefund=async ({id, status, authAdmin})=>{
    if(!authAdmin)
    {
        return {success:false, message:"Not Authorised"};
    }
    const data = await Refund.findByIdAndUpdate(id, {$set:{status}}, {new:true});
    return {success:true, data, message:"Status updated successfully"};
};

const deleteRefund=async ({id, authAdmin})=>{
    if(!authAdmin)
    {
        return {success:false, message:"Not Authorised"};
    }
    await Refund.findByIdAndDelete(id);
    return {success:true, message:"Status deleted successfully"};
};

module.exports={
    getRefunds, updateRefund, deleteRefund
};
