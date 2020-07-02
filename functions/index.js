const functions = require('firebase-functions');
const app = require('express')();

const { getAllTimes, postTime } = require('./api/helpers');

app.post('/times', postTime);
// app.get('/times', getAllTimes);


exports.api = functions.https.onRequest(app);