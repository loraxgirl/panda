const functions = require('firebase-functions');
const app = require('express')();


const { getTimes, postTime, deleteTime } = require('./api/helpers');

app.get('/times', getTimes);
app.post('/times', postTime);
app.delete('/times/:id', deleteTime);

exports.api = functions.https.onRequest(app);