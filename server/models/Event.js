const mongoose = require('mongoose');

const Eventinfo = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},

	place: {
		type: String,
		required: true,
	},

	date: {
		type: Date,
		required: true,
	},
    description: {
		type: String,
		required: true,
	},
	
});

const Event = mongoose.model('Event', Eventinfo);

module.exports = Event;
