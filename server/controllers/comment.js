const Comment = require('../models/comment');
const Story = require('../models/story')

exports.newComment = function(req, res, next) {
	console.log('req', req.params)
	// Story.findById(req.params.id, function(err, story) {
	// 	if (err) {
	// 		return next(err);
	// 	} else {
	// 		Comment.create(req.body.comment, function(err, comment) {
	// 			if (err) {
	// 				return next(err);
	// 			} else {
	// 				comment.author.id = req.user._id;
	// 				comment.author.username = req.user.username
	// 				comment.save();
	// 				story.comments.push(comment)
	// 				story.save()
	// 			}
	// 		})
	// 	}
	// })
};