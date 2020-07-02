const functions = require('firebase-functions');
const app = require('express')();

const { getTimes, postTime } = require('./api/helpers');

app.post('/times', postTime);
app.get('/times', getTimes);


exports.api = functions.https.onRequest(app);