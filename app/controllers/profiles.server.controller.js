'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Profile = mongoose.model('Profile'),
	_ = require('lodash');

/**
 * Create a Profile
 */
exports.create = function(req, res) {
	var profile = new Profile(req.body);
	profile.user = req.user;

	profile.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(profile);
		}
	});
};

/**
 * Show the current Profile
 */
exports.read = function(req, res) {
	res.jsonp(req.profile);
};

/**
 * Update a Profile
 */
exports.update = function(req, res) {
	var profile = req.profile ;

	profile = _.extend(profile , req.body);

	profile.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(profile);
		}
	});
};

/**
 * Delete an Profile
 */
exports.delete = function(req, res) {
	var profile = req.profile ;

	profile.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(profile);
		}
	});
};

/**
 * List of Profiles
 */
exports.list = function(req, res) { 
	Profile.find().sort('-created').populate('user', 'displayName').exec(function(err, profiles) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(profiles);
		}
	});
};

/**
 * Profile middleware
 */
exports.profileByID = function(req, res, next, id) { 
	Profile.findById(id).populate('user', 'displayName').exec(function(err, profile) {
		if (err) return next(err);
		if (! profile) return next(new Error('Failed to load Profile ' + id));
		req.profile = profile ;
		next();
	});
};

/**
 * Profile authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.profile.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
