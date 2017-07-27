const Story = require('../models/story');

exports.newStory = function (req, res, next) {
	var title = req.body.title;
	var content = req.body.content;
	// var author = {
	// 	id: req.user._id,
	// 	username: req.user.username
	// }
	var newStory = { title: title, content: content };
	Story.create(newStory, function (err, newlyCreated) {
		if (err) {
			return next(err);
		} else {
			res.send('Sucessfully created new story');
		}
	});
};

exports.readStory = function (req, res, next) {
	Story.findById(req.params.id, function (err, foundStory) {
		res.send(foundStory);
	});
};

exports.showStories = function (req, res, next) {
	Story.find({}, function (err, allStories) {
		res.send(allStories);
	});
};