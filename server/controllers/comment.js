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
					res.send(comment)
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
			Comment.find({
				'_id': { $in: story.comments}	
			}, function(err, comments) {
				if (err) {
					return next(err);
				} else {
					res.send(comments)
				}
			})
		}	
	})
}
