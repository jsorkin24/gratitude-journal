(function () {
    'use strict'
    angular
        .module('app', ['ui.router'])
        .config(RouteConfig);

    RouteConfig.$inject = ['$stateProvider'];

    function RouteConfig($stateProvider) {
        $stateProvider
            .state("app", {
                url: "/",
                abstract: true,
                resolve: {
                    getAllNotes: getAllNotes
                }
            });
    };
})();

function getAllNotes(noteService) {
    return noteService
        .getAll()
        .then(data => {
            return data.items;
        })
        .catch(error => {
            console.log(error);
        });
}