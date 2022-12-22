const router=require('express').Router();
const { getBuses, createBus, updateBus, deleteBus }=require('../controllers/busController');
const adminAuth = require('../middleware/admin/adminAuth');

router.get('/getBuses',async (req,res)=>{
    try {
        const data = await getBuses({...req.query});
        res.json(data);
    } catch (error) {
        res.status(400).json({success:false, message:error.message});
    }
});

router.post('/createBus', adminAuth, async (req,res)=>{
    try {
        const data = await createBus({...req.body, authAdmin: req.user});
        res.json(data);
    } catch (error) {
        res.status(400).json({success:false, message:error.message});
    }
});

router.put('/updateBus/:id', adminAuth, async (req,res)=>{
    try {
        const data = await updateBus({...req.body, authAdmin: req.user, id: req.params.id});
        res.json(data);
    } catch (error) {
        res.status(400).json({success:false, message:error.message});
    }
});

router.delete('/deleteBus/:id', adminAuth, async (req,res)=>{
    try {
        const data = await deleteBus(req.user, req.params.id);
        res.json(data);
    } catch (error) {
        res.status(400).json({success:false, message:error.message});
    }
});

module.exports=router;
