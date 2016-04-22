angular.module( 'orderCloud' )

	.config( HomeConfig )
	.controller( 'HomeCtrl', HomeController )

;

function HomeConfig( $stateProvider ) {
	$stateProvider
		.state( 'home', {
			parent: 'base',
			url: '/home',
			templateUrl: 'home/templates/home.tpl.html',
			controller: 'HomeCtrl',
			controllerAs: 'home'
		})
}

function HomeController(Nextopia, Underscore, $scope) {
	var vm = this;
	Nextopia.SetGlobalParam("refine", "y");
	vm.searchterm = null;
	vm.refineQuery = {};

	vm.search = function() {
		vm.refineQuery = {};
		Nextopia.Search({keywords: vm.searchterm})
			.then(function(data) {
				vm.searchReturn = data;
				vm.refinables = data.refinables;
			})
	};
	vm.searchWithRefinables = function() {
		var search = vm.refineQuery;
		search.keywords = vm.searchterm;
		Nextopia.Search(search)
			.then(function(data) {
				vm.searchReturn = data;
			})
	};
	vm.resetRefinables = function() {
		vm.refineQuery = {};
		vm.searchWithRefinables();
	};

	vm.getMeta = function() {
		Nextopia.GetMeta()
			.then(function(data) {
				console.dir(data);
			})
	}



}
