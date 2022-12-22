const router = require('express').Router();
const { getRefunds, updateRefund, deleteRefund } = require('../controllers/refundController');
const adminAuth = require('../middleware/admin/adminAuth');

router.get('/getRefunds', adminAuth, async (req, res) => {
    try {
        const data = await getRefunds({ ...req.query, authAdmin: req.user });
        res.json(data);
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

router.put('/updateRefund/:id', adminAuth, async (req, res) => {
    try {
        const data = await updateRefund({ ...req.body, authAdmin: req.user, id: req.params.id });
        res.json(data);
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

router.delete('/deleteRefund/:id', adminAuth, async (req, res) => {
    try {
        const data = await deleteRefund(req.user, req.params.id);
        res.json(data);
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

module.exports = router;
