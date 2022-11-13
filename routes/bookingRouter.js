const { getBookings, createBooking, updateBooking, deleteBooking } = require('../controllers/bookingController');

const router=require('express').Router();

router.get('/getBookings', auth, async(req,res)=>{
    try {
        const data = await getBookings({...req.query, authAdmin:req.user});
        res.json(data);
    } catch (error) {
        res.status(400).json({success:false, message:error.message});
    }
});

router.get('/getUserBooking', async(req,res)=>{
    try {
        const data = await getUserBooking(req.query.id);
        res.json(data);
    } catch (error) {
        res.status(400).json({success:false, message:error.message});
    }
});

router.post('/createBooking', auth, async(req,res)=>{
    try {
        const data = await createBooking({...req.body, authAdmin: req.user});
        res.json(data);
    } catch (error) {
        res.status(400).json({success:false, message:error.message});
    }
});

// Can change name,etc.
router.put('/updateBooking', auth, async(req,res)=>{
    try {
        const data = await updateBooking({...req.body, authAdmin: req.user, id: req.params.id});
        res.json(data);
    } catch (error) {
        res.status(400).json({success:false, message:error.message});
    }
});

router.delete('/deleteBooking', auth, async(req,res)=>{
    try {
        const data = await deleteBooking(req.user, req.body.refundAmount, req.params.id);
        res.json(data);
    } catch (error) {
        res.status(400).json({success:false, message:error.message});
    }
});

module.exports=router;
