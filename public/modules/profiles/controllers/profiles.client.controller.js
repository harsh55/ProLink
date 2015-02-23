'use strict';

// Profiles controller

var profilesApp = angular.module('profiles');

profilesApp.controller('ProfilesController', ['$scope', '$stateParams', '$location','Authentication', 'Profiles', '$modal' , '$log' ,
	function($scope, $stateParams, $location, Authentication, Profiles, $modal , $log) {

		this.authentication = Authentication;

		// Find a list of Profiles
		this.profiles = Profiles.query();

		// open a modal window to view single profile
		this.modalview = function (size, selectedProfile) {

			var modalInstance = $modal.open({
				templateUrl: 'modules/profiles/views/view-profile.client.view.html',
				controller: function ($scope, $modalInstance, profile) {
					$scope.profile = profile;

					$scope.ok = function () {
						$modalInstance.close($scope.profile);
					};
				},
				size: size,
				resolve: {
					profile: function () {
						return selectedProfile;
					}
				}
			});

			modalInstance.result.then(function (selectedItem) {
				$scope.selected = selectedItem;
			}, function () {
				$log.info('Modal dismissed at: ' + new Date());
			});
		};

		// open a modal window to update single profile
		this.modalUpdate = function (size, selectedProfile) {

			var modalInstance = $modal.open({
				templateUrl: 'modules/profiles/views/edit-profile.client.view.html',
				controller: function ($scope, $modalInstance, profile) {
					$scope.profile = profile;

					$scope.ok = function () {
						$modalInstance.close($scope.profile);
					};

					$scope.cancel = function () {
						$modalInstance.dismiss('cancel');
					};

				},
				size: size,
				resolve: {
					profile: function(){
						return selectedProfile;
					}
				}
			});

			modalInstance.result.then(function (selectedItem) {
				$scope.selected = selectedItem;
			}, function () {
				$log.info('Modal dismissed at: ' + new Date());
			});
		};


		// Remove existing Profile
		this.remove = function(profile) {
			if ( profile ) {
				profile.$remove();

				for (var i in this.profiles) {
					if (this.profiles [i] === profile) {
						this.profiles.splice(i, 1);
					}
				}
			} else {
				this.profile.$remove(function() {
					$location.path('modules/profiles/views/list-profiles.client.view.html');
				});
			}
		};




	}
]);

profilesApp.controller('ProfilesCreateController', ['$scope', '$stateParams', '$location','Authentication','Profiles',
	function($scope,$stateParams, $location, Authentication, Profiles) {
		console.log(arguments);
		// Create new Profile
		$scope.create = function() {
			//	Create new Profile object
			var profile = new Profiles ({
				firstname: this.firstname,
				lastname: this.lastname,
				email:this.email,
				phone:this.phone,
				city:this.city,
				country:this.country,
				industry:this.industry,
				position:this.position,
				objective:this.objective,
				skills:this.skills,
				wants:this.wants,
				experience:this.experience,
				education:this.education,
				interest:this.interest,
				language:this.language,
				dob:this.dob
			});

			// Redirect after save
			profile.$save(function(response) {
				$location.path('/profiles/views/list-profiles.client.view.html');

				// Clear form fields
				$scope.firstname = '';
				$scope.lastname = '';
				$scope.email = '';
				$scope.phone = '';
				$scope.city = '';
				$scope.country = '';
				$scope.industry = '';
				$scope.position = '';
				$scope.objective = '';
				$scope.skills = '';
				$scope.wants = '';
				$scope.experience = '';
				$scope.education = '';
				$scope.interest = '';
				$scope.language = '';
				$scope.dob = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

	}
]);




profilesApp.controller('ProfilesEditController', ['$scope','$stateParams', '$location','Authentication','Profiles', '$modal' , '$log' ,
	function($scope, $stateParams, $location, Authentication, Profiles,$modal , $log) {

		// Update existing Profile
		this.update = function(updatedProfile) {
			var profile = updatedProfile;

			profile.$update(function(){

				}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
	}
]);






