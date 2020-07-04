const isEmpty = (str) => {
  if(str.trim() === '') return true;
  else return false;
};

const isEmail = (email) => {
	const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (email.match(emailRegEx)) return true;
	else return false;
};

const validateLoginData = (data) => {
  let errors = {};
  if(isEmpty(data.email)) errors.email = 'Missing Email';
  if(isEmpty(data.password)) errors.password = 'Missing Password';
  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true: false
  }
}

validateSignUpData = (data) => {
	let errors = {};

	if (isEmpty(data.email)) {
		errors.email = 'Must not be empty';
	} else if (!isEmail(data.email)) {
		errors.email = 'Must be valid email address';
	}
	if (isEmpty(data.password)) errors.password = 'Must not be empty';
	if (data.password !== data.confirmPassword) errors.confirmPassword = 'Passwords must be the same';

	return {
		errors,
		valid: Object.keys(errors).length === 0 ? true : false
	};
};

module.exports = { validateLoginData, validateSignUpData }