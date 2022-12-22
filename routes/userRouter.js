const { signin, createAdmin, login, getUsers, updateUser, deleteUser, verifyAdmin, verifyUser } = require('../controllers/userController');
const userAuth = require('../middleware/user/userAuth');
const adminAuth=require('../middleware/admin/adminAuth');
const router = require('express').Router();

router.post('/signin', async (req, res) => {
    try {
        const data = await signin({ ...req.body });
        res.json(data);
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

router.post('/createAdmin', async (req, res) => {
    try {
        const data = await createAdmin({ ...req.body });
        res.json(data);
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const data = await login({ ...req.body });
        res.json(data);
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

router.get('/getUsers', async (req, res) => {
    try {
        const data = await getUsers();
        res.json(data);
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

router.put('/updateProfile', userAuth, async (req, res) => {
    try {
        const data = await updateUser({ ...req.body, authAdmin: req.user });
        res.json(data);
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

router.put('/deleteUser/:userId', adminAuth, async (req, res) => {
    try {
        const data = await deleteUser(req.params.userId, req.user);
        res.json(data);
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

router.get('/verifyUser', userAuth, async (req, res) => {
    try {
        const data = verifyUser(req.user);
        res.json(data); 
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

router.get('/verifyAdmin', adminAuth, async (req, res) => {
    try {
        const data = verifyAdmin(req.user);
        res.json(data);
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

router.get('/getUserBooking', userAuth, async (req, res) => {
    try {
        const data = getUserBooking({authAdmin: req.user});
        res.json(data);
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

router.get('/getUserBooking', adminAuth, async (req, res) => {
    try {
        const data = getUserBooking({...req.query, authAdmin: req.user});
        res.json(data);
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

module.exports = router;
