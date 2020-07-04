const { db, admin } = require('../util/admin');
const config = require('../util/config');
const firebase = require('firebase');
const BusBoy = require('busboy');
const path = require('path');
const os = require('os');
const fs = require('fs');

firebase.initializeApp(config);

const { validateLoginData, validateSignUpData } = require('../util/validators');

const login = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };

  const { valid, errors } = validateLoginData(user);
  if (!valid) return res.status(400).json(errors);

  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then((data) => {
      return data.user.getIdToken();
    })
    .then((token) => {
      return res.json({ token });
    })
    .catch(() => {
      return res.status(403).json({ general: 'Incorrect credentials' });
    });
};

const signup = (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  };

  const { valid, errors } = validateSignUpData(newUser);

  if (!valid) return res.status(400).json(errors);

  let token, userId;
  db.doc(`users/${newUser.email}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return res.status(400).json({ email: 'This email is already in use' });
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);
      }
    })
    .then((data) => {
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then((idToken) => {
      token = idToken;
      const userCredentials = {
        email: newUser.email,
        password: newUser.password,
        createdAt: new Date().toISOString(),
        userId,
      };
      return db.doc(`users/${newUser.email}`).set(userCredentials);
    })
    .then(() => {
      return res.status(201).json({ token });
    })
    .catch((err) => {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') {
        return res.status(400).json({ email: 'Email already in use' });
      } else {
        return res.status(500).json({ general: "Something wen't wrong." });
      }
    });
};

const removeAvatar = (img) => {
  const bucket = admin.storage().bucket();
  const path = `${img}`;
  return bucket
    .file(path)
    .delete()
    .then(() => {
      return;
    })
    .catch(() => {
      return;
    });
};

const setAvatar = (req, res) => {
  const busboy = new BusBoy({ headers: req.headers });

  let imgPath,
    imgPendingUploaded = {};

  busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    if (mimetype !== 'image/png' && mimetype !== 'image/jpeg') {
      return res.status(400).json({ error: 'file must be .jpeg or .png' });
    }
    const imageExtension = filename.split('.')[filename.split('.').length - 1];
    imgPath = `${req.user.email}.${imageExtension}`;
    const filePath = path.join(os.tmpdir(), imgPath);
    imgPendingUploaded = { filePath, mimetype };
    file.pipe(fs.createWriteStream(filePath));
  });
  removeAvatar(imgPath);
  busboy.on('finish', () => {
    admin
      .storage()
      .bucket()
      .upload(imgPendingUploaded.filePath, {
        resumable: false,
        metadata: {
          metadata: {
            contentType: imgPendingUploaded.mimetype,
          },
        },
      })
      .then(() => {
        const imgUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imgPath}?alt=media`;
        return db.doc(`users/${req.user.email}`).update({
          imgUrl,
        });
      })
      .then(() => {
        return res.json({ message: 'Upload successful' });
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).json({ error: error.code });
      });
  });
  busboy.end(req.rawBody);
};

const getUser = (req, res) => {
  let userData = {};

  db.doc(`/users/${req.user.email}`)
    .get()
    .then((doc) => {
      console.log(doc);
      if (doc.exists) {
        userData.userCredentials = doc.data();
        return res.json(userData);
      }
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).json({ error: error.code });
    });
};

/*

🚧 Needs attention 🚧 

🔧  Error: Update() requires either a single JavaScript object or an alternating list of field/value pairs that can be followed by an optional precondition. Input is not an object.
    at updateUser (/Users/mat/Desktop/Development/async-timers/functions/api/auth_helpers.js:173:12)
🔧 

*/
const updateUser = (req, res) => {
  let document = db.collection('users').doc(`${req.user.email}`);

  console.log(req.body);
  document
    .update(req.body)
    .then(() => {
      return res.json({ message: 'Updated' });
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).json({
        message: 'Cannot update the value',
      });
    });
};

module.exports = {
  login,
  signup,
  setAvatar,
  removeAvatar,
  getUser,
  updateUser,
};
