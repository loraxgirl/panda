const functions = require('firebase-functions');
const app = require('express')();

const { getTimes, postTime, deleteTime, putTime } = require('./api/helpers');
const { login, signup } = require('./api/auth_helpers');

app.get('/times', getTimes);
app.post('/times', postTime);
app.delete('/times/:id', deleteTime);
app.put('/times/:id', putTime);

//auth
app.post('/login', login);
app.post('/signup', signup);

exports.api = functions.https.onRequest(app);