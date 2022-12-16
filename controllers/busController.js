const Bus = require('../models/bus');
const { removeUndefined } = require('../util/util');

const getBuses = async ({ start, end, date, id }) => {
    if(id && id!==undefined && id!=='' & id!=='undefined')
    {
        let data=await Bus.findById(id);
        return data;
    }

    if (start && start!==undefined && start!=='' & start!=='undefined') {
        if (date && date!==undefined && date!=='' & date!=='undefined') {
            let date1 = date + 66600000;
            // let data = await Bus.find({ busStations: { $elemMatch: { start, end, startTs: { $gte: { date }, $lt: { date1 } } } } });
            let data = await Bus.find({ busStations: { $elemMatch: { start, end } }, startTs: { $gte: { date }, $lt: { date1 } } });
            return { data };
        }
        let data = await Bus.find({ busStations: { $elemMatch: { start, end } } });
        return { data };
    }
    let data = await Bus.find();
    return { data };
};

const createBus = async ({ busName, busPrice, busStart, busEnd, busStations, busSeats, busWindowSeats, busSpeed, bookedSeats, authAdmin }) => {
    console.log(authAdmin);
    if (!authAdmin) {
        return { success: false, message: "Not Authorised" };
    }

    const addBus = new Bus({ busName, busPrice, busStart, busEnd, busStations, busSeats, busWindowSeats, busSpeed, bookedSeats });
    const saveBus = await addBus.save();
    return { success: true, message: "Bus has been created successfully", data: saveBus };
};

const updateBus = async ({ busName, busPrice, busStart, busEnd, busStations, busSeats, busWindowSeats, busSpeed, bookedSeats, authAdmin, id }) => {
    if (!authAdmin) {
        return { success: false, message: "Not Authorised" };
    }

    const newObj = removeUndefined({ busName, busPrice, busStart, busEnd, busStations, busSeats, busWindowSeats, busSpeed, bookedSeats });

    const data = await Bus.findByIdAndUpdate(id, { $set: newObj }, { new: true });

    return { success: true, message: "Bus has been updated successfully", data };
};

const deleteBus = async (authAdmin, id) => {
    if (!authAdmin) {
        return { success: false, message: "Not Authorised" };
    }
    console.log(id);
    const data = await Bus.findByIdAndDelete(id);
    console.log(data);
    return { success: true, message: "Bus deleted successfully", data };
};

module.exports = {
    getBuses, createBus, updateBus, deleteBus
};
