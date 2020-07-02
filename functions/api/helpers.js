const { db } = require('../util/admin');

exports.postTime = (req, res) => {
  if (req.body.body.trim() === ''){
    return res.status(400).json({ body : 'Time field cannot be empty' });
  }
  if(req.body.title.trim() === '' ){
    return res.status(400).json({ title: 'Title field cannot be empty' });
  }

  const newTimeObject = {
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
}