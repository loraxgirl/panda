const functions = require('firebase-functions');
const app = require('express')();

const { getAllTimes } = require('./api/helpers');

app.get('/times', getAllTimes);
exports.api = functions.https.onRequest(app);