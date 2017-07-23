const mongoose 		= require('mongoose'),
			Schema 			= mongoose.Schema;

const storySchema = new Schema({
	title: Object,
	content: Object,
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