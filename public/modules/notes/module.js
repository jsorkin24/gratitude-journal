(function () {
    'use strict'
    angular
        .module('app.notes', ['ui.router'])
        .config(RouteConfig);

    RouteConfig.$inject = ['$stateProvider'];

    function RouteConfig($stateProvider) {
        $stateProvider
            .state("app", {
                url: "/",
                // abstract: true,
                views: {
                    root: {
                        templateUrl: 'public/modules/notes/note-layout.html',
                        controller: 'noteController as noteCtrl',
                        resolve: {
                            notes: getAllNotes
                        }
                    }
                }
            })
    }

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
})();