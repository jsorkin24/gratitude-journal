/* global $ angular */
'use strict';

$(function () {
    // moment.js default language
    // moment.locale('en')

    angular.bootstrap(document, ['app']);
});
'use strict';

(function () {
    'use strict';

    angular.module('app', ['ui.router', 'ui.bootstrap', 'app.notes', 'app.services']).config(RouteConfig).run();

    function RouteConfig($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise("/");
        $locationProvider.html5Mode(true);

        RouteConfig.$inject = ["$stateProvider", "$urlRouterProvider", "$locationProvider"];
    }
})();
'use strict';

(function () {
    'use strict';

    angular.module('app.notes', ['ui.router']).config(RouteConfig);

    RouteConfig.$inject = ['$stateProvider'];

    function RouteConfig($stateProvider) {
        $stateProvider.state("app", {
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
        });
    }

    function getAllNotes(noteService) {
        return noteService.getAll().then(function (data) {
            return data.items;
        }).catch(function (error) {
            console.log(error);
        });
    }
})();
'use strict';

(function () {
    'use strict';

    angular.module('app.services', []);
})();
'use strict';

(function () {
    'use strict';

    angular.module('app.notes').controller('noteController', NoteController);

    NoteController.$inject = ['noteService', 'notes'];

    function NoteController(noteService, notes) {
        'use strict';

        var vm = this;
        vm.date = new Date();
        vm.items = notes;
        vm.submitButton = 'start the day';

        vm.submit = function () {
            if (vm.item._id) {
                noteService.update(vm.item).then(_onSuccess).catch(_onError);
            } else {
                noteService.insert(vm.item).then(_onSuccess).catch(_onError);
            }
        };

        vm.delete = function (id) {
            noteService.remove(id).then(_onSuccess).catch(_onError);
        };

        vm.edit = function (id) {
            vm.submitButton = 'update';
            noteService.getById(id).then(_onGetByIdSuccess).catch(_onError);
        };

        function _onGetByIdSuccess(data) {
            vm.item = data.item;
        }

        function _onSuccess(data) {
            vm.item = null;
            location.reload();
        }

        function _onError(data) {
            console.log('Error: ' + data.errors);
        };
    }
})();
'use strict';

(function () {
    'use strict';

    angular.module('app.services').factory('noteService', NoteServiceFactory);

    NoteServiceFactory.$inject = ['$http', '$q'];

    function NoteServiceFactory($http, $q) {
        return {
            getAll: getAll,
            getById: getById,
            insert: insert,
            remove: remove,
            update: update
        };

        function getAll() {
            return $http.get('/api/notes').then(xhrSuccess).catch(onError);
        }

        function getById(id, onSuccess, onError) {
            return $http.get('/api/notes/' + id).then(xhrSuccess).catch(onError);
        }

        function insert(itemData, onSuccess, onError) {
            return $http.post('/api/notes', itemData).then(xhrSuccess).catch(onError);
        }

        function remove(id, onSuccess, onError) {
            debugger;
            return $http.delete('/api/notes/' + id).then(xhrSuccess).catch(onError);
        }

        function update(itemData, onSuccess, onError) {
            return $http.put('/api/notes/' + itemData._id, itemData).then(xhrSuccess).catch(onError);
        }

        function xhrSuccess(response) {
            return response.data;
        }

        function onError(error) {
            console.log(error.data);
            return $q.reject(error.data);
        }
    }
})();