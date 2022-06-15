const {syncAndSeed, Brand, Commenter, Takeaway} = require('./db');

const express = require('express');
const app = express();

const path = require('path');

app.use('/api', require('./api'));
app.use('/dist', express.static('dist'));
app.use('/public', express.static('public'));

app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'index.html')));

const init = async() => {
    try{
        syncAndSeed();
        const port = process.env.PORT || 3000;
        app.listen(port, () => console.log(`listening on port ${port}`));
    }
    catch(e){
        console.log(e);
    }
};

init();