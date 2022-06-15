const Sequelize = require('sequelize');
const { STRING, VIRTUAL } = Sequelize;
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_express_spa');

const Brand = conn.define('brand', {
    name: {
        type: STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
    }
});

const Commenter = conn.define('commenter', {
    fisrtName: {
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    lastName: {
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    fullName: {
        type: VIRTUAL,
        get: function() {
            return `${this.fisrtName} ${this.lastName}`
        }
    }
});

const Takeaway = conn.define('takeaway', {
    comment: {
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
});

Takeaway.belongsTo(Brand);
Takeaway.belongsTo(Commenter);

const syncAndSeed = async() => {
    await conn.sync({force: true});
    const [celine, burberry, chanel, louisVuitton, balenciaga, saintLaurent, dior, bottegaVeneta, gucci, prada] = await Promise.all(
        ['Celine', 'Burberry', 'Chanel', 'Louis Vuitton', 'Balenciaga', 'Saint Laurent', 'Dior', 'Bottega Veneta', 'Gucci', 'Prada'].map(name => Brand.create({name}))
    );
    const [david, ann, polly] = await Promise.all(
        [
            {fisrtName: 'David', lastName: 'Shim'},
            {fisrtName: 'Ann', lastName: 'Kim'},
            {fisrtName: 'Polly', lastName: 'Bichon'}
        ].map(user => Commenter.create(user))
    );
    const takeaways = await Promise.all([
        Takeaway.create({brandId: celine.id, commenterId: david.id, comment: 'Cool classics'}),
        Takeaway.create({brandId: burberry.id, commenterId: ann.id, comment: 'Tartan and sequins'}),
        Takeaway.create({brandId: chanel.id, commenterId: polly.id, comment: 'Tweed, jumper dresses and jumpsuits'}),
        Takeaway.create({brandId: louisVuitton.id, commenterId: david.id, comment: 'Unexpected layering'}),
        Takeaway.create({brandId: balenciaga.id, commenterId: ann.id, comment: 'Head-to-toe black and oversized tailoring'}),
        Takeaway.create({brandId: saintLaurent.id, commenterId: polly.id, comment: 'Floor-length faux fur coats and pared-back suiting'}),
        Takeaway.create({brandId: dior.id, commenterId: david.id, comment: 'Feminine tailoring and futuristic accessories'}),
        Takeaway.create({brandId: bottegaVeneta.id, commenterId: ann.id, comment: 'Thigh-high boots, elevated basics, statement leather and \'It\' bags'}),
        Takeaway.create({brandId: gucci.id, commenterId: polly.id, comment: 'Sporty elegance'}),
        Takeaway.create({brandId: prada.id, commenterId: david.id, comment: 'Grey Nineties\' tailoring and elevated basics'}),
    ]);
};

module.exports = {
    syncAndSeed,
    Brand,
    Commenter,
    Takeaway
};