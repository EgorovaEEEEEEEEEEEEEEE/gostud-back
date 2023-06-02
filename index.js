const express = require('express');
const app = express();
const db = require('./db/models')

require('./endpoints/router')(app);

require('./db/associations/associations')();

const PORT = process.env.GOSTUDPORT || 3000;
db.sequelize.sync({ force: true }).then(() => {
    let server = app.listen(PORT, () => {
        let host = server.address().address;
        let port = server.address().port;
        console.log(`server started on port ${port}`);
    })
});