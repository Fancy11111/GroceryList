const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
let app = express();

const listSchema = require('./models/einkaufsliste');
const itemGet = require('./routes/itemGet');
const itemPost = require('./routes/itemPost');
const itemPut = require('./routes/itemPut');
const itemDelete = require('./routes/deletePost');

let dbPort = process.env.dbPort || 27017;
let listModel;

mongoose.connect('mongodb://localhost:' + dbPort + '/einkaufsliste');
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


let port = process.env.port || 5000;

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

app.listen(port, () => console.log('running on ' + port));