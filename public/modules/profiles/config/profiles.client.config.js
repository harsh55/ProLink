'use strict';

// Configuring the Articles module
angular.module('profiles').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Profiles', 'profiles', 'dropdown', '/profiles(/create)?');
		Menus.addSubMenuItem('topbar', 'profiles', 'List Profiles', 'profiles');
		Menus.addSubMenuItem('topbar', 'profiles', 'New Profile', 'profiles/create');
	}
]);