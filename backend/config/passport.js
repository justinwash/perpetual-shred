import passport from 'passport';
import Strategy from 'passport-local';
import User from '../models/User';

passport.use(new Strategy({
	usernameField: 'email'
},
	function (username, password, done) {
		User.findOne({ email: username.toLowerCase() }).then(user => {
			// Return if user not found in database
			if (!user) {
				return done(null, false, {
					message: 'User not found'
				});
			}
			// Return if password is wrong
			if (!user.validPassword(password)) {
				return done(null, false, {
					message: 'Password is wrong'
				});
			}
			// If credentials are correct, return the user object
			return done(null, user);
		}).catch(err => {
			console.log(err);
			return done(err);
		});
	}
));