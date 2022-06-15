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

router.post('/brands', async(req, res, next) => {
    try {
        res.status(201).send(await Brand.create(req.body));
    }
    catch(e) {
        next(e);
    }
});

router.delete('/brands/:id', async(req, res, next) => {
    try {
        const brand = await Brand.findByPk(req.params.id);
        await brand.destroy();
        res.sendStatus(204);
    }
    catch(e) {
        next(e);
    }
});


module.exports = router;