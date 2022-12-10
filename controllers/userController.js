const User=require('../models/user');
const bcrypt=require('bcryptjs');
const auth = require('../middleware/auth');
const { removeUndefined } = require('../util/util');

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
    const createUser=new User({firstName, lastName, email, gender, phone, age, password});
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
    return {success:true, message:"Login success", token};
};

const getUsers=async ()=>{
    const data = await User.find();
    return {success:true, data};
};

const updateUser=async ({firstName, lastName, email, gender, phone, age})=>{
    if(!authAdmin)
    {
        return {success: false, message: "Not Authorised"}
    }
    let updateObj=removeUndefined({firstName, lastName, email, gender, phone, age});
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

module.exports={
    signin,
    login,
    getUsers,
    updateUser,
    deleteUser
};
