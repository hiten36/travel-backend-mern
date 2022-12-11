const router=require('express').Router();
const { getBuses, createBus, updateBus, deleteBus }=require('../controllers/busController');
const auth = require('../middleware/auth');

router.get('/getBuses',async (req,res)=>{
    try {
        const data = await getBuses({...req.query});
        console.log(data);
        res.json(data);
    } catch (error) {
        res.status(400).json({success:false, message:error.message});
    }
});

router.post('/createBus', auth, async (req,res)=>{
    try {
        const data = await createBus({...req.body, authAdmin: req.user});
        res.json(data);
    } catch (error) {
        res.status(400).json({success:false, message:error.message});
    }
});

router.put('/updateBus/:id', auth, async (req,res)=>{
    try {
        const data = await updateBus({...req.body, authAdmin: req.user, id: req.params.id});
        res.json(data);
    } catch (error) {
        res.status(400).json({success:false, message:error.message});
    }
});

router.delete('/deleteBus/:id', auth, async (req,res)=>{
    try {
        const data = await deleteBus(req.user, req.params.id);
        res.json(data);
    } catch (error) {
        res.status(400).json({success:false, message:error.message});
    }
});

module.exports=router;
