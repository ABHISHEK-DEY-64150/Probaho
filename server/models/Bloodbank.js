const mongoose = require('mongoose');

const BloodbankInfo = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},

	username: {
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
	aPos: {
		type: String,
		required: true,
	},
	aNeg: {
		type: String,
		required: true,
	},
	bPos: {
		type: String,
		required: true,
	},
	bNeg: {
		type: String,
		required: true,
	},
	oPos: {
		type: String,
		required: true,
	},
	oNeg: {
		type: String,
		required: true,
	},
	abPos: {
		type: String,
		required: true,
	},
	abNeg: {
		type: String,
		required: true,
	},

	
});

const Bloodbank = mongoose.model('Bloodbank', BloodbankInfo);

module.exports = Bloodbank;