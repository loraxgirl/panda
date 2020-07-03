const functions = require('firebase-functions');
const app = require('express')();
const auth = require('./util/auth');

const { getTimes, postTime, deleteTime, putTime } = require('./api/helpers');
const { login, signup, setAvatar, getUsers } = require('./api/auth_helpers');

app.get('/times', getTimes);
app.post('/times', postTime);
app.delete('/times/:id', deleteTime);
app.put('/times/:id', putTime);

//auth
app.post('/login', login);
app.post('/signup', signup);
app.post('/users/image', auth, setAvatar);
app.get('/user', auth, getUsers);


exports.api = functions.https.onRequest(app);