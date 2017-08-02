const Comment = require('../models/comment');
const Story = require('../models/story')

exports.newComment = function(req, res, next) {
	console.log('req', req.body.author)
	Story.findById(req.params.id, function(err, story) {
		if (err) {
			return next(err);
		} else {
			var newComment = { content: req.body.comment, story_id: req.params.id, author: req.body.author};
			Comment.create(newComment, function(err, comment) {
				if (err) {
					return next(err);
				} else {
					story.comments.push(comment)
					story.save()
					console.log('comment success')
				}
			})
		}
	})
};

exports.fetchComments = function(req, res, next) {
	Story.findById(req.params.id, function(err, story) {
		if (err) {
			return next(err);
		} else {
			
		}
	})
}
