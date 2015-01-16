'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

		$scope.alerts = [
			{
				colour:'btn-success',
				country:'GERMANY',
				description:'IT PROFESSIONAL'
			},
			{
				colour:'btn-primary',
				country:'INDIA',
				description:'SOFTWARE ENGINEER'
			},
			{
				colour:'btn-warning',
				country:'USA',
				description:'MANAGING DIRECTOR'
			},
			{
				colour:'btn-info',
				country:'AUSTRALIA',
				description:'DEVELOPER'
			},
			{
				colour:'btn-danger',
				country:'UK',
				description:'INVESTOR'
			},
			{
				colour:'btn-success',
				country:'CANADA',
				description:'GRAPHIC DESIGNER'
			},
			{
				colour:'btn-primary',
				country:'BRAZIL',
				description:'PROJECT MANAGER'
			},
			{
				colour:'btn-warning',
				country:'FRANCE',
				description:'HR MANAGER'
			},
			{
				colour:'btn-info',
				country:'THAILAND',
				description:'IT SUPPORTER'
			},
			{
				colour:'btn-danger',
				country:'JAPAN',
				description:'RESEARCHER'
			},
			{
				colour:'btn-success',
				country:'CHINA',
				description:'HACKER'
			},
			{
				colour:'btn-primary',
				country:'SPAIN',
				description:'UI/UX DESIGNER'
			}
		];
	}
]);
