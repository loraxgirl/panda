const { admin, db } = require('./admin');

module.exports = (request, response, next) => {
  let idToken;
// console.log(request.headers.authorization)
  if (request.headers.authorization && request.headers.authorization.startsWith('Bearer ')) {
    idToken = request.headers.authorization.split('Bearer ')[1];
    // console.log(idToken)
	} else {
		console.error('No token found');
		return response.status(403).json({ error: 'Unauthorized' });
	}
	admin
		.auth()
		.verifyIdToken(idToken)
		.then((decodedToken) => {
      // console.log(decodedToken)
      request.user = decodedToken;
      // return db.collection('users').where('id', '==', request.user.uid.limit(1))
			return db.collection('users').where('userId', '==', request.user.uid).limit(1).get();
		})
		.then((data) => {
      console.log(data)
			request.user.email = data.docs[0].data().email;
			request.user.imageUrl = data.docs[0].data().imageUrl;
			return next();
		})
		.catch((err) => {
			console.error('Error while verifying token', err);
			return response.status(403).json(err);
		});
};