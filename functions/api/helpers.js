const { db } = require('../util/admin');

const getTimes = (req, res) => {
  db.collection('times')
  .where('email', '==', req.user.email)
  .orderBy('createdAt', 'desc')
  .get()
  .then((data) => {
    let times = [];
    data.forEach((doc) => {
      times.push({
        id : doc.id,
        title: doc.data().title,
        body: doc.data().body,
        createdAt: doc.data().createdAt,
      });
    })
    return res.json(times)
  })
  .catch((err) => {
    return res.status(500).json({ error: err.code });
  })
}

const postTime = (req, res) => {
  if (req.body.body.trim() === ''){
    return res.status(400).json({ body : 'Time field cannot be empty' });
  }
  if(req.body.title.trim() === '' ){
    return res.status(400).json({ title: 'Title field cannot be empty' });
  }

  const newTimeObject = {
    email: req.user.email,
    title: req.body.title,
    body: req.body.body,
    createdAt: new Date().toISOString()
  }

  db.collection('times')
    .add(newTimeObject)
    .then((doc) => {
      const resTimeObject = newTimeObject;
      resTimeObject.id = doc.id;

      return res.json(resTimeObject)
    })
    .catch((err) => {
      res.status(500).json({error: 'Something wen\'t wrong. Please try again later.'});
      console.error(err)
    })
};

const deleteTime = (req, res) => {
  const document = db.doc(`/times/${req.params.id}`)
  document.get()
    .then((doc) => {
      if(!doc.exists){
        return res.status(404).json({error: 'Not found'})
      }
      return document.delete();
    })
    .then(() => {
      return res.json({ message: 'Goodbye!'})
    })
    .catch((err) => {
      return res.status(500).json({ error: err.code })
    })
}

const putTime = (req, res) => {
  if(req.body.id || req.body.createdAt){
    res.status(403).json({message : `Not Authorized`})
  }
  let doc = db.collection('times').doc(`${req.params.id}`);
  doc.update(req.body)
    .then(() => {
      res.json({ message : 'Updated'});
    })
    .catch((err) => {
      return res.status(500).json({
        error: err.code
      })
    })
}

module.exports = { getTimes, postTime, deleteTime, putTime }