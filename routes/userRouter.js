const { signin, login, getUsers, updateUser, deleteUser } = require('../controllers/userController');
const auth=require('../middleware/auth');
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

router.put('/updateProfile',async (req,res)=>{
    try {
        const data = await updateUser({...req.body, authAdmin: req.user});
        res.json(data);
    } catch (error) {
        res.status(400).json({success:false, message:error.message});
    }
});

router.put('/deleteUser/:userId',async (req,res)=>{
    try {
        const data = await deleteUser(req.user, req.params.userId);
        res.json(data);
    } catch (error) {
        res.status(400).json({success:false, message:error.message});
    }
});

module.exports=router;
