const mongoose = require('mongoose');

const UserInfo = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},

	email: {
		type: String,
		required: true,
	},

	location: {
		type: String,
		required: true,
	},

	password: {
		type: String,
		required: true,
	},

	phone: {
		type: String,
		required: true,
	},

	gender: {
		type: String,
		required: true,
	},

	bloodGroup: {
		type: String,
		required: true, //true
	},
	lastDonation: {
		type: Date,
		required: true, //true
	},

});

const User = mongoose.model('User', UserInfo);

module.exports = User;
