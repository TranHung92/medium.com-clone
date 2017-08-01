const Comment = require('../models/comment');
const Story = require('../models/story')

exports.newComment = function(req, res, next) {
	Story.findById(req.params.id, function(err, story) {
		if (err) {
			return next(err);
		} else {
			Comment.create(req.body.comment, function(err, comment) {
				if (err) {
					return next(err);
				} else {
					
				}
			})
		}
	})
};
