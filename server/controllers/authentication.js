const jwt 		= require('jwt-simple'),
			User 		= require('../models/user'),
			config 	= require('../config');

function tokenForUser(user) {
	const timestamp = new Date().getTime();
	return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function(req, res, next) {
	const username = req.body.username;
	User.findOne({ username: username }, function(err, foundUser) {
		res.send({ 
			token: tokenForUser(req.user),
			user: {
				username: foundUser.username,
				_id: foundUser._id				
			}
		});
	})
}

exports.signup = function(req, res, next) {
	const username = req.body.username;
	const password = req.body.password;

	if (!username || !password) {
		return res.status(422).send({ error: 'You must provide username and password' });
	}

	User.findOne({ username: username }, function(err, existingUser) {
		if (err) {
			return next(err);
		}
		if (existingUser) {
			return res.status(422).send({ error: 'username is in use' });
		}
		const user = new User({
			username: username,
			password: password
		});

		user.save(function(err) {
			if (err) {
				return next(err);
			}
		});
		res.send({ 
			token: tokenForUser(user),
			user: {
				username: user.username,
				_id: user._id				
			}
		});
	});
}