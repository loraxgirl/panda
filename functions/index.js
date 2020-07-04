const functions = require('firebase-functions');
const app = require('express')();
const auth = require('./util/auth');

const { getTimes, postTime, deleteTime, putTime } = require('./api/helpers');
const { login, signup, setAvatar, getUser, updateUser } = require('./api/auth_helpers');

app.post('/login', login);
app.post('/signup', signup);
app.post('/users/image', auth, setAvatar);
app.get('/user', auth, getUser);
app.post('/user', auth, updateUser);

app.get('/times', auth, getTimes);
app.post('/times', auth, postTime);
app.delete('/times/:id', auth, deleteTime);
app.put('/times/:id', auth, putTime);


exports.api = functions.https.onRequest(app);