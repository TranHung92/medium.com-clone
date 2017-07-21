const mongoose 		= require('mongoose'),
			Schema 			= mongoose.Schema;

const storySchema = new Schema({
	title: String,
	content: String,
	author: {
		id: {
			type: Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
	comments: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Comment'
		}
	]
});

const storyModel = mongoose.model('story', storySchema);
module.exports = storyModel;