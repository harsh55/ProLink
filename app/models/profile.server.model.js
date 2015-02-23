'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Profile Schema
 */
var ProfileSchema = new Schema({
	firstname: {
		type: String,
		default: '',
		trim: true
	},
	lastname: {
		type: String,
		default: '',
		trim: true
	},
	email: {
		type: String,
		default: '',
		trim: true
	},
	phone: {
		type: String,
		default: '',
		trim: true
	},
	city: {
		type: String,
		default: '',
		trim: true
	},
	country: {
		type: String,
		default: '',
		trim: true
	},
	industry: {
		type: String,
		default: '',
		trim: true
	},
	position: {
		type: String,
		default: '',
		trim: true
	},
	objective: {
		type: String,
		default: '',
		trim: true
	},
	skills: {
		type: String,
		default: '',
		trim: true
	},
	wants: {
		type: String,
		default: '',
		trim: true
	},
	experience: {
		type: String,
		default: '',
		trim: true
	},
	education: {
		type: String,
		default: '',
		trim: true
	},
	language: {
		type: String,
		default: '',
		trim: true
	},
	interest: {
		type: String,
		default: '',
		trim: true
	},
	dob: {
		type: Date,
		default: '',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Profile', ProfileSchema);
