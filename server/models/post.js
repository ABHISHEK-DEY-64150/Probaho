const mongoose = require('mongoose');

const PostInfo = new mongoose.Schema({
	bagOfBlood: {
		type: String,
		required: true,
	},

	location: {
		type: String,
		required: true,
	},

	contact: {
		type: String,
		required: true,
	},


	bloodGroup: {
		type: String,
		required: true, //true
	},
	
});

const Post = mongoose.model('Post', PostInfo);

module.exports = Post;
