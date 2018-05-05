const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
let app = express();

const listSchema = require('./models/itemlist');
//const userSchema;

const itemGet = require('./routes/itemGet');
const itemPost = require('./routes/itemPost');
const itemPut = require('./routes/itemPut');
const itemDelete = require('./routes/deletePost');

let dbPort = process.env.dbPort || 27017;
let listModel;
function conn_database(port = 27017, url = 'localhost') {
    console.log(`Connecting to mongodb on: ${url}/${port}`);
    mongoose.connect(`mongodb://${url}:${port}/einkaufsliste`);
    let db = mongoose.connection;
    db.on('error', () => {
        console.error.bind(console, 'connection error:');
        console.log('Program will exit, please check database connectivity')
        process.exit(-1)
    });
    db.once('open', function () {
        console.log('successful db connection');
        listModel = db.model('einkaufsliste', listSchema);
        app.locals.listModel = listModel;
    });
}

function start_express_server(port){
    // Middleware
    app.use(bodyParser.json())
    app.use(cors());

    // Route /einkaufsliste
    app.route('/einkaufsliste')
        .get(itemGet.getAll)
        .post(itemPost);

    // Route /einkaufsliste/:id
    app.route('/einkaufsliste/:id')
        .get(itemGet.getOne)
        .put(itemPut)
        .delete(itemDelete);

    // TODO: User auth routes

    app.listen(port, () => console.log(`running on localhost:${port}`));
}

conn_database();


start_express_server(process.env.port || 5000);
