const router = require('express').Router();
const {Brand, Commenter, Takeaway} = require('../db');

router.get('/brands', async(req, res, next) => {
    try {
        res.send(await Brand.findAll());
    }
    catch(e) {
        next(e);
    }
});

router.get('/brands/:id/takeaways', async(req, res, next) => {
    try {
        res.send(await Takeaway.findAll({
            where: {
                brandId: req.params.id
            },
            include: [
                Commenter
            ]
        }))
    }
    catch(e) {
        next(e);
    }
});

module.exports = router;