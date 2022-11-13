require('dotenv').config();
require('./db/conn');
const express=require('express');
const port = process.env.PORT || 5000;
const userRouter=require('./routes/userRouter');
const busRouter=require('./routes/busRouter');
const bookingRouter=require('./routes/bookingRouter');
const cors=require('cors');

const app=express();

app.use(cors());
app.use(express.json());

app.use('/user', userRouter);
app.use('/bus', busRouter);
app.use('/booking', bookingRouter);

app.get('/', (req,res)=>{
    res.send('Hello Travellers!');
})

app.listen(port, ()=>{
    console.log('Listening ...');
})
