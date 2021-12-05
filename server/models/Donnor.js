const mongoose = require('mongoose');

const DonorInfo = new mongoose.Schema({
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
});

const Blood = mongoose.model('Donnor', DonorInfo);

module.exports = Blood;
