const { signin, login, getUsers } = require('../controllers/userController');

const router=require('express').Router();

router.post('/signin',async (req,res)=>{
    try {
        const data = await signin({...req.body});
        res.json(data);
    } catch (error) {
        res.status(400).json({success:false, message:error.message});
    }
});

router.post('/login',async (req,res)=>{
    try {
        const data = await login({...req.body});
        res.json(data);
    } catch (error) {
        res.status(400).json({success:false, message:error.message});
    }
});

router.get('/getUsers',async (req,res)=>{
    try {
        const data = await getUsers();
        res.json(data);
    } catch (error) {
        res.status(400).json({success:false, message:error.message});
    }
});

module.exports=router;
