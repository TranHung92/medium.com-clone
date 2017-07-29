const Authentication = require('./controllers/authentication');
const Story = require('./controllers/story');
const passportService = require('./services/passport');
const passport = require('passport');
const path = require('path');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {
  app.get('/', Story.showStories);
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);
  app.post('/new-story', Story.newStory);
  app.get('/story/:id', Story.readStory);
  app.get('/auth', requireAuth, function(req, res) {
  	res.send({ message: "blah blah blah..." })
  })
  app.get('*', (req, res) => {
  	res.sendFile(path.join(__dirname, '../../client/build/index.html'));
	});
}
