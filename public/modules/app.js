(function () {
    'use strict';
    angular
        .module('app', ['ui.router', 'ui.bootstrap', 'app.notes', 'app.services'])
        .config(RouteConfig)
        .run()

    function RouteConfig($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise("/");
        $locationProvider.html5Mode(true);

        RouteConfig.$inject = [
            "$stateProvider",
            "$urlRouterProvider",
            "$locationProvider"
        ];
    }
})();