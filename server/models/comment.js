const mongoose 		= require('mongoose'),
			Schema 			= mongoose.Schema;

const commentSchema = new Schema({
	content: String,
	story_id: String,
	author: {
		_id: {
			type: Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	}
});

const commentModel = mongoose.model('comment', commentSchema);
module.exports = commentModel;