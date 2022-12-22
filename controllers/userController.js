const User=require('../models/user');
const bcrypt=require('bcryptjs');
const auth = require('../middleware/user/userAuth');
const { removeUndefined } = require('../util/util');
const booking = require('../models/booking');

const signin=async ({ firstName, lastName, email, gender, phone, age, password, confirmPassword })=>{
    let emailCheck=await User.findOne({email});
    let phoneCheck=await User.findOne({phone});
  
    if(emailCheck || phoneCheck)
    {
        return {success:false, message:"User already available"};
    }

    if(password!==confirmPassword)
    {
        return {success:false, message:"Password and Confirm Password does not match"};
    }

    const createUser=new User({firstName, lastName, email, gender, phone, age, password, role: 'USER'});
    const saveUser=await createUser.save();
    return {success:true, message:"User created successfully", data:saveUser};
};

const createAdmin=async ({ firstName, lastName, email, gender, phone, age, password, confirmPassword })=>{
    let emailCheck=await User.findOne({email});
    let phoneCheck=await User.findOne({phone});
  
    if(emailCheck || phoneCheck)
    {
        return {success:false, message:"User already available"};
    }

    if(password!==confirmPassword)
    {
        return {success:false, message:"Password and Confirm Password does not match"};
    }

    const createUser=new User({firstName, lastName, email, gender, phone, age, password, role: 'ADMIN'});
    const saveUser=await createUser.save();
    return {success:true, message:"User created successfully", data:saveUser};
};

const login=async ({ email, password })=>{
    let emailCheck=await User.findOne({email});
    if(!emailCheck)
    {
        return {success:false, message:"Invalid Credentials"};
    }
    const passwordVerify=await bcrypt.compare(password, emailCheck.password);
    if(!passwordVerify)
    {
        return {success:false, message:"Invalid Credentials"};
    }
    const token=emailCheck.generateAuthToken();
    return {success:true, message:"Login success", token, user: emailCheck};
};

const getUsers=async ()=>{
    const data = await User.find();
    return {success:true, data};
};

const updateUser=async ({firstName, lastName, email, gender, phone, age, role, authAdmin})=>{
    if(!authAdmin)
    {
        return {success: false, message: "Not Authorised"}
    }

    let updateObj=removeUndefined({firstName, lastName, email, gender, phone, age, role});
    let updateProfile=await User.findByIdAndUpdate(authAdmin._id, {$set:updateObj}, {new:true});
    return {success:true, updateProfile};
};

const deleteUser=async (id, authAdmin)=>{
    if(!authAdmin)
    {
        return {success: false, message: "Not Authorised"}
    }
    await User.findByIdAndDelete(id);
    return {success:true, message: "User Deleted"};
};

const verifyUser=(auth)=>{
    if(!auth)
    {
        return {success: false};
    }
    return {success: true};
};

const verifyAdmin=(auth)=>{
    if(!auth)
    {
        return {success: false};
    }
    return {success: true};
};

const getUserBooking=async({userId, authAdmin})=>{
    if(!authAdmin)
    {
        return {success: false};
    }
    let data;
    if(userId)
    {
        data=await booking.find({userId});
        return {success: true, data};
    }
    data=await booking.find({userId: authAdmin._id});
    return {success: true, data};
};

module.exports={
    signin,
    login,
    getUsers,
    updateUser,
    deleteUser,
    createAdmin,
    verifyUser,
    verifyAdmin
};
