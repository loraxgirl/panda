const { db, admin } = require('../util/admin');
const config = require('../util/config');

const firebase = require('firebase');

firebase.initializeApp(config);

const { validateLoginData, validateSignUpData } = require('../util/validators');

const login = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password
  }

  const { valid, errors } = validateLoginData(user);
  if (!valid) return response.status(400).json(errors);
  
  firebase.auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then((data) => {
      return data.user.getIdToken();
    })
    .then((token) => {
      return res.json({ token });
    })
    .catch((error) => {
      return res.status(403).json({ general: 'Incorrect credentials'});
    })
}

const signup = (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
		confirmPassword: req.body.confirmPassword
  };

  const { valid, errors } = validateSignUpData(newUser);

  if (!valid) return res.status(400).json(errors);
  
  let token, id;
  db.doc(`users/${newUser.email}`)
  .get()
  .then((doc) => {
    if(doc.exists){
      return res.status(400).json({ email : 'This email is already in use'});
    } else {
      return firebase.auth()
      .createUserWithEmailAndPassword(
        newUser.email,
        newUser.password
      );
    }
  })
  .then((data) => {
    id = data.user.id;
    return data.user.getIdToken()
  })
  .then((id) => {
    token = id;
    const userCredentials = {
      email: newUser.email,
      password: newUser.password
    };
    return db
      .doc(`users/${newUser.email}`)
      .set(userCredentials)
  })
  .then(() => {
    return res.status(201).json({ token });
  })
  .catch((err) => {
    if (err.code === 'auth/email-already-in-use') {
      return res.status(400).json({ email: 'Email already in use'});
    } else {
      return res.status(500).json({ general: 'Something wen\'t wrong.'});
    }
  })
}

module.exports = { login, signup }

