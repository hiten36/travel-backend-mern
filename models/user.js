const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

const schema=mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String,
    gender:String,
    phone:String,
    age:String,
    password:String,
    role:String,
    userTs:String
});

schema.pre('save',async function(){
    if(this.isModified('password'))
    {
        this.password=await bcrypt.hash(this.password,6);
    }
});

schema.methods.generateAuthToken=function(){
    let token=jwt.sign({_id:this._id},process.env.SK);
    return token;
};

const user=mongoose.model('User', schema);

module.exports=user;
