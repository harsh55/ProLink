'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Profile = mongoose.model('Profile'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, profile;

/**
 * Profile routes tests
 */
describe('Profile CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Profile
		user.save(function() {
			profile = {
				name: 'Profile Name'
			};

			done();
		});
	});

	it('should be able to save Profile instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Profile
				agent.post('/profiles')
					.send(profile)
					.expect(200)
					.end(function(profileSaveErr, profileSaveRes) {
						// Handle Profile save error
						if (profileSaveErr) done(profileSaveErr);

						// Get a list of Profiles
						agent.get('/profiles')
							.end(function(profilesGetErr, profilesGetRes) {
								// Handle Profile save error
								if (profilesGetErr) done(profilesGetErr);

								// Get Profiles list
								var profiles = profilesGetRes.body;

								// Set assertions
								(profiles[0].user._id).should.equal(userId);
								(profiles[0].name).should.match('Profile Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Profile instance if not logged in', function(done) {
		agent.post('/profiles')
			.send(profile)
			.expect(401)
			.end(function(profileSaveErr, profileSaveRes) {
				// Call the assertion callback
				done(profileSaveErr);
			});
	});

	it('should not be able to save Profile instance if no name is provided', function(done) {
		// Invalidate name field
		profile.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Profile
				agent.post('/profiles')
					.send(profile)
					.expect(400)
					.end(function(profileSaveErr, profileSaveRes) {
						// Set message assertion
						(profileSaveRes.body.message).should.match('Please fill Profile name');
						
						// Handle Profile save error
						done(profileSaveErr);
					});
			});
	});

	it('should be able to update Profile instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Profile
				agent.post('/profiles')
					.send(profile)
					.expect(200)
					.end(function(profileSaveErr, profileSaveRes) {
						// Handle Profile save error
						if (profileSaveErr) done(profileSaveErr);

						// Update Profile name
						profile.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Profile
						agent.put('/profiles/' + profileSaveRes.body._id)
							.send(profile)
							.expect(200)
							.end(function(profileUpdateErr, profileUpdateRes) {
								// Handle Profile update error
								if (profileUpdateErr) done(profileUpdateErr);

								// Set assertions
								(profileUpdateRes.body._id).should.equal(profileSaveRes.body._id);
								(profileUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Profiles if not signed in', function(done) {
		// Create new Profile model instance
		var profileObj = new Profile(profile);

		// Save the Profile
		profileObj.save(function() {
			// Request Profiles
			request(app).get('/profiles')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Profile if not signed in', function(done) {
		// Create new Profile model instance
		var profileObj = new Profile(profile);

		// Save the Profile
		profileObj.save(function() {
			request(app).get('/profiles/' + profileObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', profile.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Profile instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Profile
				agent.post('/profiles')
					.send(profile)
					.expect(200)
					.end(function(profileSaveErr, profileSaveRes) {
						// Handle Profile save error
						if (profileSaveErr) done(profileSaveErr);

						// Delete existing Profile
						agent.delete('/profiles/' + profileSaveRes.body._id)
							.send(profile)
							.expect(200)
							.end(function(profileDeleteErr, profileDeleteRes) {
								// Handle Profile error error
								if (profileDeleteErr) done(profileDeleteErr);

								// Set assertions
								(profileDeleteRes.body._id).should.equal(profileSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Profile instance if not signed in', function(done) {
		// Set Profile user 
		profile.user = user;

		// Create new Profile model instance
		var profileObj = new Profile(profile);

		// Save the Profile
		profileObj.save(function() {
			// Try deleting Profile
			request(app).delete('/profiles/' + profileObj._id)
			.expect(401)
			.end(function(profileDeleteErr, profileDeleteRes) {
				// Set message assertion
				(profileDeleteRes.body.message).should.match('User is not logged in');

				// Handle Profile error error
				done(profileDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Profile.remove().exec();
		done();
	});
});